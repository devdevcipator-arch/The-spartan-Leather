/** Shared product fixture type + catalogue categories for the admin modals. */
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  image: string;
}

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
