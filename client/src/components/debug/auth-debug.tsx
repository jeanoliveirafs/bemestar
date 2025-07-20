import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

/**
 * Componente de debug para testar autenticação do Supabase
 * Útil para diagnosticar problemas de login após mudanças na configuração
 */
export function AuthDebug() {
  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('123456');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Testa a conexão básica com o Supabase
   */
  const testConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      setResult({
        type: 'connection',
        data,
        error,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setResult({
        type: 'connection',
        error: error,
        timestamp: new Date().toISOString()
      });
    }
    setLoading(false);
  };

  /**
   * Testa o login com as credenciais fornecidas
   */
  const testLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      setResult({
        type: 'login',
        data,
        error,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setResult({
        type: 'login',
        error: error,
        timestamp: new Date().toISOString()
      });
    }
    setLoading(false);
  };

  /**
   * Testa o registro com as credenciais fornecidas
   */
  const testSignUp = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined
        }
      });
      setResult({
        type: 'signup',
        data,
        error,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setResult({
        type: 'signup',
        error: error,
        timestamp: new Date().toISOString()
      });
    }
    setLoading(false);
  };

  /**
   * Limpa os resultados do teste
   */
  const clearResults = () => {
    setResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🔧 Debug de Autenticação Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teste@teste.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            variant="outline"
          >
            🔍 Testar Conexão
          </Button>
          <Button 
            onClick={testLogin} 
            disabled={loading}
          >
            🔐 Testar Login
          </Button>
          <Button 
            onClick={testSignUp} 
            disabled={loading}
            variant="secondary"
          >
            📝 Testar Registro
          </Button>
          <Button 
            onClick={clearResults} 
            disabled={loading}
            variant="destructive"
          >
            🗑️ Limpar
          </Button>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Testando...</p>
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              📊 Resultado do Teste ({result.type}):
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}