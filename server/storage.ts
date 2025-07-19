import { 
  type User, 
  type InsertUser,
  type UpdateUser,
  type UserProfile,
  type InsertUserProfile,
  type UpdateUserProfile,
  type UserWithProfile
} from "@shared/schema";
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

// Cliente Supabase para operações administrativas
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export interface IStorage {
  // User methods
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updateData: UpdateUser): Promise<User | undefined>;
  
  // User profile methods
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, updateData: UpdateUserProfile): Promise<UserProfile | undefined>;
  
  // Combined methods
  getUserWithProfile(userId: number): Promise<UserWithProfile | undefined>;
}

/**
 * Implementação do storage usando Supabase e Drizzle ORM
 * Fornece operações CRUD para usuários e perfis com hash de senhas
 */
export class SupabaseStorage implements IStorage {

  /**
   * Busca usuário por ID
   * @param id - ID do usuário
   * @returns Promise com o usuário ou undefined se não encontrado
   */
  async getUserById(id: number): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      return undefined;
    }
  }

  /**
   * Busca usuário por email
   * @param email - Email do usuário
   * @returns Promise com o usuário ou undefined se não encontrado
   */
  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error('Erro ao buscar usuário por email:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return undefined;
    }
  }

  /**
   * Cria um novo usuário usando Supabase Auth
   * @param insertUser - Dados do usuário para inserção
   * @returns Promise com o usuário criado
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: insertUser.email,
        password: insertUser.password,
        user_metadata: {
          name: insertUser.name
        }
      });
      
      if (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Falha ao criar usuário');
      }
      
      // Inserir dados adicionais na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: insertUser.email,
          name: insertUser.name,
          password: '', // Senha gerenciada pelo Supabase Auth
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (userError) {
        console.error('Erro ao inserir dados do usuário:', userError);
        throw new Error('Falha ao criar dados do usuário');
      }
      
      return userData;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Falha ao criar usuário');
    }
  }

  /**
   * Atualiza dados do usuário
   * @param id - ID do usuário
   * @param updateData - Dados para atualização
   * @returns Promise com o usuário atualizado ou undefined se não encontrado
   */
  async updateUser(id: number, updateData: UpdateUser): Promise<User | undefined> {
    try {
      // Se a senha está sendo atualizada, usar Supabase Auth
      if (updateData.password) {
        const { error: authError } = await supabase.auth.admin.updateUserById(
          id.toString(),
          { password: updateData.password }
        );
        
        if (authError) {
          console.error('Erro ao atualizar senha:', authError);
          return undefined;
        }
      }
      
      // Atualizar outros dados na tabela users
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updateData,
          password: undefined, // Não atualizar senha na tabela
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return undefined;
    }
  }

  /**
   * Busca perfil do usuário por ID do usuário
   * @param userId - ID do usuário
   * @returns Promise com o perfil ou undefined se não encontrado
   */
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      return undefined;
    }
  }

  /**
   * Cria um novo perfil de usuário
   * @param insertProfile - Dados do perfil para inserção
   * @returns Promise com o perfil criado
   */
  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          ...insertProfile,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao criar perfil do usuário:', error);
        throw new Error('Falha ao criar perfil do usuário');
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao criar perfil do usuário:', error);
      throw new Error('Falha ao criar perfil do usuário');
    }
  }

  /**
   * Atualiza perfil do usuário
   * @param userId - ID do usuário
   * @param updateData - Dados para atualização
   * @returns Promise com o perfil atualizado ou undefined se não encontrado
   */
  async updateUserProfile(userId: number, updateData: UpdateUserProfile): Promise<UserProfile | undefined> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao atualizar perfil do usuário:', error);
        return undefined;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      return undefined;
    }
  }

  /**
   * Busca usuário com seu perfil completo usando JOIN
   * @param userId - ID do usuário
   * @returns Promise com usuário e perfil ou undefined se usuário não encontrado
   */
  async getUserWithProfile(userId: number): Promise<{ user: User; profile: UserProfile | null } | undefined> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_profiles (*)
        `)
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Erro ao buscar usuário com perfil:', error);
        return undefined;
      }
      
      const { user_profiles, ...user } = data;
      return {
        user,
        profile: user_profiles?.[0] || null
      };
    } catch (error) {
      console.error('Erro ao buscar usuário com perfil:', error);
      return undefined;
    }
  }

  /**
   * Método para autenticação de usuário usando Supabase Auth
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns Promise com o usuário autenticado ou null se credenciais inválidas
   */
  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error || !data.user) {
        console.error('Erro na autenticação:', error);
        return null;
      }
      
      // Buscar dados do usuário na tabela users
      const user = await this.getUserByEmail(email);
      return user || null;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return null;
    }
  }
}

export const storage = new SupabaseStorage();
