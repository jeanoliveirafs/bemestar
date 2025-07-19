import { useState, useEffect } from 'react';
import { Button } from './button';

interface BreathingCircleProps {
  onComplete?: () => void;
  duration?: number; // Duration in seconds for one complete cycle
}

export function BreathingCircle({ onComplete, duration = 12 }: BreathingCircleProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const totalCycles = 5;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setCount((prev) => {
          const newCount = prev + 1;
          
          // Phase transitions based on 4-4-4 breathing
          if (newCount <= 4) {
            setPhase('inhale');
          } else if (newCount <= 8) {
            setPhase('hold');
          } else if (newCount <= 12) {
            setPhase('exhale');
          } else {
            // Complete cycle
            setCycleCount((prevCycle) => {
              const newCycle = prevCycle + 1;
              if (newCycle >= totalCycles) {
                setIsActive(false);
                onComplete?.();
                return 0;
              }
              return newCycle;
            });
            return 0;
          }
          
          return newCount;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const start = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(0);
    setCycleCount(0);
  };

  const stop = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(0);
    setCycleCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspire';
      case 'hold':
        return 'Segure';
      case 'exhale':
        return 'Expire';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-110';
      case 'hold':
        return 'scale-110';
      case 'exhale':
        return 'scale-100';
      default:
        return 'scale-100';
    }
  };

  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6">
        <div
          className={`w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl transition-transform duration-1000 ${getScale()}`}
        >
          <div className="text-center">
            <div className="text-white font-medium text-lg">{getPhaseText()}</div>
            {isActive && (
              <div className="text-primary-100 text-sm">
                {cycleCount + 1}/{totalCycles}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        {!isActive ? (
          <Button onClick={start} className="bg-primary hover:bg-primary/90">
            <i className="fas fa-play mr-2"></i>
            Iniciar Respiração
          </Button>
        ) : (
          <Button onClick={stop} variant="secondary">
            <i className="fas fa-stop mr-2"></i>
            Parar
          </Button>
        )}
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mx-auto mt-4">
        Siga o ritmo: inspire por 4 segundos, segure por 4, expire por 4. 
        Complete {totalCycles} ciclos para uma sessão completa.
      </p>
    </div>
  );
}
