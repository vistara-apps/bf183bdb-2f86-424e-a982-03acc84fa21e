# GamerFit Nexus API Documentation

## Overview

GamerFit Nexus is a Base Mini App that provides game-themed workout experiences. This document outlines the API structure, data models, and integration points for the application.

## Base Architecture

The application uses:
- **Next.js 15** with TypeScript
- **Base OnchainKit** for blockchain integration
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Local Storage** for data persistence (can be extended to APIs)

## Data Models

### User
```typescript
interface User {
  userId: string;
  username: string;
  walletAddress?: string;
  level: number;
  xp: number;
  registeredAt: Date;
}
```

### WorkoutPlan
```typescript
interface WorkoutPlan {
  planId: string;
  creatorUserId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  gameTheme: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: number; // in seconds
  createdAt: Date;
  likes: number;
  remixCount: number;
}
```

### Exercise
```typescript
interface Exercise {
  exerciseId: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: number; // in seconds, for timed exercises
  rest: number; // rest time between sets in seconds
}
```

### Achievement
```typescript
interface Achievement {
  achievementId: string;
  name: string;
  description: string;
  iconUrl: string;
  xpReward: number;
  unlockCondition: string;
}
```

### Challenge
```typescript
interface Challenge {
  challengeId: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  creatorUserId: string;
  participants: string[]; // user IDs
  leaderboard: LeaderboardEntry[];
}
```

### UserProgress
```typescript
interface UserProgress {
  userId: string;
  workoutPlanId: string;
  completedExercises: string[];
  totalXpEarned: number;
  completedAt: Date;
}
```

## API Endpoints

### Base Farcaster Hub API
- **Purpose**: Enable in-frame interactions for social features
- **Endpoint**: `/api/v2/casts`
- **Docs**: https://docs.farcaster.xyz/reference/hub-api/introduction
- **Usage**: Posting workout completions, sharing achievements

### Base Hub API (User Data Storage)
- **Purpose**: Store and retrieve user profile data and workout metadata
- **Docs**: https://docs.base.org/base-app/guides/thinking-social
- **Usage**: Persistent storage for XP, levels, achievements

### Account Abstraction
- **Purpose**: Seamless user interactions with blockchain features
- **Docs**: https://docs.base.org/base-app/build-with-minikit/account-abstraction
- **Usage**: Future NFT rewards, token-gated features

## State Management

The application uses Zustand for global state management with the following stores:

### App Store (`lib/store.ts`)
- **User Management**: `user`, `setUser`, `initializeUser`
- **Progress Tracking**: `userProgress`, `addUserProgress`
- **Workouts**: `workouts`, `addWorkout`, `updateWorkout`
- **Achievements**: `achievements`, `unlockedAchievements`, `unlockAchievement`
- **Challenges**: `challenges`, `activeChallenges`, `joinChallenge`
- **XP System**: `addXP`, `getCurrentLevel`, `getXpToNextLevel`
- **Actions**: `completeExercise`, `completeWorkout`, `likeWorkout`, `shareWorkout`, `remixWorkout`

## XP and Achievement System

### XP Rewards
```typescript
const XP_REWARDS = {
  COMPLETE_EXERCISE: 25,
  COMPLETE_WORKOUT: 50,
  LIKE_WORKOUT: 5,
  SHARE_WORKOUT: 10,
  REMIX_WORKOUT: 30,
  UNLOCK_ACHIEVEMENT: 100,
};
```

### Level Thresholds
```typescript
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  1000,   // Level 5
  1750,   // Level 6
  2750,   // Level 7
  4000,   // Level 8
  5500,   // Level 9
  7500,   // Level 10
  // ... continues
];
```

### Sample Achievements
```typescript
const SAMPLE_ACHIEVEMENTS = [
  {
    achievementId: 'first_workout',
    name: 'First Steps',
    description: 'Complete your first workout',
    iconUrl: '🏃‍♂️',
    xpReward: 100,
  },
  {
    achievementId: 'exercise_master',
    name: 'Exercise Master',
    description: 'Complete 10 exercises',
    iconUrl: '💪',
    xpReward: 200,
  },
  {
    achievementId: 'social_gamer',
    name: 'Social Gamer',
    description: 'Share a workout with the community',
    iconUrl: '🤝',
    xpReward: 150,
  },
  {
    achievementId: 'workout_creator',
    name: 'Workout Creator',
    description: 'Create and share your own workout',
    iconUrl: '🎨',
    xpReward: 250,
  },
  {
    achievementId: 'workout_streak',
    name: 'Consistency King',
    description: 'Complete workouts for 7 consecutive days',
    iconUrl: '🔥',
    xpReward: 500,
  },
];
```

## Challenges System

### Challenge Types
- **Daily**: Short-term goals (24 hours)
- **Weekly**: Medium-term goals (7 days)
- **Monthly**: Long-term goals (30 days)

### Sample Challenges
```typescript
const SAMPLE_CHALLENGES = [
  {
    challengeId: 'weekly-rpg-stamina',
    name: 'RPG Stamina Challenge',
    description: 'Complete 5 RPG-themed workouts this week',
    type: 'weekly',
    // ... other properties
  },
  // ... more challenges
];
```

## Social Sharing

### Share Platforms
- **Farcaster**: Primary social platform integration
- **Twitter**: External sharing option
- **Generic**: Native share API or clipboard copy

### Share Functions
- `shareWorkoutCompletion(workout)`: Share completed workout
- `shareAchievement(achievementName)`: Share unlocked achievement
- `shareChallengeJoin(challengeName)`: Share challenge participation

## Error Handling

### Error Boundary
- Catches React component errors
- Provides user-friendly error messages
- Includes development error details

### Loading States
- `LoadingSpinner`: General loading indicator
- `SkeletonCard`: Content placeholder
- `SkeletonList`: List placeholder
- `SkeletonText`: Text placeholder

## User Flows

### Onboarding Flow
1. Welcome screen
2. Fitness level selection
3. Gaming preferences
4. Goal setting
5. User initialization

### Workout Execution Flow
1. Select workout
2. Start workout session
3. Execute exercises with timers
4. Complete sets and exercises
5. Earn XP and achievements
6. Share completion

### Challenge Participation Flow
1. Browse active challenges
2. Join challenge
3. Track progress
4. Complete challenge requirements
5. View leaderboard ranking

## Future API Extensions

### Planned Endpoints
- `POST /api/workouts`: Create new workout
- `GET /api/workouts`: Fetch workout list
- `POST /api/challenges`: Create challenge
- `GET /api/leaderboard`: Get leaderboard data
- `POST /api/progress`: Update user progress

### Blockchain Integration
- NFT achievements
- Token rewards
- On-chain progress tracking
- Decentralized workout sharing

## Development Notes

### Environment Variables
```env
# Base configuration
NEXT_PUBLIC_BASE_APP_ID=your_app_id
NEXT_PUBLIC_BASE_APP_SECRET=your_app_secret

# Optional: External APIs
NEXT_PUBLIC_TWITTER_API_KEY=your_twitter_key
```

### Build Commands
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

### Testing
```bash
# Run tests
npm test

# Run linting
npm run lint
```

## Deployment

The application is designed as a Base Mini App and can be deployed to:
- Vercel
- Base infrastructure
- Any Next.js compatible hosting

## Contributing

When extending the API:
1. Update this documentation
2. Add TypeScript types for new data models
3. Update state management stores
4. Add proper error handling
5. Test thoroughly before deployment</content>
</xai:function_call">API_DOCUMENTATION.md

