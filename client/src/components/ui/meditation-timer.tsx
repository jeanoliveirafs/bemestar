import { useState, useEffect } from 'react';
import { Button } from './button';
import { formatTime } from '@/lib/utils';

interface MeditationTimerProps {
  onComplete?: () => void;
}

export function MeditationTimer({ onComplete }: MeditationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const setTimer = (minutes: number) => {
    setSelectedTime(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime * 60);
  };

  const timeOptions = [5, 10, 15, 20];

  return (
    <div className="text-center">
      {/* Timer Display */}
      <div className="text-6xl font-bold text-slate-900 dark:text-white mb-8">
        {formatTime(timeLeft)}
      </div>

      {/* Time Selection */}
      <div className="flex justify-center space-x-4 mb-8">
        {timeOptions.map((minutes) => (
          <Button
            key={minutes}
            onClick={() => setTimer(minutes)}
            variant={selectedTime === minutes ? "default" : "outline"}
            size="sm"
          >
            {minutes} min
          </Button>
        ))}
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <Button onClick={startTimer} disabled={timeLeft === 0}>
            <i className="fas fa-play mr-2"></i>
            {timeLeft === selectedTime * 60 ? 'Iniciar' : 'Continuar'}
          </Button>
        ) : (
          <Button onClick={pauseTimer} variant="secondary">
            <i className="fas fa-pause mr-2"></i>
            Pausar
          </Button>
        )}
        
        <Button onClick={resetTimer} variant="outline">
          <i className="fas fa-redo mr-2"></i>
          Reiniciar
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-full max-w-md mx-auto">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{
              width: `${((selectedTime * 60 - timeLeft) / (selectedTime * 60)) * 100}%`,
            }}
          />
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-center mt-4">
        Encontre uma posição confortável e concentre-se na sua respiração.
      </p>
    </div>
  );
}
