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

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private userProfiles: Map<number, UserProfile> = new Map();
  
  private currentUserId = 1;
  private currentProfileId = 1;

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create a sample user
    const sampleUser: User = {
      id: 1,
      email: "maria@example.com",
      name: "Maria Silva",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(1, sampleUser);
    this.currentUserId = 2;

    // Create a sample user profile
    const sampleProfile: UserProfile = {
      id: 1,
      userId: 1,
      phone: "+55 11 99999-9999",
      birthDate: "1990-05-15",
      avatar: null,
      bio: "Desenvolvedora apaixonada por tecnologia e bem-estar.",
      preferences: {
        theme: "light",
        notifications: true,
        language: "pt-BR"
      },
      metadata: {
        lastLogin: new Date().toISOString(),
        loginCount: 42
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.userProfiles.set(1, sampleProfile);
    this.currentProfileId = 2;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser: User = {
        ...user,
        ...updateData,
        updatedAt: new Date(),
      };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(profile => profile.userId === userId);
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentProfileId++;
    const now = new Date();
    const profile: UserProfile = {
      ...insertProfile,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(userId: number, updateData: UpdateUserProfile): Promise<UserProfile | undefined> {
    const profile = Array.from(this.userProfiles.values()).find(p => p.userId === userId);
    if (profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        ...updateData,
        updatedAt: new Date(),
      };
      this.userProfiles.set(profile.id, updatedProfile);
      return updatedProfile;
    }
    return undefined;
  }

  async getUserWithProfile(userId: number): Promise<UserWithProfile | undefined> {
    const user = await this.getUserById(userId);
    if (!user) {
      return undefined;
    }
    
    const profile = await this.getUserProfile(userId);
    
    return {
      ...user,
      profile
    };
  }
}

export const storage = new MemStorage();
