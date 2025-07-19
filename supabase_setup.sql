-- Script SQL para configurar o banco de dados no Supabase
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    birth_date DATE,
    avatar TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security) para segurança
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política para usuários: podem ver e editar apenas seus próprios dados
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Política para perfis: podem ver e editar apenas seus próprios perfis
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own profile" ON user_profiles
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Inserir dados de exemplo (opcional)
INSERT INTO users (email, name, password) VALUES 
('admin@refugiodigital.com', 'Administrador', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.O')
ON CONFLICT (email) DO NOTHING;

-- Inserir perfil de exemplo para o usuário admin
INSERT INTO user_profiles (user_id, phone, bio, preferences, metadata) 
SELECT 
    u.id,
    '+55 11 99999-9999',
    'Administrador do sistema Refúgio Digital',
    '{"theme": "light", "notifications": true, "language": "pt-BR"}',
    '{"lastLogin": "2024-01-01T00:00:00Z", "loginCount": 1}'
FROM users u 
WHERE u.email = 'admin@refugiodigital.com'
ON CONFLICT (user_id) DO NOTHING;

-- Comentários para documentação
COMMENT ON TABLE users IS 'Tabela de usuários do sistema';
COMMENT ON TABLE user_profiles IS 'Perfis detalhados dos usuários';
COMMENT ON COLUMN users.password IS 'Senha hasheada com bcrypt';
COMMENT ON COLUMN user_profiles.preferences IS 'Preferências do usuário em formato JSON';
COMMENT ON COLUMN user_profiles.metadata IS 'Metadados adicionais em formato JSON';

-- Verificar se as tabelas foram criadas corretamente
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('users', 'user_profiles')
ORDER BY table_name, ordinal_position;