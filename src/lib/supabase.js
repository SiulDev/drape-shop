import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL ?? import.meta.env.SUPABASE_URL;
const key =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.SUPABASE_KEY;

export const getSupabaseClient = () => {
  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
};
