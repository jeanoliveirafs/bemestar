import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, signIn, signUp, signOut } from '@/lib/supabaseClient';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkUser = async () => {
      try {
        // Verificar se existe um usuário mock no localStorage
        const mockUserStr = localStorage.getItem('mockUser');
        if (mockUserStr) {
          const mockUser = JSON.parse(mockUserStr);
          const user = {
            id: mockUser.id,
            email: mockUser.email || '',
            name: mockUser.user_metadata?.name || mockUser.email?.split('@')[0] || 'Usuário'
          };
          setUser(user);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listener para mudanças no localStorage (para simular eventos de autenticação)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'mockUser') {
        if (event.newValue) {
          const mockUser = JSON.parse(event.newValue);
          setUser({
            id: mockUser.id,
            email: mockUser.email || '',
            name: mockUser.user_metadata?.name || mockUser.email?.split('@')[0] || 'Usuário'
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário'
        };
        setUser(user);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signUp(email, password, name);
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Fazer logout no Supabase
      const { error } = await signOut();
      if (error) {
        console.error('Erro ao fazer logout do Supabase:', error);
      }
      setUser(null);
    } catch (error: any) {
      console.error('Erro durante o logout:', error);
      // Ainda limpa o usuário mesmo se o logout do Supabase falhar
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
