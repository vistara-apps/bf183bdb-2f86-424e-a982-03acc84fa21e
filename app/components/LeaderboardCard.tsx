'use client';

import { Trophy, Medal, Award } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar?: string;
  level: number;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  title: string;
  scoreLabel: string;
}

export function LeaderboardCard({ entries, title, scoreLabel }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-text-secondary">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-400 bg-yellow-400 bg-opacity-10';
      case 2:
        return 'border-gray-300 bg-gray-300 bg-opacity-10';
      case 3:
        return 'border-amber-600 bg-amber-600 bg-opacity-10';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
        <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
        {title}
      </h3>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={`${entry.rank}-${entry.username}`}
            className={`flex items-center space-x-4 p-3 rounded-lg border ${getRankColor(entry.rank)}`}
          >
            <div className="flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-500 rounded-full flex items-center justify-center text-bg font-bold">
              {entry.avatar || entry.username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="font-medium text-fg">{entry.username}</div>
              <div className="text-sm text-text-secondary">Level {entry.level}</div>
            </div>

            <div className="text-right">
              <div className="font-bold text-accent">{formatNumber(entry.score)}</div>
              <div className="text-xs text-text-secondary">{scoreLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
