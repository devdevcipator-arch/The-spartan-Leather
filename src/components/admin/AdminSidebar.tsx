import Link from "next/link";
import { Lock, LogOut } from "lucide-react";
import BrandCrest from "@/components/BrandCrest";

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
            <Lock
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

      {/* Sign out */}
      <div className="mt-auto flex h-[93px] shrink-0 items-center justify-center border-t border-[#372D1B]">
        <button
          type="button"
          aria-label="Sign out"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[#242019]"
        >
          <LogOut
            aria-hidden="true"
            className="h-[18px] w-[18px] text-[#6B6863]"
          />
        </button>
      </div>
    </aside>
  );
}
