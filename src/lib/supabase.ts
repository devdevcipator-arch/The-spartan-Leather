/**
 * Shared Supabase client for "use client" pages.
 *
 * Delegates to the @supabase/ssr browser client so the session is stored in
 * cookies (readable by the server). Kept as `supabase` for compatibility with
 * existing page imports.
 */
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
