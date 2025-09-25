'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { WorkoutCard } from './components/WorkoutCard';
import { UserProfile } from './components/UserProfile';
import { SAMPLE_WORKOUTS } from '@/lib/constants';
import { WorkoutPlan } from '@/lib/types';
import { Gamepad2, Zap, Trophy, Users, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export default function HomePage() {
  const [featuredWorkouts, setFeaturedWorkouts] = useState<WorkoutPlan[]>([]);
  const { initializeUser, user, userProgress } = useAppStore();

  const stats = {
    totalUsers: 1247,
    workoutsCompleted: userProgress.length,
    totalXpEarned: user?.xp || 0,
    activeStreaks: 423 // TODO: Calculate from userProgress
  };

  useEffect(() => {
    // Initialize user if not exists
    if (!user) {
      initializeUser();
    }

    // Load featured workouts
    setFeaturedWorkouts(SAMPLE_WORKOUTS.slice(0, 2));
  }, [user, initializeUser]);

  const handleWorkoutSelect = (workout: WorkoutPlan) => {
    // Navigate to workout detail or start workout
    console.log('Selected workout:', workout.name);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-blue-500 rounded-2xl flex items-center justify-center mx-auto animate-float">
            <Gamepad2 className="w-10 h-10 text-bg" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">GamerFit Nexus</h1>
            <p className="text-text-secondary">Level Up Your Fitness, Game On.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{formatNumber(stats.totalUsers)}</div>
            <div className="text-sm text-text-secondary">Gamers</div>
          </div>
          
          <div className="metric-card text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{formatNumber(stats.workoutsCompleted)}</div>
            <div className="text-sm text-text-secondary">Workouts</div>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold text-fg mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
            Your Progress
          </h2>
          <UserProfile />
        </div>

        {/* Featured Workouts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-fg flex items-center">
              <TrendingUp className="w-5 h-5 text-accent mr-2" />
              Featured Workouts
            </h2>
            <button className="text-accent text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {featuredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.planId}
                workout={workout}
                onSelect={handleWorkoutSelect}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="btn-primary p-6 text-left">
            <Gamepad2 className="w-8 h-8 mb-3" />
            <div className="font-semibold">Start Quick Workout</div>
            <div className="text-sm opacity-90">Get moving in 2 minutes</div>
          </button>
          
          <button className="btn-secondary p-6 text-left">
            <Trophy className="w-8 h-8 mb-3 text-yellow-400" />
            <div className="font-semibold">View Challenges</div>
            <div className="text-sm opacity-90">Join the competition</div>
          </button>
        </div>

        {/* Community Stats */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4">Community Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{formatNumber(stats.totalXpEarned)}</div>
              <div className="text-sm text-text-secondary">Total XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{formatNumber(stats.activeStreaks)}</div>
              <div className="text-sm text-text-secondary">Active Streaks</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
