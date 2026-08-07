import { createClient } from "@supabase/supabase-js";

// Cliente PÚBLICO: usa la anon key, respeta RLS (solo puede leer, según
// la policy de supabase/schema.sql). Seguro de usar en cualquier página.
export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);
