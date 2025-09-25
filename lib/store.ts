import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, WorkoutPlan, Achievement, Challenge, UserProgress, Exercise } from './types';
import { XP_REWARDS, LEVEL_THRESHOLDS, SAMPLE_ACHIEVEMENTS } from './constants';

interface AppState {
  // User data
  user: User | null;
  setUser: (user: User) => void;

  // User progress
  userProgress: UserProgress[];
  addUserProgress: (progress: UserProgress) => void;

  // Workouts
  workouts: WorkoutPlan[];
  addWorkout: (workout: WorkoutPlan) => void;
  updateWorkout: (workoutId: string, updates: Partial<WorkoutPlan>) => void;

  // Achievements
  achievements: Achievement[];
  unlockedAchievements: string[];
  unlockAchievement: (achievementId: string) => void;

  // Challenges
  challenges: Challenge[];
  activeChallenges: string[];
  joinChallenge: (challengeId: string) => void;
  updateChallengeProgress: (challengeId: string, userId: string, score: number) => void;

  // XP and leveling
  addXP: (amount: number) => void;
  getCurrentLevel: () => number;
  getXpToNextLevel: () => { current: number; next: number; progress: number };

  // Actions
  completeExercise: (workoutId: string, exerciseId: string) => void;
  completeWorkout: (workoutId: string) => void;
  likeWorkout: (workoutId: string) => void;
  shareWorkout: (workoutId: string) => void;
  remixWorkout: (originalWorkoutId: string, newWorkout: WorkoutPlan) => void;

