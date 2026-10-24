"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  Loader2,
  Lock,
  LogOut,
  Plus,
  Search,
  SquarePen,
  Trash,
} from "lucide-react";
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

  // Category filter — same behaviour as the shop page: pill chips for the
  // leading categories, the rest ride in a "More Categories" dropdown.
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close the dropdown when clicking outside (same as the shop page filter).
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If a selected category is renamed or removed via Manage Categories,
  // fall back to the unfiltered "All" view.
  useEffect(() => {
    if (selectedCategory !== "All" && !categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  // Leading categories shown as inline pill chips (mirrors the shop page:
  // "All" plus the first two live categories), everything else rides in the
  // "More Categories" dropdown.
  const displayedCategories = ["All", ...categories.slice(0, 2)];

  // Every category not shown inline rides in the More Categories dropdown.
  const remainingCategories = categories.filter(
    (category) => !displayedCategories.includes(category),
  );

  const isRemainingCategorySelected =
    remainingCategories.includes(selectedCategory);

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
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, products]);

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
          <label className="relative flex h-[46px] w-full items-center rounded-full border border-[#7A5C22]/55 bg-[#121110] pl-4 pr-2 shadow-[0_4px_25px_rgba(0,0,0,0.7)] transition-colors focus-within:border-[#C29B38]/60">
            <Search
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[#C29B38]"
            />
            <span className="sr-only">Search product collection</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..."
              className="mx-[10px] h-full w-full min-w-0 bg-transparent text-[13px] text-[#E5DFD3] placeholder-[#E5DFD3]/40 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="cursor-pointer px-1 text-xs text-[#E5DFD3]/50 transition-colors hover:text-[#E0C681]"
              >
                ×
              </button>
            )}
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
          products={products}
          onRename={() => void refresh()}
        />

        {/* Category filter — same pattern as the shop page: leading categories as pill chips, the rest in a "More Categories" dropdown */}
        <div className="no-scrollbar mt-[33px] flex w-full max-w-full flex-col items-stretch gap-3 lg:flex-row lg:items-center relative z-30">
          <div className="no-scrollbar flex w-full min-w-0 max-w-full flex-wrap items-center gap-2 lg:w-auto lg:flex-nowrap">
            {/* Scrollable chips track — scrollbar completely hidden */}
            <div className="no-scrollbar flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto py-0.5 lg:flex-none">
              {displayedCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setDropdownOpen(false);
                    }}
                    className={`flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-[13px] transition-all duration-200 ${
                      isActive
                        ? "border border-transparent bg-[#C29B38] font-semibold text-[#121110] shadow-[0_0_14px_rgba(194,155,56,0.35)]"
                        : "border border-[#7A5C22]/45 bg-[#161514]/70 text-[#E5DFD3] hover:border-[#C29B38] hover:text-[#E0C681]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* More Categories dropdown — kept OUTSIDE the overflow track so the menu is never clipped */}
            <div
              className="relative w-full flex-shrink-0 lg:w-auto"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-[13px] transition-all duration-200 ${
                  isRemainingCategorySelected
                    ? "border border-transparent bg-[#C29B38] font-semibold text-[#121110] shadow-[0_0_14px_rgba(194,155,56,0.35)]"
                    : "border border-[#7A5C22]/45 bg-[#161514]/70 text-[#E5DFD3] hover:border-[#C29B38] hover:text-[#E0C681]"
                }`}
              >
                <span>
                  {isRemainingCategorySelected
                    ? selectedCategory
                    : "More Categories"}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="animate-spartan-dropdown no-scrollbar absolute left-auto right-0 top-full z-50 mt-2.5 w-60 max-w-[calc(100vw-3rem)] rounded-2xl border border-[#7A5C22]/60 bg-[#141312] px-1.5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(194,155,56,0.12)] backdrop-blur-md">
                  <div className="mb-1 flex items-center justify-between border-b border-[#7A5C22]/25 px-3 py-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C29B38]">
                      More Categories
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#E5DFD3]/40">
                      {remainingCategories.length} Items
                    </span>
                  </div>
                  <div className="no-scrollbar max-h-72 space-y-1 overflow-y-auto overscroll-contain">
                    {remainingCategories.map((category, idx) => {
                      const isSelected = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          style={{ animationDelay: `${idx * 60 + 30}ms` }}
                          onClick={() => {
                            setSelectedCategory(category);
                            setDropdownOpen(false);
                          }}
                          className={`animate-spartan-item flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] transition-all duration-200 ${
                            isSelected
                              ? "border border-[#C29B38]/40 bg-[#1E1C1B] font-semibold text-[#E0C681] shadow-[0_0_12px_rgba(194,155,56,0.2)]"
                              : "text-[#E5DFD3]/85 hover:translate-x-1 hover:bg-[#1A1918] hover:text-[#E0C681]"
                          }`}
                        >
                          <span className="tracking-wide">{category}</span>
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 text-[#C29B38]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
                    : "No products match the current filters."}
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
