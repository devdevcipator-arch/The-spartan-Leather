"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, LogOut, ShieldCheck } from "lucide-react";
import BrandCrest from "@/components/BrandCrest";
import { supabase } from "@/lib/supabase";

const NAV_ITEMS = [
  { name: "Products", href: "/admin", Icon: Lock },
];

/**
 * Fixed administrative sidebar.
 *
 * Matches the reference: flat leather-charcoal rail with a bronze hairline on
 * the right, a centred brand lockup under a gold divider, the primary nav, and
 * a divider-framed sign-out block pinned to the bottom.
 */
export default function AdminSidebar() {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!cancelled && user?.email) setAdminEmail(user.email);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-screen w-[248px] flex-col border-r border-[#7A5C22] bg-[#1A1918] lg:flex">
      {/* Brand lockup — same crest and typography as the main platform header */}
      <div className="flex h-[136px] shrink-0 flex-col items-center justify-center border-b border-[#372D1B] px-8 text-center">
        <BrandCrest size={44} className="h-11 w-11 object-contain" />
        <span className="mt-[10px] font-serif text-[15px] font-bold uppercase leading-none tracking-[0.18em] text-[#E0C681] select-none">
          The Spartan Leather
        </span>
      </div>

      {/* Navigation */}
      <nav aria-label="Admin" className="mt-[34px] flex flex-col">
        {NAV_ITEMS.map(({ name, href, Icon }) => (
          <Link
            key={name}
            href={href}
            aria-current="page"
            className="relative flex h-[52px] items-center gap-[11px] bg-gradient-to-r from-[#2A251C] to-[#1B1A18] px-8"
          >
            {/* Active rail accent */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-[3px] bg-[#C29B38]"
            />
            <Icon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[#C29B38]"
              strokeWidth={2}
            />
            <span className="select-none text-[14px] font-medium text-[#C29B38]">
              {name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Signed-in identity */}
      <div className="mt-auto shrink-0 px-4 py-3 border-t border-[#372D1B]">
        <div className="flex items-start justify-center gap-2 text-center">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C29B38]" />
          <span className="break-all text-[10px] uppercase tracking-[0.14em] text-[#8E8B85]">
            {adminEmail ? (
              <>
                Signed in as{" "}
                <span className="font-bold text-[#E0C681] normal-case tracking-normal">{adminEmail}</span>
              </>
            ) : (
              "Verifying session…"
            )}
          </span>
        </div>
      </div>

      {/* Sign out */}
      <div className="flex h-[93px] shrink-0 items-center justify-center border-t border-[#372D1B]">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          aria-label="Sign out"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[#242019] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? (
            <Loader2 aria-hidden="true" className="h-[18px] w-[18px] animate-spin text-[#8E8B85]" />
          ) : (
            <LogOut
              aria-hidden="true"
              className="h-[18px] w-[18px] text-[#6B6863]"
            />
          )}
        </button>
      </div>
    </aside>
  );
}
