import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/**
 * Lightweight, non-sensitive hint cookie so `proxy.ts` can optimistically
 * gate /dashboard before hydration. The authoritative session check always
 * happens with `supabase.auth.getUser()` in the AuthGuard.
 */
export const SESSION_HINT_COOKIE = "sl_session_hint";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export function setSessionHint() {
  document.cookie = `${SESSION_HINT_COOKIE}=1; path=/; max-age=${SEVEN_DAYS}; samesite=lax`;
}

export function clearSessionHint() {
  document.cookie = `${SESSION_HINT_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

/**
 * Translates raw Supabase auth errors into clear, user-friendly copy.
 */
export function mapAuthError(rawMessage: string): string {
  const msg = rawMessage.toLowerCase();

  if (msg.includes("invalid login credentials")) {
    return "Invalid login credentials. Please check your email and password and try again.";
  }
  if (msg.includes("email not confirmed")) {
    return "Your email address hasn't been verified yet. Please check your inbox for the verification link before signing in.";
  }
  if (msg.includes("already registered") || msg.includes("user already")) {
    return "An account with this email already exists. Please sign in instead, or use a different email address.";
  }
  if (msg.includes("weak password") || msg.includes("password should be")) {
    return "This password is too weak. Please choose a stronger password of at least 6 characters.";
  }
  if (msg.includes("rate limit") || msg.includes("too many requests")) {
    return "Too many attempts. Please wait a moment before trying again.";
  }
  if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("fetch failed")) {
    return "We couldn't reach the authentication service. Please check your connection and try again.";
  }

  return rawMessage;
}

/**
 * Resolves the owner's display name: prefers `public.profiles.full_name`
 * (kept in sync by the database trigger), falls back to the signed-up
 * `full_name` user metadata, then the email address.
 */
export async function resolveFullName(user: User): Promise<string> {
  const metadataName = (user.user_metadata?.full_name as string | undefined) ?? "";
  const email = user.email ?? "";

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (!error && typeof data?.full_name === "string" && data.full_name.trim()) {
      return data.full_name.trim();
    }
  } catch {
    // Profiles lookup is best-effort; fall back to metadata below.
  }

  return metadataName.trim() || email || "Atelier Owner";
}
