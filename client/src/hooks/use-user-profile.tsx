import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './use-auth';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  avatar?: string;
  bio?: string;
  preferences?: any;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // Perfil não encontrado, criar um novo
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: user.id,
              name: user.name || user.email?.split('@')[0] || 'Usuário',
              email: user.email
            })
            .select()
            .single();

          if (createError) {
            throw createError;
          }

          setProfile(newProfile);
        } else {
          throw fetchError;
        }
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      console.error('Erro ao buscar perfil:', err);
      setError(err.message || 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id || !profile) {
      return { success: false, error: 'Usuário não autenticado ou perfil não carregado' };
    }

    try {
      const { data, error: updateError } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setProfile(data);
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao atualizar perfil:', err);
      return { success: false, error: err.message || 'Erro ao atualizar perfil' };
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile
  };
}