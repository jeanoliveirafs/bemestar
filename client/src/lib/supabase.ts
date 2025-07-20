import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase - usando variáveis de ambiente ou valores padrão
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yeizisgimwwwvestmhnj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaXppc2dpbXd3d3Zlc3RtaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NjExMTUsImV4cCI6MjA2ODUzNzExNX0.GexbZxkm0BqPUlZ9cgH5j-hvzbgF-kx9mr3aiDTqVvA'

/**
 * Cliente Supabase configurado para autenticação e operações de banco de dados
 * Configurado para funcionar sem confirmação de email
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Configurações para funcionar sem confirmação de email
    flowType: 'pkce'
  }
})