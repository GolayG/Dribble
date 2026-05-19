import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Server-only client — uses the service role key so it bypasses RLS.
// Only import this in Server Components, Route Handlers, and Server Actions.
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
