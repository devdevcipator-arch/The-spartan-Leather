"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, SquarePen, Trash, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const labelClasses =
  "text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#66635E] select-none";

const SECTION_LABEL =
  "text-[13px] font-semibold leading-none text-[#CFCABF] select-none";

const inputClasses =
  "h-[46px] w-full rounded-[4px] border border-[#372D1B] bg-[#141210] px-4 text-[13px] text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none";

interface ManageCategoriesModalProps {
  open: boolean;
  onClose: () => void;
  /** Current category list (owned by the admin view). */
  categories: string[];
  /** Called with the updated category list after a successful add/remove. */
  onChange: (categories: string[]) => void;
}

/**
 * "MANAGE CATEGORIES" modal dialog.
 *
 * Adding and removing categories now persists to the database, with the list
 * passed in (and surfaced via onChange) by the admin view so the product
 * popups stay in sync.
 */
export default function ManageCategoriesModal({
  open,
  onClose,
  categories,
  onChange,
}: ManageCategoriesModalProps) {
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !adding) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, adding]);

  // Reset the draft whenever the dialog closes.
  useEffect(() => {
    if (open) return;
    setNewCategory("");
    setErrorMsg(null);
    setAdding(false);
  }, [open]);

  if (!open) return null;

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);

    const name = newCategory.trim();
    if (!name) return;
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setNewCategory("");
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase.from("categories").insert({ name });
      if (error) {
        setErrorMsg(error.message);
      } else {
        onChange([...categories, name]);
        setNewCategory("");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (name: string) => {
    setErrorMsg(null);
    // Optimistic removal, matching the previous instant local-state behavior;
    // reverted on failure.
    const previous = categories;
    onChange(categories.filter((c) => c !== name));
    const { error } = await supabase.from("categories").delete().eq("name", name);
    if (error) {
      onChange(previous);
      setErrorMsg(
        `Could not delete "${name}". ${error.message}`,
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-categories-title"
    >
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-xl border border-[#372D1B] bg-[#1A1918] shadow-[0_40px_120px_rgba(0,0,0,0.75),0_10px_36px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pb-5 pt-6">
          <div>
            <h2
              id="manage-categories-title"
              className="bg-gradient-to-b from-[#E7C771] to-[#A08132] bg-clip-text font-serif text-[19px] uppercase leading-none tracking-[0.11em] text-transparent select-none"
            >
              Manage Categories
            </h2>
            <p className="mt-[9px] text-[9px] uppercase leading-none tracking-[0.14em] text-[#66635E] select-none">
              The Spartan Leather • Admin Dashboard
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="-mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[#242019]"
          >
            <X aria-hidden="true" className="h-[18px] w-[18px] text-[#6B6863]" />
          </button>
        </div>

        {/* Divider between header and body */}
        <div className="border-b border-[#372D1B]" />

        <div className="px-8 py-6">
          {/* Add new category */}
          <div className="space-y-[11px]">
            <p className={SECTION_LABEL}>Add New Category</p>
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3 rounded bg-red-950/40 border border-red-800/50 text-red-300 text-xs tracking-wide">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span className="flex-1 leading-snug">{errorMsg}</span>
              </div>
            )}
            <form onSubmit={handleAdd} className="flex items-center gap-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Leather Vests"
                aria-label="New category name"
                disabled={adding}
                className={inputClasses}
              />
              <button
                type="submit"
                disabled={adding}
                className="inline-flex h-[46px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[radial-gradient(ellipse_at_center,#E7C771_0%,#D5B255_92%)] px-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#141210] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {adding && <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />}
                <span>{adding ? "Adding..." : "Add"}</span>
              </button>
            </form>
          </div>

          {/* Category list */}
          <div className="mt-[26px]">
            {/* Column headers */}
            <div className="flex items-center justify-between pb-[12px]">
              <span className={labelClasses}>Existing Categories</span>
              <span className={`${labelClasses} pr-[6px]`}>Actions</span>
            </div>

            <ul className="space-y-[10px]">
              {categories.map((category) => (
                <li
                  key={category}
                  className="flex h-[44px] items-center rounded-full border border-[#372D1B] bg-[#141210] pl-[18px] pr-[10px] transition-colors hover:bg-[#161514]"
                >
                  {/* Gold bullet + name */}
                  <span className="flex min-w-0 flex-1 items-center gap-[13px]">
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C29B38]"
                    />
                    <span className="truncate text-[13px] text-[#E5DFD3] select-none">
                      {category}
                    </span>
                  </span>

                  {/* Row actions */}
                  <span className="flex shrink-0 items-center gap-[6px] pr-[4px]">
                    <button
                      type="button"
                      aria-label={`Rename ${category}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#66635E] transition-colors hover:bg-[#242019] hover:text-[#C29B38]"
                    >
                      <SquarePen
                        aria-hidden="true"
                        className="h-[13px] w-[13px]"
                        strokeWidth={2}
                      />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${category}`}
                      onClick={() => handleRemove(category)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#66635E] transition-colors hover:bg-[#242019] hover:text-[#C29B38]"
                    >
                      <Trash
                        aria-hidden="true"
                        className="h-[13px] w-[13px]"
                        strokeWidth={2}
                      />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider between category list and footer */}
        <div className="border-t border-[#372D1B]" />

        {/* Footer action */}
        <div className="flex items-center justify-center px-8 py-5">
          <button
            type="button"
            className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.1em] text-[#C29B38] transition-colors hover:text-[#E0C681] select-none"
          >
            View All Categories ({categories.length})
          </button>
        </div>
      </div>
    </div>
  );
}
