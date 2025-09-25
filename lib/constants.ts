import { GameTheme, Exercise, WorkoutPlan, Achievement } from './types';

export const GAME_THEMES: { value: GameTheme; label: string; description: string }[] = [
  { value: 'RPG', label: 'RPG Quest', description: 'Epic adventures and character building' },
  { value: 'FPS', label: 'FPS Combat', description: 'Fast-paced action and precision' },
  { value: 'MMO', label: 'MMO Raid', description: 'Team-based endurance challenges' },
  { value: 'Strategy', label: 'Strategy Master', description: 'Tactical planning and execution' },
  { value: 'Racing', label: 'Speed Demon', description: 'High-intensity cardio rushes' },
  { value: 'Fighting', label: 'Combat Sports', description: 'Martial arts and combat training' },
  { value: 'Adventure', label: 'Explorer', description: 'Discovery and exploration themed' },
  { value: 'Puzzle', label: 'Mind Games', description: 'Mental and physical coordination' },
];

export const XP_REWARDS = {
  COMPLETE_EXERCISE: 10,
  COMPLETE_WORKOUT: 50,
  CREATE_WORKOUT: 25,
  SHARE_WORKOUT: 15,
  LIKE_WORKOUT: 5,
  REMIX_WORKOUT: 20,
  DAILY_STREAK: 30,
  WEEKLY_CHALLENGE: 100,
  ACHIEVEMENT_UNLOCK: 75,
};

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000
];

export const SAMPLE_EXERCISES: Exercise[] = [
  {
    exerciseId: '1',
    name: 'Warrior Push-ups',
    description: 'Channel your inner RPG warrior with powerful push-ups',
    sets: 3,
    reps: 12,
    rest: 60,
    gameTheme: 'RPG'
  },
  {
    exerciseId: '2',
    name: 'Sniper Squats',
    description: 'Precision squats for FPS accuracy',
    sets: 4,
    reps: 15,
    rest: 45,
    gameTheme: 'FPS'
  },
  {
    exerciseId: '3',
    name: 'Guild Burpees',
    description: 'Team up with your muscles for MMO-style burpees',
    sets: 3,
    reps: 8,
    rest: 90,
    gameTheme: 'MMO'
  },
  {
    exerciseId: '4',
    name: 'Strategic Planks',
    description: 'Hold your position like a strategy game master',
    sets: 3,
    reps: 1,
    duration: 45,
    rest: 60,
    gameTheme: 'Strategy'
  },
];

export const SAMPLE_WORKOUTS: WorkoutPlan[] = [
  {
    planId: '1',
    creatorUserId: 'system',
    name: 'RPG Hero Training',
    description: 'Build strength like a legendary hero preparing for the final boss',
    exercises: SAMPLE_EXERCISES.filter(e => e.gameTheme === 'RPG'),
    gameTheme: 'RPG',
    difficulty: 'Intermediate',
    createdAt: new Date(),
    likes: 42,
    remixCount: 8,
    estimatedDuration: 25
  },
  {
    planId: '2',
    creatorUserId: 'system',
    name: 'FPS Bootcamp',
    description: 'Train your reflexes and endurance for competitive gaming',
    exercises: SAMPLE_EXERCISES.filter(e => e.gameTheme === 'FPS'),
    gameTheme: 'FPS',
    difficulty: 'Advanced',
    createdAt: new Date(),
    likes: 38,
    remixCount: 12,
    estimatedDuration: 30
  },
];

export const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    achievementId: '1',
    name: 'First Steps',
    description: 'Complete your first workout',
    iconUrl: '🏃‍♂️',
    unlockCondition: 'complete_first_workout',
    xpReward: 100
  },
  {
    achievementId: '2',
    name: 'Workout Creator',
    description: 'Create your first custom workout',
    iconUrl: '🛠️',
    unlockCondition: 'create_first_workout',
    xpReward: 150
  },
  {
    achievementId: '3',
    name: 'Social Gamer',
    description: 'Share a workout with the community',
    iconUrl: '🤝',
    unlockCondition: 'share_first_workout',
    xpReward: 75
  },
  {
    achievementId: '4',
    name: 'Streak Master',
    description: 'Complete workouts for 7 days in a row',
    iconUrl: '🔥',
    unlockCondition: 'seven_day_streak',
    xpReward: 300
  },
];
