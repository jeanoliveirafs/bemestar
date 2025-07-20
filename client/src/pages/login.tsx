import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';


export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp, loading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não coincidem",
            variant: "destructive",
          });
          return;
        }
        
        const { data, error } = await signUp(email, password, name);
        
        if (error) {
          toast({
            title: "Erro no registro",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Bem-vindo ao Refúgio!",
          description: "Sua conta foi criada com sucesso",
        });
      } else {
        const { data, error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Bem-vindo de volta!",
          description: "Login realizado com sucesso",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função removida - tema fixo

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Peaceful mountain landscape at sunrise" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-slate-900/70 dark:to-slate-800/70"></div>
      </div>
      
      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <i className="fas fa-heart text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {isRegister ? 'Bem-vindo ao Refúgio' : 'Refúgio Digital'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {isRegister ? 'Vamos iniciar sua jornada de bem-estar' : 'Seu espaço seguro para bem-estar mental'}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Respirar, sentir, crescer ✨</p>
        </div>
        
        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-2xl border-slate-200 dark:border-slate-700">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Seu nome"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-slate-400 hover:text-slate-600 dark:hover:text-slate-300`}></i>
                  </button>
                </div>
              </div>
              
              {isRegister && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="••••••••"
                  />
                </div>
              )}
              
              {!isRegister && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="ml-2 text-sm">Lembrar-me</Label>
                  </div>
                  <div className="text-sm">
                    <button type="button" className="font-medium text-primary hover:text-primary/80">
                      Esqueci minha senha
                    </button>
                  </div>
                </div>
              )}
              
              {isRegister && (
                <div className="flex items-start">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="ml-2 text-sm">
                    Aceito os <button type="button" className="text-primary hover:text-primary/80">termos de uso</button> e confirmo que este app não substitui acompanhamento profissional
                  </Label>
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || loading}
              >
                {(isSubmitting || loading) ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className={`fas ${isRegister ? 'fa-user-plus' : 'fa-sign-in-alt'} mr-2`}></i>
                )}
                {isRegister ? 'Criar minha conta' : 'Entrar no Refúgio'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isRegister ? 'Já tem uma conta?' : 'Primeira vez aqui?'}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="ml-1 font-medium text-primary hover:text-primary/80"
                >
                  {isRegister ? 'Fazer login' : 'Criar conta gratuita'}
                </button>
              </p>
            </div>
            
            {!isRegister && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-slate-700 border border-blue-200 dark:border-slate-600 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-blue-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Projeto em desenvolvimento:</strong> Para testar crie uma conta e depois faça o login.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {isRegister && (
              <div className="mt-6 p-4 bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-heart text-amber-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Importante:</strong> Esta plataforma não substitui acompanhamento profissional. Busque sempre ajuda qualificada.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Botão de alternância de tema removido */}
        
        
      </div>
    </div>
  );
}
