import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin sayfaları için kontrol
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // User sayfaları için kontrol
    if (pathname.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes - kimlik doğrulama gerektirmez
        if (
          pathname === "/" ||
          pathname.startsWith("/auth/") ||
          pathname.startsWith("/api/auth/") ||
          pathname.startsWith("/_next/") ||
          pathname === "/favicon.ico" ||
          pathname === "/unauthorized"
        ) {
          return true;
        }

        // Protected routes - token gerekli
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
