import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== "admin@orchestra-art.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const generations = await prisma.generation.findMany({
    where: { approved: false, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    select: { id: true, imageUrl: true, style: true, prompt: true, createdAt: true },
  });

  return NextResponse.json({ generations });
}