  // Initialization
  initializeUser: (walletAddress?: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      userProgress: [],
      workouts: [],
      achievements: SAMPLE_ACHIEVEMENTS,
      unlockedAchievements: [],
      challenges: [],
      activeChallenges: [],

      // User management
      setUser: (user) => set({ user }),

      initializeUser: (walletAddress) => {
        const existingUser = get().user;
        if (existingUser) return;

        const newUser: User = {
          userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          username: 'FitnessGamer',
          walletAddress,
          level: 1,
          xp: 0,
          registeredAt: new Date(),
        };
        set({ user: newUser });
      },

      // User progress
      addUserProgress: (progress) => {
        set((state) => ({
          userProgress: [...state.userProgress, progress],
        }));
      },

      // Workouts
      addWorkout: (workout) => {
        set((state) => ({
          workouts: [...state.workouts, workout],
        }));
      },

      updateWorkout: (workoutId, updates) => {
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.planId === workoutId ? { ...workout, ...updates } : workout
          ),
        }));
      },

      // Achievements
      unlockAchievement: (achievementId) => {
        set((state) => ({
          unlockedAchievements: [...new Set([...state.unlockedAchievements, achievementId])],
        }));
      },

      // Challenges
      joinChallenge: (challengeId) => {
        set((state) => ({
          activeChallenges: [...new Set([...state.activeChallenges, challengeId])],
        }));
      },

      updateChallengeProgress: (challengeId, userId, score) => {
        set((state) => ({
          challenges: state.challenges.map((challenge) =>
            challenge.challengeId === challengeId
              ? {
                  ...challenge,
                  leaderboard: challenge.leaderboard.map((entry) =>
                    entry.userId === userId ? { ...entry, score } : entry
                  ),
                }
              : challenge
          ),
        }));
      },

      // XP and leveling
      addXP: (amount) => {
        set((state) => {
          if (!state.user) return state;

          const newXp = state.user.xp + amount;
          const newLevel = LEVEL_THRESHOLDS.findIndex((threshold) => newXp < threshold) - 1;

          return {
            user: {
              ...state.user,
              xp: newXp,
              level: Math.max(1, newLevel),
            },
          };
        });
      },

      getCurrentLevel: () => {
        const user = get().user;
        return user?.level || 1;
      },

      getXpToNextLevel: () => {
        const user = get().user;
        if (!user) return { current: 0, next: 100, progress: 0 };

        const currentLevel = user.level;
        const currentLevelXp = LEVEL_THRESHOLDS[currentLevel - 1] || 0;
        const nextLevelXp = LEVEL_THRESHOLDS[currentLevel] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

        const progress = nextLevelXp === currentLevelXp ? 100 :
          ((user.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

        return {
          current: user.xp - currentLevelXp,
          next: nextLevelXp - currentLevelXp,
          progress: Math.min(progress, 100),
        };
      },

      // Actions
      completeExercise: (workoutId, exerciseId) => {
        const { addXP, unlockAchievement, userProgress } = get();

        // Add XP for completing exercise
        addXP(XP_REWARDS.COMPLETE_EXERCISE);

        // Update progress
        const progress: UserProgress = {
          userId: get().user?.userId || 'unknown',
          workoutPlanId: workoutId,
          completedExercises: [exerciseId],
          totalXpEarned: XP_REWARDS.COMPLETE_EXERCISE,
        };
        get().addUserProgress(progress);

        // Check for achievements
        const exerciseCount = userProgress.filter(p => p.completedExercises.includes(exerciseId)).length;
        if (exerciseCount >= 10 && !get().unlockedAchievements.includes('exercise_master')) {
          unlockAchievement('exercise_master');
          addXP(200); // Bonus XP for achievement
        }
      },

      completeWorkout: (workoutId) => {
        const { addXP, unlockAchievement, userProgress } = get();

        // Add XP for completing workout
        addXP(XP_REWARDS.COMPLETE_WORKOUT);

        // Check for first workout achievement
        if (!get().unlockedAchievements.includes('first_workout')) {
          unlockAchievement('first_workout');
        }

        // Check for workout streak achievements
        const workoutCount = userProgress.filter(p => p.workoutPlanId === workoutId).length;
        if (workoutCount >= 7 && !get().unlockedAchievements.includes('workout_streak')) {
          unlockAchievement('workout_streak');
          addXP(500);
        }
      },

      likeWorkout: (workoutId) => {
        const { updateWorkout, addXP } = get();

        updateWorkout(workoutId, { likes: (get().workouts.find(w => w.planId === workoutId)?.likes || 0) + 1 });
        addXP(XP_REWARDS.LIKE_WORKOUT);
      },

      shareWorkout: (workoutId) => {
        const { addXP, unlockAchievement } = get();

        addXP(XP_REWARDS.SHARE_WORKOUT);

        // Check for social achievement
        if (!get().unlockedAchievements.includes('social_gamer')) {
          unlockAchievement('social_gamer');
        }
      },

      remixWorkout: (originalWorkoutId, newWorkout) => {
        const { addWorkout, updateWorkout, addXP, unlockAchievement } = get();

        // Add the new workout
        addWorkout(newWorkout);

        // Increment remix count on original
        updateWorkout(originalWorkoutId, {
          remixCount: (get().workouts.find(w => w.planId === originalWorkoutId)?.remixCount || 0) + 1
        });

        // Add XP for remixing
        addXP(XP_REWARDS.REMIX_WORKOUT);

        // Check for creator achievement
        if (!get().unlockedAchievements.includes('workout_creator')) {
          unlockAchievement('workout_creator');
        }
      },
    }),
    {
      name: 'gamerfit-nexus-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        userProgress: state.userProgress,
        workouts: state.workouts,
        unlockedAchievements: state.unlockedAchievements,
        activeChallenges: state.activeChallenges,
      }),
    }
  )
);

// Helper hooks
export const useUser = () => useAppStore((state) => state.user);
export const useUserXP = () => useAppStore((state) => state.user?.xp || 0);
export const useUserLevel = () => useAppStore((state) => state.getCurrentLevel());
export const useXpToNextLevel = () => useAppStore((state) => state.getXpToNextLevel());
export const useWorkouts = () => useAppStore((state) => state.workouts);
export const useAchievements = () => useAppStore((state) => state.achievements);
export const useUnlockedAchievements = () => useAppStore((state) => state.unlockedAchievements);
export const useChallenges = () => useAppStore((state) => state.challenges);
export const useActiveChallenges = () => useAppStore((state) => state.activeChallenges);

