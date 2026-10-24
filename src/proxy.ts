import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic edge protection for /dashboard.
 *
 * The Supabase session lives in browser localStorage, so it cannot be read at
 * the edge. A small, non-sensitive hint cookie (`sl_session_hint`) is set on
 * successful signup / sign-in, allowing unauthenticated visitors to be
 * redirected to /login before hydration.
 *
 * The authoritative check still runs client-side in AuthGuard via
 * `supabase.auth.getUser()`, which verifies the token with Supabase.
 */
const SESSION_HINT_COOKIE = "sl_session_hint";

export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_HINT_COOKIE)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    // `next` preserves the originally requested protected path; sanitized
    // to internal paths client-side in the login page.
    url.search = `next=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
