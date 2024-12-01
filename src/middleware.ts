import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // Ambil email yang diizinkan dari variabel lingkungan
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

  // Proteksi login
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log(session);
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // Cek apakah email pengguna tidak ada dalam daftar yang diizinkan
  if (
    (!session ||
      !session.user ||
      !allowedEmails.includes(session.user.email as string)) &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const newUrl = new URL("/sign-out", req.nextUrl.origin); // Ganti dengan halaman akses ditolak
    return NextResponse.redirect(newUrl);
  }

  // Jika sudah login dan mengakses halaman sign-in, arahkan ke dashboard
  if (session && req.nextUrl.pathname.startsWith("/sign-in")) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
