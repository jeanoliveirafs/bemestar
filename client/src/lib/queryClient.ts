import { QueryClient, QueryFunction } from "@tanstack/react-query";
import * as supabaseClient from './supabaseClient';

// Interface para mapear endpoints da API para funções do Supabase
interface EndpointMapping {
  [key: string]: {
    get?: (id?: string, subResource?: string) => Promise<any>;
    post?: (data: any) => Promise<any>;
    put?: (id: string, data: any) => Promise<any>;
  };
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Mapeamento de endpoints da API para funções do Supabase
const endpointMappings: EndpointMapping = {
  '/api/mood': {
    get: (userId) => supabaseClient.getMoodEntries(userId as string),
    post: (data) => supabaseClient.insertMoodEntry(data.userId, data.mood, data.note)
  },
  '/api/habits': {
    get: (userId, date) => supabaseClient.getHabits(userId as string, date as string),
    post: (data) => supabaseClient.insertHabit(data.userId, data.name, data.date),
    put: (id, data) => supabaseClient.updateHabit(id, data.completed)
  },
  '/api/gratitude': {
    get: (userId) => supabaseClient.getGratitudeEntries(userId as string),
    post: (data) => supabaseClient.insertGratitudeEntry(data.userId, data.entries, data.date)
  }
};

// Função para determinar se devemos usar o Supabase ou a API REST
const shouldUseSupabase = () => {
  // Você pode adicionar uma flag para controlar isso durante a migração
  return true;
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  // Se devemos usar o Supabase e o endpoint está mapeado
  if (shouldUseSupabase()) {
    const urlParts = url.split('/');
    const baseEndpoint = urlParts.slice(0, 3).join('/');
    const id = urlParts[3];
    const subResource = urlParts[4];
    
    const mapping = endpointMappings[baseEndpoint];
    
    if (mapping) {
      switch (method) {
        case 'GET':
          if (mapping.get) {
            return mapping.get(id, subResource);
          }
          break;
        case 'POST':
          if (mapping.post) {
            return mapping.post(data);
          }
          break;
        case 'PUT':
          if (mapping.put) {
            return mapping.put(id, data);
          }
          break;
      }
    }
  }
  
  // Fallback para a API REST se não pudermos usar o Supabase
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Se devemos usar o Supabase e o endpoint está mapeado
    if (shouldUseSupabase()) {
      const endpoint = queryKey[0] as string;
      const urlParts = endpoint.split('/');
      const baseEndpoint = urlParts.slice(0, 3).join('/');
      const id = urlParts[3];
      const subResource = urlParts[4];
      
      const mapping = endpointMappings[baseEndpoint];
      
      if (mapping && mapping.get) {
        try {
          const { data, error } = await mapping.get(id, subResource);
          if (error) throw new Error(error.message);
          return data;
        } catch (error) {
          console.error('Erro ao buscar dados do Supabase:', error);
          throw error;
        }
      }
    }
    
    // Fallback para a API REST
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
