/**
 * Proxy (formerly middleware — deprecated in Next.js 16).
 *
 * Guards the admin area server-side: any request to /admin* without a valid
 * Supabase session is redirected to /login with a `next` param so the user
 * returns to /admin after signing in. Without this, /admin is publicly
 * reachable by URL alone.
 *
 * NOTE: as a compensating control, the admin page itself also verifies the
 * session server-side (defense in depth, since proxy matchers can be bypassed
 * by Server Function requests routed elsewhere).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables for the proxy.",
  );
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
