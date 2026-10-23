"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Check, Loader2, SquarePen, Trash, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Product } from "./product-types";

const labelClasses =
  "text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#66635E] select-none";

const SECTION_LABEL =
  "text-[13px] font-semibold leading-none text-[#CFCABF] select-none";

const inputClasses =
  "h-[46px] w-full rounded-[4px] border border-[#372D1B] bg-[#141210] px-4 text-[13px] text-[#E5DFD3] placeholder-[#66635E] transition-colors focus:border-[#C29B38]/60 focus:outline-none";

/** Compact view length when the footer toggle collapses the list. */
const COLLAPSED_COUNT = 5;

interface ManageCategoriesModalProps {
  open: boolean;
  onClose: () => void;
  /** Current category list (owned by the admin view). */
  categories: string[];
  /** Called with the updated category list after a successful add/remove. */
  onChange: (categories: string[]) => void;
  /** Catalogue rows, used to flag categories still assigned to products. */
  products: Product[];
  /** Called after a rename cascade so the owner can reload products. */
  onRename?: () => void;
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
  products,
  onRename,
}: ManageCategoriesModalProps) {
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Inline rename state — the existing pencil control now works.
  const [renamingCategory, setRenamingCategory] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  // Footer toggle: default expanded = the modal's original full-list look.
  const [listExpanded, setListExpanded] = useState(true);

  // Close on Escape while open; Escape cancels an in-progress rename first.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (renamingCategory) {
          setRenamingCategory(null);
          setErrorMsg(null);
          return;
        }
        if (!adding) onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, adding, renamingCategory]);

  // Reset the draft whenever the dialog closes.
  useEffect(() => {
    if (open) return;
    setNewCategory("");
    setErrorMsg(null);
    setAdding(false);
    setRenamingCategory(null);
    setRenameValue("");
    setRenaming(false);
    setRemoving(null);
    setListExpanded(true);
  }, [open]);

  if (!open) return null;

  const usageCount = (name: string) =>
    products.filter((p) => p.category === name).length;

  const beginRename = (name: string) => {
    setRenamingCategory(name);
    setRenameValue(name);
  };

  const cancelRename = () => {
    setRenamingCategory(null);
    setRenameValue("");
    setErrorMsg(null);
  };

  const submitRename = async () => {
    setErrorMsg(null);

    const previous = renamingCategory;
    if (!previous) return;

    const next = renameValue.trim();
    if (!next || next === previous) {
      cancelRename();
      return;
    }
    if (categories.some((c) => c.toLowerCase() === next.toLowerCase())) {
      setErrorMsg(`"${next}" already exists. Category names must be unique.`);
      return;
    }

    setRenaming(true);
    try {
      const { error: categoryError } = await supabase
        .from("categories")
        .update({ name: next })
        .eq("name", previous);
      if (categoryError) throw categoryError;

      // Cascade: products store their category as text, so every product on
      // the old label follows the rename to keep the table and shop in sync.
      const { error: productError } = await supabase
        .from("products")
        .update({ category: next })
        .eq("category", previous);
      if (productError) throw productError;

      onChange(categories.map((c) => (c === previous ? next : c)));
      if (onRename) onRename();
      cancelRename();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error. Please try again.");
    } finally {
      setRenaming(false);
    }
  };

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

    // Usage-aware: deleting a category still assigned to products would leave
    // those products stranded on a label the popups no longer offer.
    const inUse = usageCount(name);
    if (inUse > 0) {
      setErrorMsg(
        `"${name}" is assigned to ${inUse} product${inUse === 1 ? "" : "s"}. Reassign or delete those products first.`,
      );
      return;
    }

    setRemoving(name);
    const { error } = await supabase.from("categories").delete().eq("name", name);
    if (error) {
      setErrorMsg(`Could not delete "${name}". ${error.message}`);
    } else {
      onChange(categories.filter((c) => c !== name));
    }
    setRemoving(null);
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
              {(listExpanded
                ? categories
                : categories.slice(0, COLLAPSED_COUNT)
              ).map((category) => (
                <li
                  key={category}
                  className="flex h-[44px] items-center rounded-full border border-[#372D1B] bg-[#141210] pl-[18px] pr-[10px] transition-colors hover:bg-[#161514]"
                >
                  {renamingCategory === category ? (
                    /* Inline rename editor — reuses the platform input styling */
                    <>
                      <input
                        type="text"
                        value={renameValue}
                        autoFocus
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void submitRename();
                          }
                        }}
                        aria-label={`Rename ${category}`}
                        disabled={renaming}
                        className="mr-2 h-[32px] min-w-0 flex-1 rounded-[4px] border border-[#C29B38]/50 bg-[#141210] px-3 text-[13px] text-[#E5DFD3] focus:outline-none"
                      />
                      <span className="flex shrink-0 items-center gap-[4px] pr-[2px]">
                        <button
                          type="button"
                          aria-label={`Confirm renaming ${category}`}
                          onClick={() => void submitRename()}
                          disabled={renaming}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#C29B38] transition-colors hover:bg-[#242019] hover:text-[#E0C681] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {renaming ? (
                            <Loader2 aria-hidden="true" className="h-[13px] w-[13px] animate-spin" />
                          ) : (
                            <Check aria-hidden="true" className="h-[13px] w-[13px]" strokeWidth={2} />
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label={`Cancel renaming ${category}`}
                          onClick={cancelRename}
                          disabled={renaming}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#66635E] transition-colors hover:bg-[#242019] hover:text-[#E0C681] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <X aria-hidden="true" className="h-[13px] w-[13px]" />
                        </button>
                      </span>
                    </>
                  ) : (
                    /* Gold bullet + name */
                    <>
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
                          onClick={() => beginRename(category)}
                          disabled={renaming || removing !== null || adding}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#66635E] transition-colors hover:bg-[#242019] hover:text-[#C29B38] disabled:cursor-not-allowed disabled:opacity-50"
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
                          onClick={() => void handleRemove(category)}
                          disabled={renaming || removing !== null || adding}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-[#66635E] transition-colors hover:bg-[#242019] hover:text-[#C29B38] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {removing === category ? (
                            <Loader2
                              aria-hidden="true"
                              className="h-[13px] w-[13px] animate-spin"
                            />
                          ) : (
                            <Trash
                              aria-hidden="true"
                              className="h-[13px] w-[13px]"
                              strokeWidth={2}
                            />
                          )}
                        </button>
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
            {!listExpanded && categories.length > COLLAPSED_COUNT && (
              <p className="pt-[10px] text-center text-[10px] uppercase tracking-[0.14em] text-[#66635E] select-none">
                …and {categories.length - COLLAPSED_COUNT} more
              </p>
            )}
          </div>
        </div>

        {/* Divider between category list and footer */}
        <div className="border-t border-[#372D1B]" />

        {/* Footer action — toggles the list between compact and full view */}
        <div className="flex items-center justify-center px-8 py-5">
          <button
            type="button"
            onClick={() => setListExpanded((prev) => !prev)}
            className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.1em] text-[#C29B38] transition-colors hover:text-[#E0C681] select-none"
          >
            {listExpanded
              ? `Collapse Categories (${categories.length})`
              : `View All Categories (${categories.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
