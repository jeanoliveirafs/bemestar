import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase - usando variáveis de ambiente ou valores padrão
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yeizisgimwwwvestmhnj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaXppc2dpbXd3d3Zlc3RtaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NjExMTUsImV4cCI6MjA2ODUzNzExNX0.GexbZxkm0BqPUlZ9cgH5j-hvzbgF-kx9mr3aiDTqVvA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  // Usando autenticação real do Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUp = async (email: string, password: string, name?: string) => {
  // Usando autenticação real do Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name
      },
      emailRedirectTo: undefined // Skip email confirmation for development
    }
  })
  return { data, error }
}

export const signOut = async () => {
  // Usando logout real do Supabase
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  // Usando função real do Supabase
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getSession = async () => {
  // Usando função real do Supabase
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Database helper functions
export const insertMoodEntry = async (userId: string, mood: number, note?: string) => {
  const { data, error } = await supabase
    .from('mood_entries')
    .insert([
      { user_id: userId, mood, note, date: new Date().toISOString().split('T')[0] }
    ])
    .select()
  return { data, error }
}

export const getMoodEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const insertHabit = async (userId: string, name: string, date: string) => {
  const { data, error } = await supabase
    .from('habits')
    .insert([
      { user_id: userId, name, date, completed: false }
    ])
    .select()
  return { data, error }
}

export const getHabits = async (userId: string, date: string) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
  return { data, error }
}

export const updateHabit = async (habitId: string, completed: boolean) => {
  const { data, error } = await supabase
    .from('habits')
    .update({ completed })
    .eq('id', habitId)
    .select()
  return { data, error }
}

// Gratitude helper functions
export const insertGratitudeEntry = async (userId: string, entries: string[], date: string) => {
  const { data, error } = await supabase
    .from('gratitude_entries')
    .insert([{ user_id: userId, entries, date }])
    .select()
  return { data, error }
}

export const getGratitudeEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from('gratitude_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}