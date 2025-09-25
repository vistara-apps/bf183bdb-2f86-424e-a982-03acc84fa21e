'use client';

import { Challenge } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { getChallengeProgress, getChallengeTarget, getTimeRemaining, isChallengeCompleted } from '@/lib/challenges';
import { Trophy, Target, Clock, TrendingUp, Award } from 'lucide-react';

interface ChallengeProgressProps {
  challenge: Challenge;
}

export function ChallengeProgress({ challenge }: ChallengeProgressProps) {
  const { user } = useAppStore();

  if (!user) return null;

  const progress = getChallengeProgress(challenge, user.userId);
  const target = getChallengeTarget(challenge);
  const progressPercentage = Math.min((progress / target) * 100, 100);
  const isCompleted = isChallengeCompleted(challenge, user.userId);
  const timeRemaining = getTimeRemaining(challenge.endDate);

  // Calculate rank
  const sortedLeaderboard = [...challenge.leaderboard].sort((a, b) => b.score - a.score);
  const userRank = sortedLeaderboard.findIndex(entry => entry.userId === user.userId) + 1;

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-fg mb-2">{challenge.name}</h2>
        <p className="text-text-secondary">{challenge.description}</p>
      </div>

      {/* Progress Overview */}
      <div className="glass-card p-6 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <Target className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{progress}</div>
            <div className="text-sm text-text-secondary">Completed</div>
          </div>

          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{target}</div>
            <div className="text-sm text-text-secondary">Target</div>
          </div>

          <div className="text-center">
            <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{timeRemaining}</div>
            <div className="text-sm text-text-secondary">Time Left</div>
          </div>

          <div className="text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">#{userRank || 'N/A'}</div>
            <div className="text-sm text-text-secondary">Your Rank</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-fg">Progress</span>
            <span className="text-accent font-bold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-accent to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-center text-sm text-text-secondary">
            {progress} of {target} completed
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {isCompleted && (
        <div className="glass-card p-6 rounded-xl border-2 border-accent">
          <div className="text-center">
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-fg mb-2">Challenge Completed!</h3>
            <p className="text-text-secondary mb-4">
              Congratulations! You've successfully completed this challenge.
            </p>
            <div className="achievement-badge inline-block">
              +100 XP Bonus
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
          <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
          Leaderboard
        </h3>

        {sortedLeaderboard.length > 0 ? (
          <div className="space-y-3">
            {sortedLeaderboard.slice(0, 10).map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center space-x-4 p-3 rounded-lg ${
                  entry.userId === user.userId
                    ? 'bg-accent bg-opacity-10 border border-accent'
                    : 'bg-surface bg-opacity-60'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500 text-black' :
                  index === 1 ? 'bg-gray-400 text-black' :
                  index === 2 ? 'bg-orange-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-fg">{entry.username}</div>
                  <div className="text-sm text-text-secondary">Level {entry.level}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-accent">{entry.score}</div>
                  <div className="text-xs text-text-secondary">points</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-secondary">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No participants yet. Be the first to join!</p>
          </div>
        )}
      </div>
    </div>
  );
}

