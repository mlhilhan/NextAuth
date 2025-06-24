import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, RouteProtection } from "@/types/auth";

// Korumalı route'lar ve gerekli roller
const protectedRoutes: RouteProtection[] = [
  { path: "/dashboard", roles: [UserRole.USER, UserRole.ADMIN] },
  { path: "/admin", roles: [UserRole.ADMIN] },
  { path: "/profile", roles: [UserRole.USER, UserRole.ADMIN] },
  { path: "/api/admin", roles: [UserRole.ADMIN] },
];

// Public route'lar (kimlik doğrulama gerektirmeyen)
const publicRoutes = [
  "/",
  "/auth/signin",
  "/auth/error",
  "/api/auth",
  "/_next",
  "/favicon.ico",
];

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Public route kontrolü
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Token yoksa login'e yönlendir
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Role-based access control
    const userRole = token.role as UserRole;
    const protectedRoute = protectedRoutes.find((route) =>
      pathname.startsWith(route.path)
    );

    if (protectedRoute && !protectedRoute.roles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public route'lar için her zaman true
        if (isPublicRoute(pathname)) {
          return true;
        }

        // Diğer route'lar için token gerekli
        return !!token;
      },
    },
  }
);

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
