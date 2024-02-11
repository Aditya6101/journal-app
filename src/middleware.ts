import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./auth";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  if ((url.pathname === "/login" || url.pathname === "/register") && !token)
    return NextResponse.next();

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  // Redirect unauthenticated users to login page
  if (!hasVerifiedToken) {
    url.pathname = "/login";
    const response = NextResponse.redirect(url);

    response.cookies.delete("token");

    return response;
  }

  // If authorized user tries to access register/login page redirect to /
  if (
    (url.pathname === "/login" || url.pathname === "/register") &&
    hasVerifiedToken
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
