import { createClient } from "@supabase/supabase-js";

// Cliente ADMIN: usa la service_role key, IGNORA RLS por completo.
// Importar SOLO desde src/pages/api/** o src/pages/admin/** (código que
// corre en el servidor). Si esto se importa en algo que se hidrata en el
// navegador, la key quedaría expuesta -- nunca hacer eso.
export const supabaseAdmin = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
