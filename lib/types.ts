export interface User {
  userId: string;
  username: string;
  walletAddress?: string;
  avatarUrl?: string;
  level: number;
  xp: number;
  registeredAt: Date;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: number;
  rest: number;
  gameTheme?: string;
}

export interface WorkoutPlan {
  planId: string;
  creatorUserId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  gameTheme: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  likes: number;
  remixCount: number;
  estimatedDuration: number;
}

export interface Achievement {
  achievementId: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockCondition: string;
  xpReward: number;
}

export interface Challenge {
  challengeId: string;
  name: string;
  description: string;
  type: 'weekly' | 'monthly' | 'custom';
  startDate: Date;
  endDate: Date;
  creatorUserId: string;
  relatedWorkoutPlanId?: string;
  participants: string[];
  leaderboard: { userId: string; score: number; username: string }[];
}

export interface UserProgress {
  userId: string;
  workoutPlanId: string;
  completedExercises: string[];
  totalXpEarned: number;
  completedAt?: Date;
}

export type GameTheme = 
  | 'RPG' 
  | 'FPS' 
  | 'MMO' 
  | 'Strategy' 
  | 'Racing' 
  | 'Fighting' 
  | 'Adventure' 
  | 'Puzzle';

export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';
