'use client';

import { Challenge } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { getChallengeProgress, getChallengeTarget, getTimeRemaining, isChallengeCompleted } from '@/lib/challenges';
import { Trophy, Users, Clock, Target, CheckCircle } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  showJoinButton?: boolean;
}

export function ChallengeCard({ challenge, showJoinButton = true }: ChallengeCardProps) {
  const { user, joinChallenge, activeChallenges } = useAppStore();

  const isJoined = activeChallenges.includes(challenge.challengeId);
  const progress = user ? getChallengeProgress(challenge, user.userId) : 0;
  const target = getChallengeTarget(challenge);
  const progressPercentage = Math.min((progress / target) * 100, 100);
  const isCompleted = user ? isChallengeCompleted(challenge, user.userId) : false;
  const timeRemaining = getTimeRemaining(challenge.endDate);

  const handleJoinChallenge = () => {
    if (user && !isJoined) {
      joinChallenge(challenge.challengeId);
    }
  };

  return (
    <div className={`glass-card p-6 rounded-xl transition-all duration-300 ${
      isCompleted ? 'border-accent border-2' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-1">{challenge.name}</h3>
          <p className="text-sm text-text-secondary">{challenge.description}</p>
        </div>
        {isCompleted && (
          <div className="ml-3">
            <CheckCircle className="w-6 h-6 text-accent" />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Users className="w-5 h-5 text-accent mx-auto mb-1" />
          <div className="text-sm font-medium text-fg">{challenge.participants.length}</div>
          <div className="text-xs text-text-secondary">Joined</div>
        </div>

        <div className="text-center">
          <Target className="w-5 h-5 text-accent mx-auto mb-1" />
          <div className="text-sm font-medium text-fg">{target}</div>
          <div className="text-xs text-text-secondary">Target</div>
        </div>

        <div className="text-center">
          <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
          <div className="text-sm font-medium text-fg">{timeRemaining}</div>
          <div className="text-xs text-text-secondary">Left</div>
        </div>
      </div>

      {/* Progress Bar */}
      {isJoined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Your Progress</span>
            <span className="text-sm font-medium text-fg">{progress}/{target}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-accent to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Leaderboard Preview */}
      {challenge.leaderboard.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-fg mb-2 flex items-center">
            <Trophy className="w-4 h-4 text-yellow-400 mr-1" />
            Top Performers
          </h4>
          <div className="space-y-1">
            {challenge.leaderboard.slice(0, 3).map((entry, index) => (
              <div key={entry.userId} className="flex items-center space-x-2 text-sm">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500 text-black' :
                  index === 1 ? 'bg-gray-400 text-black' :
                  'bg-orange-600 text-white'
                }`}>
                  {index + 1}
                </span>
                <span className="text-text-secondary truncate">{entry.username}</span>
                <span className="text-accent font-medium ml-auto">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {showJoinButton && (
        <button
          onClick={handleJoinChallenge}
          disabled={!user || isJoined}
          className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            isJoined
              ? 'bg-accent text-bg'
              : 'bg-surface text-fg border border-gray-600 hover:border-accent'
          }`}
        >
          {isJoined ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Joined</span>
            </>
          ) : (
            <>
              <Trophy className="w-4 h-4" />
              <span>Join Challenge</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

