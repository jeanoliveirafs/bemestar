import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserProfileSchema, 
  updateUserSchema, 
  updateUserProfileSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Mock authentication - accept any email/password
      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
      }

      // Check if user exists, if not create one
      let user = await storage.getUserByEmail(email);
      if (!user) {
        const name = email.split('@')[0];
        user = await storage.createUser({ email, name, password });
      }

      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      const user = await storage.createUser(userData);
      res.json({ 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // User management routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      res.json({ 
        id: user.id, 
        email: user.email, 
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updateData = updateUserSchema.parse(req.body);
      
      const user = await storage.updateUser(userId, updateData);
      
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      res.json({ 
        id: user.id, 
        email: user.email, 
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  });

  // User profile routes
  app.get("/api/users/:id/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar perfil do usuário" });
    }
  });

  app.post("/api/users/:id/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const profileData = insertUserProfileSchema.parse({ ...req.body, userId });
      
      const profile = await storage.createUserProfile(profileData);
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao criar perfil do usuário" });
    }
  });

  app.put("/api/users/:id/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updateData = updateUserProfileSchema.parse(req.body);
      
      const profile = await storage.updateUserProfile(userId, updateData);
      
      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }
      
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Erro ao atualizar perfil do usuário" });
    }
  });

  // Get user with profile
  app.get("/api/users/:id/complete", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const userWithProfile = await storage.getUserWithProfile(userId);
      
      if (!userWithProfile) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      
      res.json(userWithProfile);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar dados completos do usuário" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
