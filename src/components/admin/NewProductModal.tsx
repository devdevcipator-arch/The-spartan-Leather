"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, CloudUpload, X } from "lucide-react";

const statLabelClasses =
  "text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#A08132] select-none";

const inputClasses =
  "h-[46px] w-full rounded-[3px] border border-[#372D1B] bg-[#141210] px-4 text-[13px] text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none";

interface NewProductModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "NEW PRODUCT" modal dialog.
 *
 * Front-end only: submissions reset the form and close the dialog — no
 * inventory state or API is wired yet.
 */
export default function NewProductModal({ open, onClose }: NewProductModalProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Heavy Duty Gear");
  const [description, setDescription] = useState("");
  const [visuals, setVisuals] = useState<File[]>([]);
  const visualInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reset the draft whenever the dialog closes.
  useEffect(() => {
    if (open) return;
    setProductName("");
    setCategory("Heavy Duty Gear");
    setDescription("");
    setVisuals([]);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: wire to inventory state / API.
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[#242019]"
          >
            <X aria-hidden="true" className="h-[18px] w-[18px] text-[#6B6863]" />
          </button>
        </div>

        {/* Divider between header and form */}
        <div className="border-b border-[#372D1B]" />

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-8 py-6">
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
                  className={`${inputClasses} cursor-pointer appearance-none pr-10`}
                >
                  {[
                    "Heavy Duty Gear",
                    "Leather Jackets",
                    "Leather Gloves",
                    "Leather Bags",
                    "Leather Wallets",
                    "Leather Aprons",
                    "Accessories",
                  ].map((option) => (
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
                className="w-full resize-none rounded-[3px] border border-[#372D1B] bg-[#141210] px-4 py-3 text-[13px] leading-relaxed text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none"
              />
            </div>

            {/* Product visuals */}
            <div className="space-y-[9px]">
              <span className={statLabelClasses}>Product Visuals</span>
              <button
                type="button"
                onClick={() => visualInputRef.current?.click()}
                className="flex w-full cursor-pointer flex-col items-center gap-[14px] rounded-[6px] border-2 border-dashed border-[#4A3D22] bg-[#141210] px-6 py-9 text-center transition-colors hover:border-[#C29B38]/50 hover:bg-[#161514]"
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
              className="inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[3px] border border-[#372D1B] bg-[#141210] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#CFCABF] transition-colors hover:border-[#C29B38]/50 hover:text-[#E0C681]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-[44px] cursor-pointer items-center justify-center rounded-[3px] bg-[radial-gradient(ellipse_at_center,#E7C771_0%,#D5B255_92%)] px-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#141210] transition-opacity hover:opacity-90"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
