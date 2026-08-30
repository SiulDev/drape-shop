import { createClient } from "@supabase/supabase-js";
//#region src/lib/supabase.ts
var supabase = createClient("https://xxhsiqwvbyxahzaompyk.supabase.co", "sb_publishable_qZYDPoeiVm8w0PUj-Q2H8A_qLvwvXMe");
//#endregion
export { supabase as t };
