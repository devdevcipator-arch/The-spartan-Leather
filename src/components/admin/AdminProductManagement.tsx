"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Loader2, Lock, LogOut, Plus, SquarePen, Trash, UserPlus } from "lucide-react";
import BrandCrest from "@/components/BrandCrest";
import NewProductModal from "@/components/admin/NewProductModal";
import EditProductModal from "@/components/admin/EditProductModal";
import ManageCategoriesModal from "@/components/admin/ManageCategoriesModal";
import { supabase } from "@/lib/supabase";
import { fetchCategories, fetchProducts } from "@/lib/catalog";
import { CATEGORIES, type Product } from "./product-types";

/**
 * Column proportions for the product grid, measured from the reference at
 * 1440px (content box 1111px between the 41px rail paddings). Expressed in
 * `fr` so they scale with the viewport while holding the exact ratios.
 */
const GRID_COL_CLASSES =
  "grid grid-cols-[159fr_286fr_309fr_174fr] items-center";

const statLabelClasses =
  "text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#A08132] select-none";

/**
 * Products management view.
 *
 * Live wiring: the catalogue is read from the `products` table; adding,
 * editing and deleting persist to the database. Category management is
 * shared with the product popups. The stat cards reflect the real counts
 * from the table.
 */
export default function AdminProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([...CATEGORIES]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [productResult, categoryResult] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
    if (!categoryResult.failed) setCategories(categoryResult.categories);
    setProducts(productResult.products);
    setLoading(false);
  }, []);

  // Load the catalogue on mount.
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleDelete = async (product: Product) => {
    setDeletingId(product.id);
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      // Surface failures through the popups' shared banner style
      console.error("Failed to delete product:", error.message);
    }
    setDeletingId(null);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [searchQuery, products]);

  // Real stats derived from the catalogue (previously hardcoded placeholders)
  const totalInventory = products.length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newStock = products.filter(
    (p) => p.created_at && new Date(p.created_at).getTime() >= weekAgo,
  ).length;

  return (
    <main className="min-w-0 flex-1 lg:ml-[248px]">
      {/* Mobile brand bar (the desktop rail is hidden below lg) */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#372D1B] bg-[#1A1918] px-6 lg:hidden">
        <div className="flex items-center gap-3">
          <BrandCrest size={32} className="h-8 w-8 object-contain" />
          <div className="flex flex-col">
            <span className="font-serif text-[15px] font-bold uppercase leading-none tracking-[0.18em] text-[#E0C681] select-none">
              The Spartan Leather
            </span>
          </div>
        </div>
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

      {/* Page title — no divider below, per the reference */}
      <header className="flex h-20 items-center px-10">
        <h1 className="font-serif text-[18px] uppercase leading-none tracking-[0.11em] text-[#CFCABF] select-none">
          Product Management
        </h1>
      </header>

      {/* Content */}
      <div className="px-10 pb-16 pt-[40px]">
        {/* Inventory summary — live counts from the products table */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-[#372D1B] bg-[#1A1918] px-[26px] pb-[28px] pt-[27px]">
            <span className={statLabelClasses}>Total Inventory</span>
            <div className="mt-[6px] flex items-baseline gap-[14px]">
              <span className="text-[40px] leading-none text-[#E5DFD3] lining-nums select-none [font-family:var(--font-cormorant)]">
                {loading ? "—" : totalInventory}
              </span>
              <span className="text-[12px] text-[#6B6863] select-none">Active Products</span>
            </div>
          </div>
          <div className="border border-[#372D1B] bg-[#1A1918] px-[26px] pb-[28px] pt-[27px]">
            <span className={statLabelClasses}>New Stock</span>
            <div className="mt-[6px] flex items-baseline gap-[14px]">
              <span className="text-[40px] leading-none text-[#E5DFD3] lining-nums select-none [font-family:var(--font-cormorant)]">
                {loading ? "—" : newStock}
              </span>
              <span className="text-[12px] text-[#6B6863] select-none">Last 7 Days</span>
            </div>
          </div>
        </section>

        {/* Collection search & catalogue actions */}
        <div className="mt-[33px] flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-[40px]">
          <label className="relative flex h-[46px] w-full flex-1 items-center rounded-[3px] border border-[#372D1B] bg-[#1A1918] pl-4 pr-4 transition-colors focus-within:border-[#C29B38]/60">
            <UserPlus
              aria-hidden="true"
              className="h-[18px] w-[18px] shrink-0 text-[#A08132]"
            />
            <span className="sr-only">Search product collection</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product collection..."
              className="ml-[11px] h-full w-full bg-transparent text-[13px] text-[#E5DFD3] placeholder-[#9CA3AF] focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setManageCategoriesOpen(true)}
            className="inline-flex h-[44px] w-full shrink-0 cursor-pointer items-center justify-center gap-[14px] whitespace-nowrap bg-[radial-gradient(ellipse_at_center,#E7C771_0%,#D5B255_92%)] px-6 text-[13px] font-bold tracking-[0.08em] text-[#141210] uppercase transition-opacity hover:opacity-90 xl:w-[262px]"
          >
            <SquarePen aria-hidden="true" className="h-[17px] w-[17px] shrink-0" />
            <span>Manage Category</span>
          </button>
          <button
            type="button"
            onClick={() => setNewProductOpen(true)}
            className="inline-flex h-[44px] w-full shrink-0 cursor-pointer items-center justify-center gap-[14px] whitespace-nowrap bg-[radial-gradient(ellipse_at_center,#E7C771_0%,#D5B255_92%)] px-6 text-[12px] font-bold tracking-[0.02em] text-[#141210] uppercase transition-opacity hover:opacity-90 xl:w-[236px]"
          >
            <Plus aria-hidden="true" className="h-[13px] w-[13px] shrink-0" />
            <span>Add New Product</span>
          </button>
        </div>

        <NewProductModal
          open={newProductOpen}
          onClose={() => setNewProductOpen(false)}
          categories={categories}
          onCreate={() => {
            setNewProductOpen(false);
            void refresh();
          }}
        />

        <EditProductModal
          open={editingProduct !== null}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          categories={categories}
          onSave={() => {
            void refresh();
          }}
        />

        <ManageCategoriesModal
          open={manageCategoriesOpen}
          onClose={() => setManageCategoriesOpen(false)}
          categories={categories}
          onChange={setCategories}
        />

        {/* Product table */}
        <section className="mt-[33px] overflow-hidden border border-[#372D1B] bg-[#1A1918]">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Column headers spanning full table width */}
              <div
                className={`${GRID_COL_CLASSES} h-[55px] border-b border-[#372D1B] px-[41px]`}
              >
                {["Image", "Product Name", "Category"].map((label) => (
                  <span key={label} className={statLabelClasses}>
                    {label}
                  </span>
                ))}
                <span className={`${statLabelClasses} justify-self-end`}>
                  Actions
                </span>
              </div>

              {/* Rows */}
              {loading ? (
                <div className="py-16 text-center text-[13px] text-[#66635E]">
                  <Loader2 aria-hidden="true" className="mx-auto mb-3 h-6 w-6 animate-spin text-[#C29B38]" />
                  Loading the product collection...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-16 text-center text-[13px] text-[#66635E]">
                  {products.length === 0
                    ? "No products in the collection yet. Use Add New Product to begin."
                    : "No products match that search."}
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`${GRID_COL_CLASSES} border-b border-[#242019] py-[18px] pl-[41px] pr-[41px] transition-colors last:border-b-0 hover:bg-[#201E1A]`}
                  >
                    {/* Thumbnail */}
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] object-cover"
                      />
                    ) : (
                      <div className="flex h-[60px] w-[60px] items-center justify-center border border-[#372D1B] bg-[#242019]">
                        <BrandCrest size={28} className="h-7 w-7 object-contain opacity-70" />
                      </div>
                    )}

                    {/* Name + SKU */}
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold leading-tight text-[#E5DFD3] select-none">
                        {product.name}
                      </p>
                      {product.sku && (
                        <p className="mt-[2px] truncate text-[10px] leading-none text-[#66635E] select-none">
                          SKU: {product.sku}
                        </p>
                      )}
                    </div>

                    {/* Category chip */}
                    <span className="inline-flex w-fit items-center rounded-full bg-[#2B2A28] px-[13px] py-[4px] text-[10px] font-medium tracking-[0.05em] text-[#9B978F] uppercase select-none">
                      {product.category}
                    </span>

                    {/* Row actions */}
                    <div className="flex items-center justify-end gap-[17px]">
                      <button
                        type="button"
                        aria-label={`Edit ${product.name}`}
                        onClick={() => setEditingProduct(product)}
                        className="flex cursor-pointer items-center justify-center rounded p-[3px] text-[#C29B38] transition-colors hover:bg-[#242019] hover:text-[#E0C681]"
                      >
                        <SquarePen
                          aria-hidden="true"
                          className="h-4 w-4"
                          strokeWidth={2}
                        />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => void handleDelete(product)}
                        disabled={deletingId !== null}
                        className="flex cursor-pointer items-center justify-center rounded p-[3px] text-[#C29B38] transition-colors hover:bg-[#242019] hover:text-[#E0C681] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === product.id ? (
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <Trash
                            aria-hidden="true"
                            className="h-4 w-4"
                            strokeWidth={2}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
