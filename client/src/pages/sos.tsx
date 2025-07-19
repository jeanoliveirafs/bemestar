import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BreathingCircle } from '@/components/ui/breathing-circle';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function SOS() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleBreathingComplete = () => {
    toast({
      title: "Parabéns! 🌟",
      description: "Você completou o exercício de respiração. Como se sente?",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Crisis Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-destructive/20 to-red-600/20 border-2 border-destructive/30 rounded-full flex items-center justify-center">
          <i className="fas fa-heart text-destructive text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Você não está sozinho(a)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Estamos aqui para ajudar. Respire fundo.
        </p>
      </div>

      {/* Immediate Help */}
      <Card className="mb-8 border-destructive/30 bg-gradient-to-br from-destructive/5 to-red-50 dark:from-destructive/10 dark:to-red-900/10">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <i className="fas fa-phone text-destructive mr-3"></i>
            Ajuda Imediata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:188"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all border border-destructive/20"
            >
              <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-phone text-white"></i>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">CVV - 188</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Centro de Valorização da Vida
                </p>
                <p className="text-xs text-destructive">24h • Ligação gratuita</p>
              </div>
            </a>
            
            <a
              href="tel:192"
              className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all border border-destructive/20"
            >
              <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-ambulance text-white"></i>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">SAMU - 192</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Emergência médica
                </p>
                <p className="text-xs text-destructive">Atendimento de urgência</p>
              </div>
            </a>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              Ligações confidenciais e gratuitas disponíveis 24 horas por dia
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Breathing Exercise */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
            Exercício de Respiração de Emergência
          </h3>
          <BreathingCircle onComplete={handleBreathingComplete} />
        </CardContent>
      </Card>

      {/* Calming Messages */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Lembre-se
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-slate-900 dark:text-white flex items-center">
                <i className="fas fa-heart text-primary mr-3"></i>
                Seus sentimentos são válidos e temporários
              </p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-xl">
              <p className="text-slate-900 dark:text-white flex items-center">
                <i className="fas fa-seedling text-secondary mr-3"></i>
                Você é mais forte do que imagina
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-xl">
              <p className="text-slate-900 dark:text-white flex items-center">
                <i className="fas fa-hands-helping text-accent mr-3"></i>
                Buscar ajuda é um ato de coragem
              </p>
            </div>
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-slate-900 dark:text-white flex items-center">
                <i className="fas fa-star text-yellow-500 mr-3"></i>
                Você é importante e merece cuidado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/mindfulness')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-leaf text-secondary text-2xl"></i>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Mindfulness</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Exercícios de respiração e meditação para encontrar calma
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/chat')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-accent text-2xl"></i>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Desabafar</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Espaço seguro para expressar seus sentimentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Professional Help */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Ajuda Profissional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-hospital text-primary"></i>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white">CAPS Mais Próximo</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Centro de Atenção Psicossocial com atendimento gratuito pelo SUS
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/resources')}>
                Encontrar CAPS →
              </Button>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-user-md text-secondary"></i>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white">Terapia Acessível</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Psicólogos com preços sociais e atendimento humanizado
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate('/resources')}>
                Ver recursos →
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              <i className="fas fa-info-circle mr-2"></i>
              <strong>Importante:</strong> Este aplicativo oferece apoio emocional, mas não substitui 
              acompanhamento psicológico ou psiquiátrico profissional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
