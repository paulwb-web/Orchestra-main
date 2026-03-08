import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    if (req.nextUrl.pathname.startsWith("/admin") && token?.email !== "admin@orchestra-art.com") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  { pages: { signIn: "/" } }
);

export const config = { matcher: ["/generate", "/admin/:path*"] };
