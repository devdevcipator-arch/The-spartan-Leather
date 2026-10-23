"use client";

import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, ChevronDown, CloudUpload, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadVisuals } from "@/lib/catalog";
import { mapDbProduct, type Product } from "./product-types";

const statLabelClasses =
  "text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#A08132] select-none";

const inputClasses =
  "h-[46px] w-full rounded-[3px] border border-[#372D1B] bg-[#141210] px-4 text-[13px] text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none";

interface NewProductModalProps {
  open: boolean;
  onClose: () => void;
  /** Category options shown in the dropdown (owned by the admin view). */
  categories: string[];
  /** Called with the saved product after a successful insert. */
  onCreate: (product: Product) => void;
}

/**
 * "NEW PRODUCT" modal dialog.
 *
 * Field set is exactly the existing design: name, category, description,
 * visuals. On "Save Product" the visuals upload to storage and the product
 * row is inserted — then the dialog closes exactly as it did before wiring.
 */
export default function NewProductModal({
  open,
  onClose,
  categories,
  onCreate,
}: NewProductModalProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Heavy Duty Gear");
  const [description, setDescription] = useState("");
  const [visuals, setVisuals] = useState<File[]>([]);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const visualInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !saving) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, saving]);

  // Reset the draft whenever the dialog closes.
  useEffect(() => {
    if (open) return;
    setProductName("");
    setCategory(categories[0] ?? "Heavy Duty Gear");
    setDescription("");
    setVisuals([]);
    setErrorMsg(null);
    setSaving(false);
  }, [open, categories]);

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);

    if (!productName.trim()) {
      setErrorMsg("Please enter a product name.");
      return;
    }
    if (!category.trim()) {
      setErrorMsg("Please select a category.");
      return;
    }
    // Every storefront card renders a visual, so at least one asset is needed.
    if (visuals.length === 0) {
      setErrorMsg("Please upload at least one product visual.");
      return;
    }

    setSaving(true);
    try {
      const imageUrls = await uploadVisuals(visuals);

      const { data, error } = await supabase
        .from("products")
        .insert({
          name: productName.trim(),
          category: category.trim(),
          description: description.trim(),
          images: imageUrls,
        })
        .select("id, name, category, description, badge, sku, images, created_at")
        .single();

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        onCreate(mapDbProduct(data));
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMsg(err.message);
      else setErrorMsg("Unexpected error while saving the product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-product-title"
    >
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#372D1B] bg-[#1A1918] shadow-[0_40px_120px_rgba(0,0,0,0.75),0_10px_36px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pb-5 pt-6">
          <h2
            id="new-product-title"
            className="bg-gradient-to-b from-[#E7C771] to-[#A08132] bg-clip-text font-serif text-[19px] uppercase leading-none tracking-[0.11em] text-transparent select-none"
          >
            New Product
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            disabled={saving}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[#242019] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X aria-hidden="true" className="h-[18px] w-[18px] text-[#6B6863]" />
          </button>
        </div>

        {/* Divider between header and form */}
        <div className="border-b border-[#372D1B]" />

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-8 py-6">
            {/* Error notification (same banner style used across the platform) */}
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3 rounded bg-red-950/40 border border-red-800/50 text-red-300 text-xs tracking-wide">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span className="flex-1 leading-snug">{errorMsg}</span>
              </div>
            )}

            {/* Product name */}
            <div className="space-y-[9px]">
              <label htmlFor="new-product-name" className={statLabelClasses}>
                Product Name
              </label>
              <input
                id="new-product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Spartan Vanguard Apron"
                disabled={saving}
                className={inputClasses}
              />
            </div>

            {/* Category */}
            <div className="space-y-[9px]">
              <label htmlFor="new-product-category" className={statLabelClasses}>
                Category
              </label>
              <div className="relative">
                <select
                  id="new-product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={saving}
                  className={`${inputClasses} cursor-pointer appearance-none pr-10`}
                >
                  {categories.map((option) => (
                    <option key={option} value={option} className="bg-[#1A1918]">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#C29B38]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-[9px]">
              <label htmlFor="new-product-description" className={statLabelClasses}>
                Description
              </label>
              <textarea
                id="new-product-description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the craftsmanship and materials..."
                disabled={saving}
                className="w-full resize-none rounded-[3px] border border-[#372D1B] bg-[#141210] px-4 py-3 text-[13px] leading-relaxed text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none"
              />
            </div>

            {/* Product visuals */}
            <div className="space-y-[9px]">
              <span className={statLabelClasses}>Product Visuals</span>
              <button
                type="button"
                onClick={() => visualInputRef.current?.click()}
                disabled={saving}
                className="flex w-full cursor-pointer flex-col items-center gap-[14px] rounded-[6px] border-2 border-dashed border-[#4A3D22] bg-[#141210] px-6 py-9 text-center transition-colors hover:border-[#C29B38]/50 hover:bg-[#161514] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {/* Circular icon pill */}
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#372D1B] bg-[#242019]">
                  <CloudUpload
                    aria-hidden="true"
                    className="h-[20px] w-[20px] text-[#C29B38]"
                  />
                </span>

                <span className="text-[12px] text-[#9B978F]">
                  Drop high-resolution assets here or{" "}
                  <span className="font-semibold text-[#C29B38] underline underline-offset-2">
                    browse files
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#66635E] select-none">
                  PNG, JPG up to 10MB
                </span>
              </button>
              <input
                ref={visualInputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg"
                onChange={(e) =>
                  setVisuals(e.target.files ? Array.from(e.target.files) : [])
                }
                className="sr-only"
              />
              {visuals.length > 0 && (
                <ul className="space-y-[6px] pt-1">
                  {visuals.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center justify-between rounded-[3px] border border-[#242019] bg-[#141210] px-3 py-2 text-[11px] text-[#9B978F]"
                    >
                      <span className="truncate">{file.name}</span>
                      <span className="shrink-0 pl-3 text-[#66635E]">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Divider between form and footer actions */}
          <div className="border-t border-[#372D1B]" />

          {/* Footer actions — Cancel left-aligned, Save Product right-aligned */}
          <div className="flex items-center justify-between px-8 py-5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[3px] border border-[#372D1B] bg-[#141210] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#CFCABF] transition-colors hover:border-[#C29B38]/50 hover:text-[#E0C681] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-[44px] cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-[radial-gradient(ellipse_at_center,#E7C771_0%,#D5B255_92%)] px-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#141210] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
              <span>{saving ? "Saving Product..." : "Save Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
