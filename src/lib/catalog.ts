/**
 * Catalogue data access shared by the admin dashboard, its modals and the
 * storefront. All visual/field names mirror the platform UI — no inventory,
 * price or stock data is touched.
 */
import { supabase } from "@/lib/supabase";
import {
  CATEGORIES,
  mapDbProduct,
  type Product,
} from "@/components/admin/product-types";

/** Storage bucket used by the Product Visuals upload zone. */
export const VISUALS_BUCKET = "product-visuals";

export async function fetchProducts(): Promise<{
  products: Product[];
  failed: boolean;
}> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, description, badge, sku, images, created_at")
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    return { products: [], failed: true };
  }
  return { products: data.map(mapDbProduct), failed: false };
}

export async function fetchCategories(): Promise<{
  categories: string[];
  failed: boolean;
}> {
  const { data, error } = await supabase
    .from("categories")
    .select("name")
    .order("name", { ascending: true });

  if (error || !Array.isArray(data) || data.length === 0) {
    // Fall back to the platform's existing constant category list.
    return { categories: [...CATEGORIES], failed: true };
  }
  return { categories: data.map((row: { name: string }) => row.name), failed: false };
}

/**
 * Upload product visuals to storage and return their public URLs.
 * Files are stored under a random folder so names never collide.
 */
export async function uploadVisuals(files: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}/visual.${ext.toLowerCase()}`;

    const { error } = await supabase.storage
      .from(VISUALS_BUCKET)
      .upload(path, file, { upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from(VISUALS_BUCKET).getPublicUrl(path);
    if (data?.publicUrl) urls.push(data.publicUrl);
  }

  return urls;
}

export function removeVisualByPath(url: string): Promise<unknown> {
  // Public URL -> bucket path: /storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${VISUALS_BUCKET}/`;
  const at = url.indexOf(marker);
  if (at === -1) return Promise.resolve();
  const path = url.slice(at + marker.length);
  return supabase.storage.from(VISUALS_BUCKET).remove([path]);
}
