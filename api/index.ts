import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Criar uma instância do Express para as rotas da API
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registrar as rotas da API
registerRoutes(app);

// Função handler para Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Converter VercelRequest para Express Request
  const expressReq = req as any;
  const expressRes = res as any;
  
  // Configurar método e URL para Express
  expressReq.method = req.method;
  expressReq.url = req.url;
  expressReq.path = req.url?.split('?')[0] || '/';
  
  // Executar o middleware do Express
  app(expressReq, expressRes);
}