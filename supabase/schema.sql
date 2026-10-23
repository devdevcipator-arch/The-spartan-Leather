-- ============================================================
-- The Spartan Leather — product catalogue schema + seed
-- Run this whole file in the Supabase SQL Editor (dashboard).
--
-- Scope: wires ONLY what already exists in the platform UI:
--   - Add/Edit Product popups: name, category, description, visuals
--   - Product table: image, name + sku, category
--   - Shop cards: image, name, category, badge, description
-- No price/stock/inventory fields — none exist in the UI.
--
-- NOTE: the existing `products` table (id/created_at/owner_id) is a leftover
-- auth-demo table that no page reads. It is replaced below. It renders as
-- empty through the public API, i.e. it holds no visible platform data.
-- ============================================================

-- 1) Replace the leftover test `products` table --------------------------
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  category    text        NOT NULL,
  description text        DEFAULT '',
  badge       text        DEFAULT NULL,   -- shop card ribbon (already in UI)
  sku         text        DEFAULT NULL,   -- product table row label (already in UI)
  images      jsonb       NOT NULL DEFAULT '[]'::jsonb,  -- visual URLs (first = thumbnail)
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2) Categories table (powers Manage Categories + popup dropdown) --------
CREATE TABLE categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3) Row Level Security --------------------------------------------------
alter table products   enable row level security;
alter table categories enable row level security;

-- Everyone (public storefront) may read the catalogue
create policy "products are readable by everyone"
  on products for select using (true);
create policy "categories are readable by everyone"
  on categories for select using (true);

-- Only signed-in dashboard users (admin login) may modify
create policy "signed-in users can insert products"
  on products for insert to authenticated with check (true);
create policy "signed-in users can update products"
  on products for update to authenticated using (true) with check (true);
create policy "signed-in users can delete products"
  on products for delete to authenticated using (true);

create policy "signed-in users can insert categories"
  on categories for insert to authenticated with check (true);
create policy "signed-in users can update categories"
  on categories for update to authenticated using (true) with check (true);
create policy "signed-in users can delete categories"
  on categories for delete to authenticated using (true);

-- 4) Storage bucket for the Product Visuals upload zone ------------------
insert into storage.buckets (id, name, public)
values ('product-visuals', 'product-visuals', true)
on conflict (id) do nothing;

-- Everyone may view uploaded visuals (consistent with public storefront)
create policy "product visuals are publicly readable"
  on storage.objects for select using (bucket_id = 'product-visuals');
-- Uploads/management limited to signed-in dashboard users
create policy "signed-in users can upload product visuals"
  on storage.objects for insert to authenticated with check (bucket_id = 'product-visuals');
create policy "signed-in users can update product visuals"
  on storage.objects for update to authenticated using (bucket_id = 'product-visuals');
create policy "signed-in users can delete product visuals"
  on storage.objects for delete to authenticated using (bucket_id = 'product-visuals');

-- 5) Seed categories — the exact set already visible across the platform
--    (Manage Categories initial list + popup dropdown + category constants)
INSERT INTO categories (name) VALUES
  ('Heavy Duty Gear'),
  ('Leather Jackets'),
  ('Leather Gloves'),
  ('Leather Bags'),
  ('Leather Wallets'),
  ('Leather Belts'),
  ('Leather Aprons'),
  ('Horse Riding Equipment'),
  ('Accessories'),
  ('Equestrian & Saddlery'),
  ('Vests & Armor'),
  ('Small Accessories');

-- 6) Seed products — the exact catalogue already displayed in the platform
--    (Admin table rows + Shop page cards), using the existing image assets.
INSERT INTO products (name, category, description, badge, sku, images, created_at) VALUES
  -- Admin dashboard table fixtures
  ('Spartan Elite Biker',
   'Leather Jackets',
   'Full-grain cowhide biker jacket with reinforced shoulders.',
   NULL, 'SP-001-BLK',
   '["/images/shop/jacket.jpg"]'::jsonb,
   now() - interval '12 days'),
  ('Atelier Equine Saddle',
   'Horse Riding Equipment',
   'Hand-stitched English saddle in vegetable-tanned leather.',
   NULL, 'SP-EQ-042',
   '["/images/shop/saddle.jpg"]'::jsonb,
   now() - interval '20 days'),
  ('Executive Briefcase',
   'Accessories',
   'Structured briefcase in pebbled leather with brass fittings.',
   NULL, 'SP-ACC-98',
   '["/images/shop/duffle.jpg"]'::jsonb,
   now() - interval '25 days'),
  ('Heritage Riding Gloves',
   'Horse Riding Equipment',
   'Deerskin riding gloves with suede grip panels.',
   NULL, 'SP-EQ-102',
   '["/images/shop/gloves.jpg"]'::jsonb,
   now() - interval '15 days'),
  -- Shop page card fixtures
  ('SPARTAN VANGUARD JACKET',
   'Leather Jackets',
   'Hand-burnished full-grain cowhide leather with reinforced double stitching.',
   'BEST SELLER', NULL,
   '["/images/shop/jacket.jpg"]'::jsonb,
   now() - interval '2 days'),
  ('THE ODYSSEY DUFFLE',
   'Leather Bags',
   'Spacious, rugged, and refined. Designed for the modern-day conqueror.',
   'LIMITED EDITION', NULL,
   '["/images/shop/duffle.jpg"]'::jsonb,
   now() - interval '4 days'),
  ('CENTURION SADDLE BELT',
   'Leather Belts',
   'Full-grain vegetable-tanned steerhide fitted with an antiqued solid brass Spartan crest buckle.',
   'LIMITED EDITION', NULL,
   '["/images/shop/belt.jpg"]'::jsonb,
   now() - interval '9 days'),
  ('CRAFTSMAN ARMOR APRON',
   'Leather Aprons',
   'Maximum protection and utility for professional artisans and metalworkers.',
   NULL, NULL,
   '["/images/shop/apron.jpg"]'::jsonb,
   now() - interval '11 days'),
  ('ROYAL EQUESTRIAN SADDLE',
   'Equestrian & Saddlery',
   'Engineered for comfort and control. The pinnacle of horse riding equipment.',
   NULL, NULL,
   '["/images/shop/saddle.jpg"]'::jsonb,
   now() - interval '14 days'),
  ('PHALANX BIFOLD WALLET',
   'Leather Wallets',
   'Slim silhouette, maximum security. Crafted from premium Italian calfskin.',
   NULL, NULL,
   '["/images/shop/wallet.jpg"]'::jsonb,
   now() - interval '18 days'),
  ('GOLIATH WORK GLOVES',
   'Leather Gloves',
   'Double-reinforced palms and heat-resistant thread for extreme durability.',
   NULL, NULL,
   '["/images/shop/gloves.jpg"]'::jsonb,
   now() - interval '21 days'),
  ('ARES REINFORCED VEST',
   'Vests & Armor',
   'Heavy-gauge tactical cowhide vest with reinforced dual-stitch panels and concealed carry pockets.',
   NULL, NULL,
   '["/images/shop/jacket.jpg"]'::jsonb,
   now() - interval '26 days'),
  ('SPARTAN ARTISAN ROLL',
   'Small Accessories',
   'Dedicated full-grain roll-up tool case engineered for master craftsmen, mechanics, and barbers.',
   NULL, NULL,
   '["/images/shop/wallet.jpg"]'::jsonb,
   now() - interval '30 days');
