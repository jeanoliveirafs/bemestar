import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getMoodEmoji(mood: number): string {
  const moodEmojis = {
    1: '😢',
    2: '🙁', 
    3: '😐',
    4: '🙂',
    5: '😊'
  };
  return moodEmojis[mood as keyof typeof moodEmojis] || '😐';
}

export function getMoodLabel(mood: number): string {
  const moodLabels = {
    1: 'Muito triste',
    2: 'Triste',
    3: 'Neutro', 
    4: 'Bem',
    5: 'Muito bem'
  };
  return moodLabels[mood as keyof typeof moodLabels] || 'Neutro';
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
