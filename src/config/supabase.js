import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cliente público (seguro con RLS habilitado)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
