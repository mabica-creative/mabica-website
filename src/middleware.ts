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

  // Proteksi untuk halaman user (rute dalam userRoutes)
  if (session?.user && routes.userRoutes.includes(req.nextUrl.pathname)) {
    if (req.nextUrl.pathname === "/sign-in") {
      const newUrl = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(newUrl); // Arahkan ke dashboard jika sudah login
    }
  }

  // Proteksi halaman untuk user yang belum login (hanya untuk /sign-in dan /sign-out)
  if (!session?.user) {
    if (
      routes.userRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
    ) {
      if (req.nextUrl.pathname === "/sign-out") {
        return new NextResponse(
          "You need to be logged in to access this page.",
          {
            status: 403,
          },
        );
      } else if (req.nextUrl.pathname !== "/sign-in") {
        const newUrl = new URL("/sign-in", req.nextUrl.origin);
        return NextResponse.redirect(newUrl); // Arahkan ke sign-in jika belum login
      }
    }
  }

  // Proteksi halaman admin (rute dalam adminRoutes) hanya untuk admin yang emailnya ada dalam allowedEmails
  if (
    session?.user &&
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/overview")) &&
    !allowedEmails.includes(session.user.email ?? "")
  ) {
    const newUrl = new URL("/sign-out", req.nextUrl.origin);
    return NextResponse.redirect(newUrl); // Redirect ke halaman sign-out jika email tidak terdaftar
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Menyesuaikan dengan rute yang disebutkan
  ],
};
