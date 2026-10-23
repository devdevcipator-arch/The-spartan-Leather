/**
 * Shared product type + catalogue categories for the admin modals.
 *
 * `image` is the primary visual (the first entry of the product's uploaded
 * visuals); `sku` and `badge` are display-only fields already present in the
 * admin product table and shop cards, so they stay optional.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  sku?: string | null;
  badge?: string | null;
  /** All visual URLs; `image` mirrors the first entry. */
  images?: string[];
  /** Convenience accessor — the primary visual. */
  image: string;
  /** Server timestamp; used only for the existing "Last 7 Days" stat. */
  created_at?: string;
}

/** Fallback category list matching the platform's existing constants. */
export const CATEGORIES = [
  "Heavy Duty Gear",
  "Leather Jackets",
  "Leather Gloves",
  "Leather Bags",
  "Leather Wallets",
  "Leather Aprons",
  "Horse Riding Equipment",
  "Accessories",
] as const;

/** Map a `products` database row onto the shared Product shape. */
export function mapDbProduct(row: {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  badge?: string | null;
  sku?: string | null;
  images?: string[] | null;
  created_at?: string | null;
}): Product {
  const images = Array.isArray(row.images) ? row.images : [];
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description ?? "",
    sku: row.sku ?? null,
    badge: row.badge ?? null,
    images,
    image: images[0] ?? "",
    created_at: row.created_at ?? undefined,
  };
}
