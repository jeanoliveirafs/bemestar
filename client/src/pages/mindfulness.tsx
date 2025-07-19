import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BreathingCircle } from '@/components/ui/breathing-circle';
import { MeditationTimer } from '@/components/ui/meditation-timer';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { getTodayDate } from '@/lib/utils';

export default function Mindfulness() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [gratitudeItems, setGratitudeItems] = useState(['', '', '']);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);

  const saveGratitudeMutation = useMutation({
    mutationFn: async (entries: string[]) => {
      if (!user?.id) throw new Error('User not found');
      
      return apiRequest('POST', '/api/gratitude', {
        userId: user.id,
        entries: entries.filter(entry => entry.trim()),
        date: getTodayDate(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gratitude'] });
      setGratitudeItems(['', '', '']);
      toast({
        title: "Gratidão salva! 🙏",
        description: "Que belo exercício de reconhecimento.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível salvar sua gratidão. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleGratitudeChange = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const handleSaveGratitude = () => {
    const validEntries = gratitudeItems.filter(item => item.trim());
    if (validEntries.length === 0) {
      toast({
        title: "Adicione pelo menos uma gratidão",
        description: "Escreva algo pelo qual você é grato hoje.",
        variant: "destructive",
      });
      return;
    }

    saveGratitudeMutation.mutate(gratitudeItems);
  };

  const handleBreathingComplete = () => {
    toast({
      title: "Exercício concluído! ✨",
      description: "Parabéns por dedicar esse tempo ao seu bem-estar.",
    });
  };

  const handleMeditationComplete = () => {
    toast({
      title: "Sessão de meditação concluída! 🧘‍♀️",
      description: "Como você se sente após essa prática?",
    });
  };

  const sounds = [
    { id: 'rain', name: 'Chuva', emoji: '🌧️' },
    { id: 'ocean', name: 'Oceano', emoji: '🌊' },
    { id: 'forest', name: 'Floresta', emoji: '🌲' },
    { id: 'fire', name: 'Lareira', emoji: '🔥' },
  ];

  const handleSoundToggle = (soundId: string) => {
    if (selectedSound === soundId) {
      setSelectedSound(null);
      toast({
        title: "Som pausado",
        description: "Ambiente sonoro desativado.",
      });
    } else {
      setSelectedSound(soundId);
      const sound = sounds.find(s => s.id === soundId);
      toast({
        title: `${sound?.emoji} Som ativado`,
        description: `Reproduzindo sons de ${sound?.name.toLowerCase()}.`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Mindfulness & Respiração
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Encontre momentos de calma e presença
        </p>
      </div>

      {/* Quick Breathing Exercise */}
      <Card className="mb-8 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Respiração 4-4-4
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Técnica comprovada para reduzir ansiedade
            </p>
            <BreathingCircle onComplete={handleBreathingComplete} />
          </div>
        </CardContent>
      </Card>

      {/* Meditation Timer */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Timer de Meditação
          </h3>
          <MeditationTimer onComplete={handleMeditationComplete} />
        </CardContent>
      </Card>

      {/* Ambient Sounds */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Sons Calmantes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sounds.map((sound) => (
              <Button
                key={sound.id}
                onClick={() => handleSoundToggle(sound.id)}
                variant="outline"
                className={`p-4 h-auto flex flex-col items-center justify-center transition-all ${
                  selectedSound === sound.id 
                    ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                    : 'hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{sound.emoji}</div>
                <p className="text-sm font-medium">{sound.name}</p>
                {selectedSound === sound.id && (
                  <div className="mt-2 flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-1"></div>
                    <span className="text-xs text-primary">Reproduzindo</span>
                  </div>
                )}
              </Button>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
            {selectedSound 
              ? 'Clique novamente para pausar o som' 
              : 'Selecione um som ambiente para acompanhar sua prática'
            }
          </p>
        </CardContent>
      </Card>

      {/* Gratitude Journal */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Diário de Gratidão
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Anote 3 coisas pelas quais você é grato hoje. A gratidão transforma nossa perspectiva.
          </p>
          
          <div className="space-y-4">
            {gratitudeItems.map((item, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {index + 1}. Eu sou grato(a) por...
                </label>
                <Input
                  value={item}
                  onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  placeholder={
                    index === 0 ? "Ex: O apoio da minha família" :
                    index === 1 ? "Ex: Uma conversa boa com um amigo" :
                    "Ex: Consegui acordar mais cedo"
                  }
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleSaveGratitude}
            disabled={saveGratitudeMutation.isPending}
            className="w-full mt-6"
          >
            {saveGratitudeMutation.isPending ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-heart mr-2"></i>
            )}
            Salvar Gratidão
          </Button>
          
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 <strong>Dica:</strong> A prática diária de gratidão está cientificamente comprovada 
              como uma das maneiras mais eficazes de melhorar o bem-estar mental.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
