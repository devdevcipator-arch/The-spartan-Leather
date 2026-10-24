-- ============================================================
-- The Spartan Leather — category integrity guards (migration 002)
-- Run this whole file in the Supabase SQL Editor (dashboard).
--
-- Purpose: the app currently maintains product↔category consistency in
-- JavaScript (Manage Categories modal cascades renames and blocks deletes
-- of in-use labels). These triggers enforce the same rules at the database
-- level so the catalogue can never drift — no matter which client writes.
-- ============================================================

-- 1) Rename cascade ------------------------------------------------------
-- When a category is renamed, every product row still pointing at the old
-- label follows automatically. (The modal already does this in JS; the
-- trigger makes it a single atomic, mandatory operation.)
create or replace function cascade_category_rename()
returns trigger
language plpgsql
as $$
begin
  update products
  set category = new.name
  where category = old.name;
  return new;
end;
$$;

drop trigger if exists categories_rename_cascade on categories;
create trigger categories_rename_cascade
  after update of name on categories
  for each row
  when (old.name is distinct from new.name)
  execute function cascade_category_rename();

-- 2) Delete guard --------------------------------------------------------
-- A category still assigned to products cannot be deleted — the client gets
-- an explicit error instead of silently leaving orphaned labels behind.
create or replace function guard_category_delete()
returns trigger
language plpgsql
as $$
begin
  if exists (select 1 from products where category = old.name) then
    raise exception 'Category "%" is still assigned to one or more products and cannot be deleted.', old.name
      using errcode = 'foreign_key_violation';
  end if;
  return old;
end;
$$;

drop trigger if exists categories_delete_guard on categories;
create trigger categories_delete_guard
  before delete on categories
  for each row
  execute function guard_category_delete();

-- 3) Assignment guard ----------------------------------------------------
-- New/edited products may only be labelled with a category that exists in
-- the categories table — closes the door on orphaned product rows.
create or replace function guard_product_category()
returns trigger
language plpgsql
as $$
begin
  if not exists (select 1 from categories where name = new.category) then
    raise exception 'Category "%" does not exist in the categories table.', new.category
      using errcode = 'foreign_key_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists products_category_guard on products;
create trigger products_category_guard
  before insert or update of category on products
  for each row
  execute function guard_product_category();
