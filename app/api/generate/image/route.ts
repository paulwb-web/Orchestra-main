import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const STYLE_SUFFIXES: Record<string, string> = {
  Modernism:     "in a strict Bauhaus Modernist style, 1920s graphic design, minimalist geometric abstraction, heavy emphasis on primary colors (red, blue, yellow), grid-based composition, clean sans-serif aesthetic, flat industrial textures, influence of László Moholy-Nagy and Wassily Kandinsky",
  Expressionism: "in the style of German Expressionism, 'Die Brücke' movement, jagged angular forms, aggressive heavy impasto brushwork, high-contrast 'woodcut' aesthetic, vibrating clashing colors, distorted psychological perspective, influence of Ernst Ludwig Kirchner and Edvard Munch",
  Fauvism:       "in a bold Fauvist style, 'Les Fauves' aesthetic, wild arbitrary non-naturalistic colors, neon-saturated palettes, thick unblended paint strokes, raw canvas textures, rejection of three-dimensional depth, influence of Henri Matisse and André Derain",
  Surrealism:    "in a Surrealist oil painting style, dream-logic, uncanny hyper-realistic textures, impossible juxtapositions, melting architectural forms, vast cinematic horizons, sharp focus, subconscious imagery, influence of Salvador Dalí and René Magritte",
  Symbolism:     "in a late 19th-century Symbolist style, mystical and allegorical, hazy ethereal atmosphere, decadent ornate detailing, muted jewel tones, shimmering gold leaf accents, somber melancholy mood, influence of Gustave Moreau and Odilon Redon",
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { prompt, style, imageSize } = body as { prompt?: string; style?: string; imageSize?: string };

  const VALID_SIZES = ["landscape_4_3", "portrait_4_3", "square_hd"];
  const resolvedSize = imageSize && VALID_SIZES.includes(imageSize) ? imageSize : "landscape_4_3";

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, tokenBalance: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.tokenBalance < 1) {
    return NextResponse.json({ error: "Insufficient tokens" }, { status: 402 });
  }

  const styleSuffix = style && STYLE_SUFFIXES[style] ? `, ${STYLE_SUFFIXES[style]}` : "";
  const fullPrompt = `${prompt.trim()}${styleSuffix}`;

  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: fullPrompt,
        image_size: resolvedSize as "landscape_4_3" | "portrait_4_3" | "square_hd",
        num_inference_steps: 4,
        num_images: 1,
        enable_safety_checker: true,
      },
    });

    const imageUrl = (result.data as { images: { url: string }[] }).images[0]?.url;
    if (!imageUrl) {
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }

    const [updated] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { tokenBalance: { decrement: 1 } },
        select: { tokenBalance: true },
      }),
      prisma.generation.create({
        data: { userId: user.id, imageUrl, style: style ?? "", prompt: prompt.trim() },
      }),
    ]);

    return NextResponse.json({ imageUrl, remainingTokens: updated.tokenBalance });
  } catch (err) {
    console.error("[generate/image]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
