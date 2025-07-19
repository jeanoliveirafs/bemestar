import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodSelector } from '@/components/ui/mood-selector';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { getTodayDate, getGreeting, getMoodEmoji } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const today = getTodayDate();

  const { data: moodEntries = [] } = useQuery({
    queryKey: ['/api/mood', user?.id],
    enabled: !!user?.id,
  });

  const { data: todayHabits = [] } = useQuery({
    queryKey: ['/api/habits', user?.id, today],
    enabled: !!user?.id,
  });

  const completedHabitsCount = todayHabits.filter((habit: any) => habit.completed).length;
  const totalHabits = todayHabits.length;
  const habitPercentage = totalHabits > 0 ? Math.round((completedHabitsCount / totalHabits) * 100) : 0;

  const recentMoodEntries = moodEntries.slice(0, 3);
  const consecutiveDays = Math.min(moodEntries.length, 7); // Simplified calculation

  const handleQuickMood = async (mood: number) => {
    if (!user?.id) return;
    
    try {
      await apiRequest('POST', '/api/mood', {
        userId: user.id,
        mood,
        date: today,
        note: 'Registro rápido'
      });
      navigate('/mood');
    } catch (error) {
      console.error('Error recording mood:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {getGreeting()}, {user?.name || 'Usuário'}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Como você está se sentindo hoje?</p>
      </div>

      {/* Quick Mood Check */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
            Registro Rápido de Humor
          </h2>
          <div className="mb-6">
            <MoodSelector onMoodSelect={handleQuickMood} />
          </div>
          <div className="text-center">
            <Button onClick={() => navigate('/mood')} variant="outline">
              Ver histórico completo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i className="fas fa-calendar-check text-white"></i>
              </div>
              <span className="text-2xl font-bold text-primary">{consecutiveDays}</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Dias Consecutivos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Registrando humor</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <i className="fas fa-leaf text-white"></i>
              </div>
              <span className="text-2xl font-bold text-secondary">12</span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Sessões</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Mindfulness este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <i className="fas fa-target text-white"></i>
              </div>
              <span className="text-2xl font-bold text-accent">
                {completedHabitsCount}/{totalHabits}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Hábitos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Cumpridos hoje</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <i className="fas fa-chart-line text-white"></i>
              </div>
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {habitPercentage}%
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Progresso</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Bem-estar geral</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Message & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Motivation */}
        <Card className="bg-gradient-to-br from-primary to-accent text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-quote-left text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Mensagem do Dia</h3>
            </div>
            <p className="text-lg mb-4 leading-relaxed">
              "Cada pequeno passo em direção ao cuidado pessoal é uma vitória. Você está no caminho certo! 💙"
            </p>
            <div className="flex items-center text-white/80 text-sm">
              <i className="fas fa-heart mr-2"></i>
              <span>Lembre-se: você merece cuidado e carinho</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/mindfulness')}
                variant="ghost"
                className="w-full justify-start p-4 h-auto bg-secondary/10 hover:bg-secondary/20"
              >
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-wind text-white"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900 dark:text-white">Respiração Guiada</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">5 minutos de calma</p>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/chat')}
                variant="ghost"
                className="w-full justify-start p-4 h-auto bg-accent/10 hover:bg-accent/20"
              >
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-comments text-white"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900 dark:text-white">Desabafar</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Espaço seguro para expressar</p>
                </div>
              </Button>

              <Button
                onClick={() => navigate('/resources')}
                variant="ghost"
                className="w-full justify-start p-4 h-auto bg-primary/10 hover:bg-primary/20"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <i className="fas fa-book text-white"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900 dark:text-white">Recursos</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Artigos e ajuda profissional</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentMoodEntries.map((entry: any, index: number) => (
              <div key={entry.id} className="flex items-center">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Humor registrado: {getMoodEmoji(entry.mood)}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(entry.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}

            {recentMoodEntries.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <i className="fas fa-smile text-3xl mb-2"></i>
                <p>Registre seu primeiro humor para começar!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
