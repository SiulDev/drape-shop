-- Ejecuta esto en Supabase Dashboard -> SQL Editor -> New query -> Run

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  price_usd numeric(10,2) not null check (price_usd >= 0),
  in_stock boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: el catálogo público SOLO puede leer. Insertar/editar/borrar
-- únicamente lo hace el service_role key desde las API routes del
-- servidor (ese cliente bypassa RLS por diseño, ver src/lib/supabase-admin.ts).
alter table products enable row level security;

create policy "Cualquiera puede leer el catálogo"
  on products for select
  using (true);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_set_updated_at
  before update on products
  for each row
  execute function set_updated_at();

-- Bucket de Storage para las imágenes (también se puede crear desde
-- el Dashboard -> Storage -> New bucket -> "products" -> Public)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

create policy "Lectura pública de imágenes de productos"
  on storage.objects for select
  using (bucket_id = 'products');
