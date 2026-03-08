import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const STYLE_SUFFIXES: Record<string, string> = {
  Modernism:     "Bauhaus style, flat 2D geometric shapes, primary colors red blue yellow, minimalist grid, Kandinsky",
  Expressionism: "German Expressionism, distorted jagged lines, heavy black shadows, moody dark oil painting, Edvard Munch",
  Fauvism:       "Fauvism, impressionism style, wild unnatural bright colors, neon palette, loose messy brushstrokes, Henri Matisse",
  Surrealism:    "Surrealism, dream-like scene, melting objects, impossible physics, hyper-realistic detail, Salvador Dali",
  Symbolism:     "Symbolism style, mystical atmosphere, hazy soft focus, gold leaf accents, dark ethereal mood, Gustave Moreau",
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
        num_images: 2,
        enable_safety_checker: true,
      },
    });

    const imageUrls = (result.data as { images: { url: string }[] }).images.map((img) => img.url).filter(Boolean);
    if (imageUrls.length === 0) {
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }

    const [updated] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { tokenBalance: { decrement: 1 } },
        select: { tokenBalance: true },
      }),
      ...imageUrls.map((imageUrl) =>
        prisma.generation.create({
          data: { userId: user.id, imageUrl, style: style ?? "", prompt: prompt.trim() },
        })
      ),
    ]);

    return NextResponse.json({ imageUrls, remainingTokens: updated.tokenBalance });
  } catch (err) {
    console.error("[generate/image]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
