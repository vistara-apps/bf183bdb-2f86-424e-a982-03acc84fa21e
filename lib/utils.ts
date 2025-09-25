import { LEVEL_THRESHOLDS } from './constants';

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i;
    }
  }
  return 0;
}

export function getXpForNextLevel(currentXp: number): { current: number; next: number; progress: number } {
  const currentLevel = calculateLevel(currentXp);
  const nextLevel = Math.min(currentLevel + 1, LEVEL_THRESHOLDS.length - 1);
  
  const currentLevelXp = LEVEL_THRESHOLDS[currentLevel];
  const nextLevelXp = LEVEL_THRESHOLDS[nextLevel];
  
  const progress = nextLevel === currentLevel ? 100 : 
    ((currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  
  return {
    current: currentXp - currentLevelXp,
    next: nextLevelXp - currentLevelXp,
    progress: Math.min(progress, 100)
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getGameThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    'RPG': 'from-purple-600 to-pink-600',
    'FPS': 'from-red-600 to-orange-600',
    'MMO': 'from-blue-600 to-cyan-600',
    'Strategy': 'from-green-600 to-teal-600',
    'Racing': 'from-yellow-600 to-red-600',
    'Fighting': 'from-red-700 to-purple-700',
    'Adventure': 'from-emerald-600 to-blue-600',
    'Puzzle': 'from-indigo-600 to-purple-600',
  };
  return colors[theme] || 'from-gray-600 to-gray-700';
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    'Beginner': 'text-green-400',
    'Intermediate': 'text-yellow-400',
    'Advanced': 'text-red-400',
  };
  return colors[difficulty] || 'text-gray-400';
}

export function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateExerciseId(): string {
  return `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
