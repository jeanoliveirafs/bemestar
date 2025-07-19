import { 
  users, 
  userProfiles,
  type User, 
  type InsertUser,
  type UpdateUser,
  type UserProfile,
  type InsertUserProfile,
  type UpdateUserProfile,
  type UserWithProfile
} from "@shared/schema";
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { users, userProfiles } from '../shared/schema';

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://yeizisgimwwwvestmhnj.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaXppc2dpbXd3d3Zlc3RtaG5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mjk2MTExNSwiZXhwIjoyMDY4NTM3MTE1fQ.yQm2MMnpI0e2VBeg0Cbwhjml_OvBmMa0ouH0c-7ceDk';

// Cliente Supabase para operações administrativas
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configuração do banco de dados com Drizzle
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:[YOUR-PASSWORD]@db.yeizisgimwwwvestmhnj.supabase.co:5432/postgres';
const client = postgres(databaseUrl);
export const db = drizzle(client);

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
   * Hash da senha usando bcrypt
   * @param password - Senha em texto plano
   * @returns Promise com a senha hasheada
   */
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verifica se a senha fornecida corresponde ao hash armazenado
   * @param password - Senha em texto plano
   * @param hashedPassword - Hash armazenado no banco
   * @returns Promise<boolean> indicando se a senha está correta
   */
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Busca usuário por ID
   * @param id - ID do usuário
   * @returns Promise com o usuário ou undefined se não encontrado
   */
  async getUserById(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return result[0];
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
      const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      return undefined;
    }
  }

  /**
   * Cria um novo usuário com senha hasheada
   * @param insertUser - Dados do usuário para inserção
   * @returns Promise com o usuário criado
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Hash da senha antes de salvar
      const hashedPassword = await this.hashPassword(insertUser.password);
      
      const result = await db.insert(users).values({
        ...insertUser,
        password: hashedPassword
      }).returning();
      
      return result[0];
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
      // Se a senha está sendo atualizada, fazer hash
      const dataToUpdate = { ...updateData };
      if (dataToUpdate.password) {
        dataToUpdate.password = await this.hashPassword(dataToUpdate.password);
      }
      
      const result = await db.update(users)
        .set({ ...dataToUpdate, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();
      
      return result[0];
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
      const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
      return result[0];
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
      const result = await db.insert(userProfiles).values(insertProfile).returning();
      return result[0];
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
      const result = await db.update(userProfiles)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(userProfiles.userId, userId))
        .returning();
      
      return result[0];
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
      const result = await db
        .select({
          user: users,
          profile: userProfiles
        })
        .from(users)
        .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
        .where(eq(users.id, userId))
        .limit(1);
      
      if (result.length === 0) {
        return undefined;
      }
      
      const { user, profile } = result[0];
      return { user, profile };
    } catch (error) {
      console.error('Erro ao buscar usuário com perfil:', error);
      return undefined;
    }
  }

  /**
   * Método para autenticação de usuário
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns Promise com o usuário autenticado ou null se credenciais inválidas
   */
  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        return null;
      }
      
      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return null;
    }
  }
}

export const storage = new SupabaseStorage();
