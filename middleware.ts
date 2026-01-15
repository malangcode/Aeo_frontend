import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/signup",
    "/forgot-pass",
    "/change-pass",
    "/login/loading",
    "/github-callback",
  ];

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("user_status");
  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = atob(cookie.value.replace(/-/g, "+").replace(/_/g, "/"));
    const userStatus = JSON.parse(decoded);

    if (!userStatus?.is_authenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/admin") && !userStatus?.is_superuser) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
