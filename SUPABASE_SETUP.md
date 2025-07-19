# Configuração do Supabase - Refúgio Digital

## 📋 Informações de Conexão

### Credenciais do Supabase
- **URL do Projeto**: `https://yeizisgimwwwvestmhnj.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaXppc2dpbXd3d3Zlc3RtaG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NjExMTUsImV4cCI6MjA2ODUzNzExNX0.GexbZxkm0BqPUlZ9cgH5j-hvzbgF-kx9mr3aiDTqVvA`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaXppc2dpbXd3d3Zlc3RtaG5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mjk2MTExNSwiZXhwIjoyMDY4NTM3MTE1fQ.yQm2MMnpI0e2VBeg0Cbwhjml_OvBmMa0ouH0c-7ceDk`

## 🔧 Configuração Local

### 1. Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

### 2. Configurar Senha do Banco
No arquivo `.env`, substitua `[YOUR-PASSWORD]` pela senha do seu banco PostgreSQL do Supabase:

```env
DATABASE_URL=postgresql://postgres:SUA_SENHA_AQUI@db.yeizisgimwwwvestmhnj.supabase.co:5432/postgres
```

### 3. Verificar Configurações
As seguintes variáveis já estão configuradas no `.env`:

**Backend (Node.js/Express):**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Frontend (Vite/React):**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🗄️ Schema do Banco de Dados

O projeto usa Drizzle ORM com PostgreSQL. O schema está definido em `shared/schema.ts`.

### Executar Migrações
```bash
npm run db:push
```

## 🚀 Deploy no Vercel

### Variáveis de Ambiente no Vercel
Configure as seguintes variáveis no painel do Vercel:

1. `DATABASE_URL` - URL completa do PostgreSQL
2. `SUPABASE_URL` - URL do projeto Supabase
3. `SUPABASE_ANON_KEY` - Chave anônima
4. `SUPABASE_SERVICE_ROLE_KEY` - Chave de service role
5. `VITE_SUPABASE_URL` - URL para o frontend
6. `VITE_SUPABASE_ANON_KEY` - Chave anônima para o frontend
7. `SESSION_SECRET` - Segredo para sessões

## 📝 Notas Importantes

- ✅ Cliente Supabase configurado em `client/src/lib/supabaseClient.ts`
- ✅ Configuração híbrida (frontend + backend)
- ✅ Variáveis de ambiente separadas para Vite
- ✅ Fallback para valores padrão no código
- ⚠️ **Lembre-se de configurar a senha do banco no `.env`**

## 🔐 Segurança

- O arquivo `.env` está no `.gitignore` (não será commitado)
- Use `.env.example` como referência
- No Vercel, configure as variáveis no painel de configurações