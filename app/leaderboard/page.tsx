'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { Trophy, Calendar, Zap, Users } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar?: string;
  level: number;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<LeaderboardEntry[]>([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockWeeklyData: LeaderboardEntry[] = [
      { rank: 1, username: 'FitGamer42', score: 2450, level: 15 },
      { rank: 2, username: 'WorkoutWarrior', score: 2180, level: 12 },
      { rank: 3, username: 'RPGFitness', score: 1950, level: 14 },
      { rank: 4, username: 'GymQuester', score: 1720, level: 11 },
      { rank: 5, username: 'HealthHero', score: 1580, level: 13 },
    ];

    const mockMonthlyData: LeaderboardEntry[] = [
      { rank: 1, username: 'WorkoutWarrior', score: 8750, level: 12 },
      { rank: 2, username: 'FitGamer42', score: 8200, level: 15 },
      { rank: 3, username: 'HealthHero', score: 7890, level: 13 },
      { rank: 4, username: 'RPGFitness', score: 7650, level: 14 },
      { rank: 5, username: 'GymQuester', score: 7200, level: 11 },
    ];

    const mockAllTimeData: LeaderboardEntry[] = [
      { rank: 1, username: 'HealthHero', score: 45600, level: 13 },
      { rank: 2, username: 'FitGamer42', score: 42300, level: 15 },
      { rank: 3, username: 'WorkoutWarrior', score: 38900, level: 12 },
      { rank: 4, username: 'RPGFitness', score: 35700, level: 14 },
      { rank: 5, username: 'GymQuester', score: 32100, level: 11 },
    ];

    setWeeklyLeaders(mockWeeklyData);
    setMonthlyLeaders(mockMonthlyData);
    setAllTimeLeaders(mockAllTimeData);
  }, []);

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyLeaders;
      case 'monthly':
        return monthlyLeaders;
      case 'allTime':
        return allTimeLeaders;
      default:
        return weeklyLeaders;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'weekly':
        return 'Weekly Champions';
      case 'monthly':
        return 'Monthly Legends';
      case 'allTime':
        return 'All-Time Heroes';
      default:
        return 'Weekly Champions';
    }
  };

  const tabs = [
    { key: 'weekly' as const, label: 'Weekly', icon: Calendar },
    { key: 'monthly' as const, label: 'Monthly', icon: Zap },
    { key: 'allTime' as const, label: 'All Time', icon: Trophy },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg mb-2 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
            Leaderboards
          </h1>
          <p className="text-text-secondary">Compete with gamers worldwide</p>
        </div>

        {/* Tab Navigation */}
        <div className="glass-card p-2 rounded-xl">
          <div className="flex space-x-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-accent text-bg'
                    : 'text-text-secondary hover:text-fg hover:bg-surface hover:bg-opacity-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Challenge Info */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-fg flex items-center">
              <Users className="w-5 h-5 text-accent mr-2" />
              Current Challenge
            </h3>
            <span className="text-sm text-accent font-medium">3 days left</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-fg">RPG Stamina Challenge</h4>
              <p className="text-sm text-text-secondary">Complete the most RPG-themed workouts this week</p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Your Progress:</span>
              <span className="text-accent font-bold">4 workouts completed</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-accent to-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <LeaderboardCard
          entries={getCurrentLeaderboard()}
          title={getTabTitle()}
          scoreLabel="XP"
        />

        {/* Your Rank */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4">Your Ranking</h3>
          
          <div className="flex items-center space-x-4 p-4 bg-surface bg-opacity-60 rounded-lg border border-accent">
            <div className="flex items-center justify-center w-8 h-8 bg-accent text-bg rounded-full font-bold">
              #12
            </div>
            
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-500 rounded-full flex items-center justify-center text-bg font-bold">
              Y
            </div>
            
            <div className="flex-1">
              <div className="font-medium text-fg">You</div>
              <div className="text-sm text-text-secondary">Level 8</div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-accent">1,250 XP</div>
              <div className="text-xs text-text-secondary">This week</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-text-secondary">
              You need <span className="text-accent font-bold">330 more XP</span> to reach the top 10!
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="btn-primary p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Join Challenge</div>
          </button>
          
          <button className="btn-secondary p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Boost XP</div>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
