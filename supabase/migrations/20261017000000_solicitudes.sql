-- ────────────────────────────────────────────────────────────────────────────
-- Solicitudes de clientes: PQRS, cotizaciones e información de cursos.
-- Las tres llegan desde formularios del sitio y se gestionan en /admin/solicitudes.
--   · Cualquier visitante puede CREAR una solicitud (solo en estado "nuevo").
--   · Solo los administradores (is_admin()) pueden VERLAS, ACTUALIZARLAS o BORRARLAS.
-- ────────────────────────────────────────────────────────────────────────────

create table if not exists public.solicitudes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- De qué formulario vino
  tipo text not null check (tipo in ('pqrs', 'cotizacion', 'curso')),

  -- Datos del cliente
  nombre text not null check (char_length(nombre) between 2 and 120),
  telefono text not null check (char_length(telefono) between 7 and 30),
  email text check (email is null or char_length(email) <= 160),
  sede_slug text check (sede_slug is null or char_length(sede_slug) <= 80),
  mensaje text check (mensaje is null or char_length(mensaje) <= 3000),

  -- Campos propios de cada formulario (tipo de PQRS, fecha del evento, curso, etc.)
  detalles jsonb not null default '{}'::jsonb,

  -- Página desde la que se envió y autorización de tratamiento de datos (Ley 1581 de 2012)
  pagina text check (pagina is null or char_length(pagina) <= 300),
  acepta_datos boolean not null default false check (acepta_datos),

  -- Seguimiento comercial (solo lo edita el admin)
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'en_proceso', 'por_recontactar', 'cerrado', 'descartado')),
  proximo_contacto date,
  notas text
);

create index if not exists solicitudes_created_idx on public.solicitudes (created_at desc);
create index if not exists solicitudes_tipo_idx on public.solicitudes (tipo);
create index if not exists solicitudes_estado_idx on public.solicitudes (estado);
create index if not exists solicitudes_proximo_idx on public.solicitudes (proximo_contacto);

drop trigger if exists set_updated_at on public.solicitudes;
create trigger set_updated_at before update on public.solicitudes
for each row execute function public.set_updated_at();

alter table public.solicitudes enable row level security;

-- El sitio público solo puede crear solicitudes nuevas, sin tocar los campos de seguimiento
drop policy if exists "solicitudes_insert_public" on public.solicitudes;
create policy "solicitudes_insert_public" on public.solicitudes
for insert to anon, authenticated
with check (
  estado = 'nuevo'
  and notas is null
  and proximo_contacto is null
  and acepta_datos
);

drop policy if exists "solicitudes_select_admin" on public.solicitudes;
create policy "solicitudes_select_admin" on public.solicitudes
for select to authenticated
using (public.is_admin());

drop policy if exists "solicitudes_update_admin" on public.solicitudes;
create policy "solicitudes_update_admin" on public.solicitudes
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "solicitudes_delete_admin" on public.solicitudes;
create policy "solicitudes_delete_admin" on public.solicitudes
for delete to authenticated
using (public.is_admin());
