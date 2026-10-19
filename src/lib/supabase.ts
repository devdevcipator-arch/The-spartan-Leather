import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpditkpshterzmqkqpwj.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGl0a3BzaHRlcnptcWtxcHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3OTkyMDksImV4cCI6MjEwNzM3NTIwOX0.T_2RjAFYUF9ygq_sVu07QbpVHWSvKLoopTtPbNyxpMU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

