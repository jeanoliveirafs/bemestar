// Teste simples para verificar conexão com Supabase
import { supabase } from './lib/supabase.js';

// Função para testar a conexão
async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com Supabase...');
  
  try {
    // Testar se o cliente foi criado corretamente
    console.log('✅ Cliente Supabase criado:', !!supabase);
    
    // Testar sessão atual
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log('📋 Sessão atual:', sessionData, sessionError);
    
    // Testar usuário atual
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('👤 Usuário atual:', userData, userError);
    
    // Testar login com credenciais de teste
    console.log('🔐 Testando login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'teste@teste.com',
      password: '123456'
    });
    console.log('🔑 Resultado do login:', loginData, loginError);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste quando a página carregar
if (typeof window !== 'undefined') {
  window.testSupabase = testSupabaseConnection;
  console.log('🚀 Teste disponível: execute window.testSupabase() no console');
}

export { testSupabaseConnection };