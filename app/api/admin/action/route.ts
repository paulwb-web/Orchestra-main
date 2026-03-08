import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== "admin@orchestra-art.com") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action } = await req.json() as { id: string; action: "approve" | "decline" | "remove" };

  if (!id || !action) {
    return NextResponse.json({ error: "Missing id or action" }, { status: 400 });
  }

  if (action === "approve") {
    await prisma.generation.update({ where: { id }, data: { approved: true } });
  } else if (action === "decline") {
    await prisma.generation.delete({ where: { id } });
  } else if (action === "remove") {
    await prisma.generation.update({ where: { id }, data: { approved: false } });
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
