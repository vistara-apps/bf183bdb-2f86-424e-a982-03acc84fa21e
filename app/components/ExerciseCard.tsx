'use client';

import { Exercise } from '@/lib/types';
import { Clock, RotateCcw, Target } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
  onComplete?: (exerciseId: string) => void;
  showCompleteButton?: boolean;
}

export function ExerciseCard({ 
  exercise, 
  isCompleted = false, 
  onComplete, 
  showCompleteButton = true 
}: ExerciseCardProps) {
  const handleComplete = () => {
    if (onComplete) {
      onComplete(exercise.exerciseId);
    }
  };

  return (
    <div className={`exercise-item ${isCompleted ? 'border-accent bg-accent bg-opacity-10' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-fg mb-1">{exercise.name}</h4>
          <p className="text-sm text-text-secondary mb-3">{exercise.description}</p>
        </div>
        {isCompleted && (
          <div className="text-accent">
            <Target className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Exercise Details */}
      <div className="flex items-center space-x-6 text-sm text-text-secondary mb-4">
        <div className="flex items-center space-x-1">
          <Target className="w-4 h-4" />
          <span>{exercise.sets} sets × {exercise.reps} reps</span>
        </div>
        {exercise.duration && (
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(exercise.duration)}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <RotateCcw className="w-4 h-4" />
          <span>{exercise.rest}s rest</span>
        </div>
      </div>

      {/* Action Button */}
      {showCompleteButton && !isCompleted && (
        <button
          onClick={handleComplete}
          className="w-full btn-primary text-sm py-2"
        >
          Mark Complete (+10 XP)
        </button>
      )}

      {isCompleted && (
        <div className="text-center text-accent font-medium text-sm">
          ✓ Completed! +10 XP earned
        </div>
      )}
    </div>
  );
}
