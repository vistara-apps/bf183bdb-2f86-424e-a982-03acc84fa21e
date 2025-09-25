'use client';

import { useState, useEffect, useCallback } from 'react';
import { Exercise } from '@/lib/types';
import { Play, Pause, SkipForward, CheckCircle } from 'lucide-react';

interface ExerciseTimerProps {
  exercise: Exercise;
  onComplete: () => void;
  onSkip: () => void;
  isActive: boolean;
}

export function ExerciseTimer({ exercise, onComplete, onSkip, isActive }: ExerciseTimerProps) {
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSets, setCompletedSets] = useState<Set<number>>(new Set());

  const isLastSet = currentSet === exercise.sets;
  const hasDuration = exercise.duration !== undefined;

  // Initialize timer based on exercise type
  useEffect(() => {
    if (hasDuration && !isResting) {
      setTimeLeft(exercise.duration!);
    } else if (isResting) {
      setTimeLeft(exercise.rest);
    }
  }, [exercise, hasDuration, isResting]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer finished
            if (isResting) {
              // Rest finished, move to next set or complete
              setIsResting(false);
              if (isLastSet) {
                onComplete();
              } else {
                setCurrentSet(prev => prev + 1);
              }
            } else {
              // Exercise finished, start rest
              setIsResting(true);
              setCompletedSets(prev => new Set([...prev, currentSet]));
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isActive, timeLeft, isResting, isLastSet, currentSet, onComplete]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const completeSet = () => {
    if (!isResting) {
      setCompletedSets(prev => new Set([...prev, currentSet]));
      if (isLastSet) {
        onComplete();
      } else {
        setIsResting(true);
        setTimeLeft(exercise.rest);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    if (!hasDuration && !isResting) return 0;

    const totalTime = isResting ? exercise.rest : (exercise.duration || 0);
    if (totalTime === 0) return 0;

    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Set Progress */}
      <div className="flex items-center justify-center space-x-2">
        {Array.from({ length: exercise.sets }, (_, i) => (
          <div
            key={i + 1}
            className={`w-3 h-3 rounded-full transition-colors ${
              completedSets.has(i + 1)
                ? 'bg-accent'
                : i + 1 === currentSet && !isResting
                ? 'bg-accent animate-pulse'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Timer Display */}
      {(hasDuration || isResting) && (
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                className="text-accent transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-fg">{formatTime(timeLeft)}</div>
                <div className="text-sm text-text-secondary">
                  {isResting ? 'Rest' : 'Exercise'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Set Info */}
      <div className="text-center">
        <div className="text-lg font-semibold text-fg">
          Set {currentSet} of {exercise.sets}
        </div>
        <div className="text-text-secondary">
          {isResting ? 'Rest between sets' : hasDuration ? 'Hold the position' : 'Complete the reps'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-3">
        {!isTimerRunning ? (
          <button
            onClick={startTimer}
            disabled={!isActive}
            className="flex-1 btn-primary py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Play className="w-5 h-5" />
            <span>{isResting ? 'Start Rest' : 'Start'}</span>
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex-1 btn-secondary py-4 flex items-center justify-center space-x-2"
          >
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </button>
        )}

        {!isResting && (
          <button
            onClick={completeSet}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Complete</span>
          </button>
        )}

        <button
          onClick={onSkip}
          className="px-4 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-text-secondary">
        {!hasDuration && !isResting && (
          <p>Complete {exercise.reps} reps, then tap "Complete" to finish the set</p>
        )}
        {hasDuration && !isResting && (
          <p>Hold the position for {exercise.duration} seconds</p>
        )}
        {isResting && (
          <p>Rest for {exercise.rest} seconds before the next set</p>
        )}
      </div>
    </div>
  );
}

