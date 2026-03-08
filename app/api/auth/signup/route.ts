import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username, fullName } = body;
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    if (username) {
      const existingUsername = await prisma.user.findUnique({ where: { username } });
      if (existingUsername) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
    }
    const passwordHash = await hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        username: username || null,
        name: fullName || null,
        tokenBalance: 3,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Sign up failed" }, { status: 500 });
  }
}
