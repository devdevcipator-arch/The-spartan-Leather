-- ============================================================
-- The Spartan Leather — dedupe overlapping seed categories (migration 003)
-- Run this whole file in the Supabase SQL Editor (dashboard).
--
-- Decision (owner-approved): keep the broadest labels.
--   'Small Accessories'   → merged into 'Accessories'
--   'Equestrian & Saddlery' → merged into 'Horse Riding Equipment'
-- Products are re-assigned FIRST, then the emptied rows are dropped —
-- order matters because the categories_delete_guard (migration 002)
-- refuses to delete a label still assigned to products.
-- ============================================================

-- 1) Re-assign products to the surviving labels ---------------------------
update products set category = 'Accessories'
  where category = 'Small Accessories';
update products set category = 'Horse Riding Equipment'
  where category = 'Equestrian & Saddlery';

-- 2) Drop the now-empty duplicate labels ----------------------------------
delete from categories where name in ('Small Accessories', 'Equestrian & Saddlery');

-- 3) Sanity check ----------------------------------------------------------
-- After running, this should return zero rows:
select name from products
where category in ('Small Accessories', 'Equestrian & Saddlery');
