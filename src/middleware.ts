import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // proteksi login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log(session);
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (
    (!session ||
      !session.user ||
       (session.user.email !== "mabica.cr@gmail.com" &&
     session.user.email !== "osiic.offcl@gmail.com")) &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const newUrl = new URL("/sign-out", req.nextUrl.origin); // Ganti dengan halaman akses ditolak
    return NextResponse.redirect(newUrl);
  }

  if (session && req.nextUrl.pathname.startsWith("/sign-in")) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin); // Arahkan ke dashboard atau halaman lain
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
