'use client';

import { useState, useEffect } from 'react';
import { User, Trophy, Zap, Target } from 'lucide-react';
import { calculateLevel, getXpForNextLevel, formatNumber } from '@/lib/utils';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';

interface UserStats {
  level: number;
  xp: number;
  workoutsCompleted: number;
  streakDays: number;
}

export function UserProfile() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    xp: 150,
    workoutsCompleted: 3,
    streakDays: 2
  });

  const xpProgress = getXpForNextLevel(userStats.xp);

  return (
    <div className="space-y-6">
      {/* User Identity */}
      <div className="glass-card p-6 rounded-xl">
        <Wallet>
          <ConnectWallet>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 rounded-full border-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 bg-accent text-bg text-xs font-bold px-2 py-1 rounded-full">
                  {userStats.level}
                </div>
              </div>
              <div className="flex-1">
                <Name className="text-xl font-bold text-fg" />
                <p className="text-text-secondary">Fitness Gamer</p>
              </div>
            </div>
          </ConnectWallet>
        </Wallet>
      </div>

      {/* XP Progress */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center">
            <Zap className="w-5 h-5 text-accent mr-2" />
            Experience Points
          </h3>
          <span className="text-accent font-bold">{formatNumber(userStats.xp)} XP</span>
        </div>
        
        <div className="xp-bar h-3 mb-2">
          <div 
            className="xp-fill h-full"
            style={{ width: `${xpProgress.progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Level {userStats.level}</span>
          <span>{xpProgress.current}/{xpProgress.next} to next level</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card text-center">
          <Target className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-fg">{userStats.workoutsCompleted}</div>
          <div className="text-sm text-text-secondary">Workouts</div>
        </div>
        
        <div className="metric-card text-center">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-fg">{userStats.streakDays}</div>
          <div className="text-sm text-text-secondary">Day Streak</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
          Recent Achievements
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-surface bg-opacity-60 rounded-lg">
            <div className="text-2xl">🏃‍♂️</div>
            <div className="flex-1">
              <div className="font-medium text-fg">First Steps</div>
              <div className="text-sm text-text-secondary">Completed your first workout</div>
            </div>
            <div className="achievement-badge">+100 XP</div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-surface bg-opacity-60 rounded-lg">
            <div className="text-2xl">🤝</div>
            <div className="flex-1">
              <div className="font-medium text-fg">Social Gamer</div>
              <div className="text-sm text-text-secondary">Shared a workout with the community</div>
            </div>
            <div className="achievement-badge">+75 XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
