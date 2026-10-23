/**
 * Email verification / recovery callback route.
 *
 * Supabase email links (signup confirmation, password recovery) point here
 * with a `code` query param. We exchange the code for a session:
 * - signup confirmation  -> /admin later via normal login (or direct /shop)
 * - password recovery    -> /reset-password where a new password is set
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(`${origin}/login?error=config`);
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        );
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Relative, internal destination only
      const destination = next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  // Verification failed or code missing/expired
  return NextResponse.redirect(`${origin}/login?error=verification`);
}
