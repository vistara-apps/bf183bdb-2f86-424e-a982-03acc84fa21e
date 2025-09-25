'use client';

import { WorkoutPlan } from '@/lib/types';
import { Clock, Heart, Users, Zap } from 'lucide-react';
import { formatDuration, formatNumber, getGameThemeColor, getDifficultyColor } from '@/lib/utils';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onSelect?: (workout: WorkoutPlan) => void;
  showActions?: boolean;
}

export function WorkoutCard({ workout, onSelect, showActions = true }: WorkoutCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(workout);
    }
  };

  return (
    <div 
      className="workout-card animate-slide-up"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getGameThemeColor(workout.gameTheme)} text-white`}>
              {workout.gameTheme}
            </div>
            <span className={`text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
              {workout.difficulty}
            </span>
          </div>
          <h3 className="text-lg font-bold text-fg mb-1">{workout.name}</h3>
          <p className="text-sm text-text-secondary line-clamp-2">{workout.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(workout.estimatedDuration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4" />
            <span>{workout.exercises.length} exercises</span>
          </div>
        </div>
      </div>

      {/* Exercises Preview */}
      <div className="mb-4">
        <div className="text-sm font-medium text-fg mb-2">Exercises:</div>
        <div className="space-y-1">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <div key={exercise.exerciseId} className="text-sm text-text-secondary">
              {index + 1}. {exercise.name} - {exercise.sets}x{exercise.reps}
            </div>
          ))}
          {workout.exercises.length > 3 && (
            <div className="text-sm text-accent">
              +{workout.exercises.length - 3} more exercises
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{formatNumber(workout.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{formatNumber(workout.remixCount)} remixes</span>
            </div>
          </div>
          <button className="btn-accent text-sm px-4 py-2">
            Start Workout
          </button>
        </div>
      )}
    </div>
  );
}
