import { Challenge } from './types';

export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    challengeId: 'weekly-rpg-stamina',
    name: 'RPG Stamina Challenge',
    description: 'Complete 5 RPG-themed workouts this week to prove your endurance like a legendary hero!',
    type: 'weekly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    creatorUserId: 'system',
    participants: [],
    leaderboard: []
  },
  {
    challengeId: 'monthly-fps-precision',
    name: 'FPS Precision Master',
    description: 'Complete 15 FPS-themed workouts this month. Precision and speed are key!',
    type: 'monthly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    creatorUserId: 'system',
    participants: [],
    leaderboard: []
  },
  {
    challengeId: 'daily-quick-burst',
    name: 'Daily Quick Burst',
    description: 'Complete at least one workout every day for a week. Short and intense!',
    type: 'weekly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    creatorUserId: 'system',
    participants: [],
    leaderboard: []
  },
  {
    challengeId: 'monthly-social-sharer',
    name: 'Social Fitness Gamer',
    description: 'Share 10 workouts with the community this month. Spread the gaming fitness revolution!',
    type: 'monthly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    creatorUserId: 'system',
    participants: [],
    leaderboard: []
  }
];

export const getActiveChallenges = (challenges: Challenge[]): Challenge[] => {
  const now = new Date();
  return challenges.filter(challenge => challenge.endDate > now);
};

export const getChallengeProgress = (challenge: Challenge, userId: string): number => {
  const userEntry = challenge.leaderboard.find(entry => entry.userId === userId);
  return userEntry?.score || 0;
};

export const getChallengeTarget = (challenge: Challenge): number => {
  // Extract target from challenge description or set defaults
  if (challenge.name.includes('RPG Stamina')) return 5;
  if (challenge.name.includes('FPS Precision')) return 15;
  if (challenge.name.includes('Daily Quick Burst')) return 7; // 7 days
  if (challenge.name.includes('Social Fitness')) return 10;
  return 1;
};

export const isChallengeCompleted = (challenge: Challenge, userId: string): boolean => {
  const progress = getChallengeProgress(challenge, userId);
  const target = getChallengeTarget(challenge);
  return progress >= target;
};

export const getTimeRemaining = (endDate: Date): string => {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days}d ${hours}h left`;
  } else if (hours > 0) {
    return `${hours}h left`;
  } else {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
  }
};

