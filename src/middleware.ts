import { auth } from "@/lib/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Variabel rute untuk berbagai jenis akses
const routes = {
  userRoutes: ["/profile", "/sign-out"], // Rute untuk user yang sudah login
  adminRoutes: ["/dashboard", "/overview"], // Rute untuk admin
  authRoutes: ["/sign-in", "/sign-out"], // Rute untuk login dan logout
};

export async function middleware(req: NextRequest) {
  const session = await auth();

  // Ambil email yang diizinkan dari variabel lingkungan
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

  const pathname = req.nextUrl.pathname;

  // Proteksi untuk halaman admin (hanya admin yang emailnya ada dalam allowedEmails)
  if (routes.adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!session?.user || !allowedEmails.includes(session.user.email ?? "")) {
      const newUrl = new URL("/sign-in", req.nextUrl.origin); // Redirect ke sign-in jika tidak diizinkan
      return NextResponse.redirect(newUrl);
    }
  }

  // Proteksi untuk halaman user yang harus login
  if (routes.userRoutes.some((route) => pathname.startsWith(route))) {
    if (!session?.user) {
      const newUrl = new URL("/sign-in", req.nextUrl.origin); // Redirect ke sign-in jika belum login
      return NextResponse.redirect(newUrl);
    }
  }

  // Halaman login (redirect jika user sudah login)
  if (pathname === "/sign-in" && session?.user) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Menyesuaikan dengan rute yang disebutkan
  ],
};
