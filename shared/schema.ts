import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tabela principal de usuários
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela para armazenar informações adicionais dos usuários
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  phone: text("phone"),
  birthDate: text("birth_date"), // ISO date string
  avatar: text("avatar"), // URL da imagem
  bio: text("bio"),
  preferences: json("preferences"), // JSON para configurações personalizadas
  metadata: json("metadata"), // JSON para dados adicionais flexíveis
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas de validação para inserção
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema para atualização de usuário (todos os campos opcionais exceto id)
export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Schema para atualização de perfil de usuário
export const updateUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Tipos TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;

// Tipo combinado para usuário completo com perfil
export type UserWithProfile = User & {
  profile?: UserProfile;
};
