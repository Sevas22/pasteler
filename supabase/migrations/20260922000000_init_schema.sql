-- Daliza Pastelería Fina — esquema inicial
-- Sucursales, productos (con asignación por sucursal), cursos, y control de acceso admin.
-- Sin módulo de inventario: el negocio pidió parametrización simple, no existencias/stock.

create extension if not exists pgcrypto;

-- ────────────────────────────────────────────────────────────────────────────
-- Sucursales
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  type text not null default 'Sucursal',
  address text not null,
  phone text,
  whatsapp text,
  hours text,
  is_principal boolean not null default false,
  maps_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.locations is 'Sedes/sucursales físicas de la pastelería. Cada una tiene su propio QR y subpágina pública.';

-- ────────────────────────────────────────────────────────────────────────────
-- Productos
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  description_long text not null default '',
  servicio text not null default 'pasteleria' check (servicio in ('panaderia', 'pasteleria', 'reposteria')),
  categoria text not null default '',
  image_url text,
  extra_images text[] not null default '{}',
  highlights text[] not null default '{}',
  price numeric(10, 2),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.products is 'Catálogo de productos. Sin inventario/stock — solo ficha + disponibilidad por sucursal vía product_locations.';

create index if not exists products_servicio_idx on public.products (servicio);
create index if not exists products_active_idx on public.products (active);

-- ────────────────────────────────────────────────────────────────────────────
-- Relación producto ⇄ sucursal — la parametrización pedida:
-- al crear/editar un producto en el admin se eligen las sucursales donde aparece.
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.product_locations (
  product_id uuid not null references public.products (id) on delete cascade,
  location_id uuid not null references public.locations (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, location_id)
);

create index if not exists product_locations_location_idx on public.product_locations (location_id);
create index if not exists product_locations_product_idx on public.product_locations (product_id);

-- ────────────────────────────────────────────────────────────────────────────
-- Cursos
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  description_long text not null default '',
  image_url text,
  extra_images text[] not null default '{}',
  duration text,
  students text,
  level text,
  topics text[] not null default '{}',
  highlights text[] not null default '{}',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- Administradores (allowlist) — evita usar user_metadata (editable por el usuario)
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

comment on function public.is_admin() is
  'SECURITY DEFINER intencional: solo consulta la tabla admins (allowlist), no expone datos de negocio.';

-- ────────────────────────────────────────────────────────────────────────────
-- updated_at automático
-- ────────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.locations;
create trigger set_updated_at before update on public.locations
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.products;
create trigger set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.courses;
create trigger set_updated_at before update on public.courses
for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────────────────────
-- RLS
-- ────────────────────────────────────────────────────────────────────────────
alter table public.locations enable row level security;
alter table public.products enable row level security;
alter table public.product_locations enable row level security;
alter table public.courses enable row level security;
alter table public.admins enable row level security;

-- locations: lectura pública de sedes activas; admins ven y editan todo
create policy "locations_select_public" on public.locations
for select to anon, authenticated
using (active or public.is_admin());

create policy "locations_write_admin" on public.locations
for insert to authenticated
with check (public.is_admin());

create policy "locations_update_admin" on public.locations
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "locations_delete_admin" on public.locations
for delete to authenticated
using (public.is_admin());

-- products: lectura pública de productos activos; admins ven y editan todo
create policy "products_select_public" on public.products
for select to anon, authenticated
using (active or public.is_admin());

create policy "products_write_admin" on public.products
for insert to authenticated
with check (public.is_admin());

create policy "products_update_admin" on public.products
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "products_delete_admin" on public.products
for delete to authenticated
using (public.is_admin());

-- product_locations: lectura pública (define qué se muestra en cada sede); solo admin escribe
create policy "product_locations_select_public" on public.product_locations
for select to anon, authenticated
using (true);

create policy "product_locations_write_admin" on public.product_locations
for insert to authenticated
with check (public.is_admin());

create policy "product_locations_delete_admin" on public.product_locations
for delete to authenticated
using (public.is_admin());

-- courses: lectura pública de cursos activos; admins ven y editan todo
create policy "courses_select_public" on public.courses
for select to anon, authenticated
using (active or public.is_admin());

create policy "courses_write_admin" on public.courses
for insert to authenticated
with check (public.is_admin());

create policy "courses_update_admin" on public.courses
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "courses_delete_admin" on public.courses
for delete to authenticated
using (public.is_admin());

-- admins: solo un admin existente puede ver/gestionar la allowlist
create policy "admins_select_admin" on public.admins
for select to authenticated
using (public.is_admin());

create policy "admins_write_admin" on public.admins
for insert to authenticated
with check (public.is_admin());

create policy "admins_delete_admin" on public.admins
for delete to authenticated
using (public.is_admin());

-- ────────────────────────────────────────────────────────────────────────────
-- Storage: bucket público de imágenes de producto/curso/sede
-- ────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('daliza-media', 'daliza-media', true)
on conflict (id) do nothing;

create policy "daliza_media_public_read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'daliza-media');

create policy "daliza_media_admin_insert" on storage.objects
for insert to authenticated
with check (bucket_id = 'daliza-media' and public.is_admin());

create policy "daliza_media_admin_update" on storage.objects
for update to authenticated
using (bucket_id = 'daliza-media' and public.is_admin())
with check (bucket_id = 'daliza-media' and public.is_admin());

create policy "daliza_media_admin_delete" on storage.objects
for delete to authenticated
using (bucket_id = 'daliza-media' and public.is_admin());
