import { useEffect, useState } from 'react'

// Tipo do usuário baseado no schema do backend
interface User {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

interface AuthError {
  message: string
  errors?: Array<{ field: string; message: string }>
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { data: null, error: data as AuthError }
      }

      const userData = data.user
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { data: { user: userData }, error: null }
    } catch (error) {
      console.error('Erro no login:', error)
      return { 
        data: null, 
        error: { message: 'Erro de conexão. Tente novamente.' } as AuthError 
      }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { data: null, error: data as AuthError }
      }

      const userData = data.user
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { data: { user: userData }, error: null }
    } catch (error) {
      console.error('Erro no registro:', error)
      return { 
        data: null, 
        error: { message: 'Erro de conexão. Tente novamente.' } as AuthError 
      }
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('user')
    return { error: null }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}