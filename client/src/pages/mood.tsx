import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MoodSelector } from '@/components/ui/mood-selector';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { getTodayDate, getMoodEmoji, getMoodLabel, formatDate } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';

export default function Mood() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMood, setSelectedMood] = useState<number>();
  const [note, setNote] = useState('');
  const today = getTodayDate();

  const { data: moodEntries = [] } = useQuery({
    queryKey: ['/api/mood', user?.id],
    enabled: !!user?.id,
  });

  const saveMoodMutation = useMutation({
    mutationFn: async (data: { mood: number; note: string }) => {
      if (!user?.id) throw new Error('User not found');
      
      return apiRequest('POST', '/api/mood', {
        userId: user.id,
        mood: data.mood,
        note: data.note,
        date: today,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mood'] });
      setSelectedMood(undefined);
      setNote('');
      toast({
        title: "Humor registrado! 💙",
        description: "Obrigado por compartilhar como você está se sentindo.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o registro. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSaveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Selecione um humor",
        description: "Por favor, escolha como você está se sentindo.",
        variant: "destructive",
      });
      return;
    }

    saveMoodMutation.mutate({ mood: selectedMood, note });
  };

  // Simple mood chart data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const chartData = last7Days.map(date => {
    const entry = moodEntries.find((e: any) => e.date === date);
    return {
      date,
      mood: entry?.mood || 0,
      day: new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' })
    };
  });

  const getInsights = () => {
    if (moodEntries.length < 3) return [];
    
    const recentMoods = moodEntries.slice(0, 3).map((e: any) => e.mood);
    const avgRecent = recentMoods.reduce((a: number, b: number) => a + b, 0) / recentMoods.length;
    
    const insights = [];
    
    if (avgRecent >= 4) {
      insights.push({
        type: 'positive',
        title: 'Tendência positiva',
        description: 'Seu humor tem se mantido bem nos últimos dias!',
        icon: 'fas fa-chart-line',
        color: 'secondary'
      });
    } else if (avgRecent <= 2) {
      insights.push({
        type: 'concern',
        title: 'Momento difícil',
        description: 'Que tal tentar uma sessão de mindfulness para se cuidar?',
        icon: 'fas fa-heart',
        color: 'accent'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Registro de Humor</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Acompanhe seu bem-estar emocional ao longo do tempo
        </p>
      </div>

      {/* Today's Mood */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Como você está hoje?
          </h2>
          
          <div className="mb-6">
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
              size="lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Como foi seu dia? (opcional)
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Descreva como você se sente ou o que aconteceu hoje..."
              className="resize-none"
            />
          </div>

          <Button 
            onClick={handleSaveMood}
            disabled={saveMoodMutation.isPending}
            className="w-full"
          >
            {saveMoodMutation.isPending ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-heart mr-2"></i>
            )}
            Salvar registro do dia
          </Button>
        </CardContent>
      </Card>

      {/* Mood History Chart */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Histórico dos últimos 7 dias
          </h3>
          
          <div className="flex items-end justify-between h-32 mb-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 rounded-t-lg mb-2 transition-all duration-300 ${
                    data.mood === 0 ? 'bg-slate-200 dark:bg-slate-700' :
                    data.mood <= 2 ? 'bg-destructive' :
                    data.mood === 3 ? 'bg-yellow-500' :
                    'bg-secondary'
                  }`}
                  style={{ height: `${Math.max(data.mood * 16, 8)}px` }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-destructive rounded mr-2"></div>
              <span className="text-slate-600 dark:text-slate-400">Difícil</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span className="text-slate-600 dark:text-slate-400">Neutro</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary rounded mr-2"></div>
              <span className="text-slate-600 dark:text-slate-400">Bem</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Insights */}
      {insights.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Insights da Semana
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`flex items-start p-4 rounded-xl bg-${insight.color}/10 border border-${insight.color}/20`}
                >
                  <div className={`w-8 h-8 bg-${insight.color} rounded-lg flex items-center justify-center mr-3 mt-0.5`}>
                    <i className={`${insight.icon} text-white text-sm`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{insight.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Entries */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Registros Recentes
          </h3>
          
          {moodEntries.length > 0 ? (
            <div className="space-y-3">
              {moodEntries.slice(0, 5).map((entry: any) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {formatDate(entry.date)}
                      </p>
                      {entry.note && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-xs">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {getMoodLabel(entry.mood)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <i className="fas fa-smile text-3xl mb-2"></i>
              <p>Ainda não há registros de humor.</p>
              <p className="text-sm">Comece registrando como você se sente hoje!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
