import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProductManagement from "@/components/admin/AdminProductManagement";

export const metadata: Metadata = {
  title: "Product Management | The Spartan Leather",
  description:
    "Manage the Spartan Leather product collection, category labels and catalogue pricing.",
};

export default function AdminPage() {
  return (
    <div className="flex min-h-[100dvh] bg-[#0B0B0B] text-[#E5DFD3]">
      <AdminSidebar />
      <AdminProductManagement />
    </div>
  );
}
