import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProductManagement from "@/components/admin/AdminProductManagement";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Product Management | The Spartan Leather",
  description:
    "Manage the Spartan Leather product collection, category labels and catalogue pricing.",
};

// Auth-gated route: must always render on the server per request so an
// unauthenticated visitor never receives a cached/static admin shell.
export const instant = false;

export default async function AdminPage() {
  // Defense in depth: verify the session on the server even if the proxy
  // matcher is ever bypassed (e.g. by an internal Server Function request).
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  return (
    <div className="flex min-h-[100dvh] bg-[#0B0B0B] text-[#E5DFD3]">
      <AdminSidebar />
      <AdminProductManagement />
    </div>
  );
}
