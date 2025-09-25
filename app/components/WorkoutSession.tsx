'use client';

import { useState, useEffect, useCallback } from 'react';
import { WorkoutPlan, Exercise } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { ExerciseTimer } from './ExerciseTimer';
import { formatDuration } from '@/lib/utils';
import { CheckCircle, Play, Pause, RotateCcw, Trophy, Zap } from 'lucide-react';

interface WorkoutSessionProps {
  workout: WorkoutPlan;
}

export function WorkoutSession({ workout }: WorkoutSessionProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  const { completeExercise, completeWorkout, addXP } = useAppStore();

  const currentExercise = workout.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === workout.exercises.length - 1;

  // Timer for total workout time
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWorkoutActive && workoutStartTime) {
      interval = setInterval(() => {
        setTotalElapsedTime(Date.now() - workoutStartTime.getTime());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkoutActive, workoutStartTime]);

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setWorkoutStartTime(new Date());
  };

  const pauseWorkout = () => {
    setIsWorkoutActive(false);
  };

  const resumeWorkout = () => {
    setIsWorkoutActive(true);
  };

  const resetWorkout = () => {
    setCurrentExerciseIndex(0);
    setCompletedExercises(new Set());
    setIsWorkoutActive(false);
    setWorkoutStartTime(null);
    setTotalElapsedTime(0);
    setIsWorkoutComplete(false);
  };

  const handleExerciseComplete = useCallback(() => {
    if (!currentExercise) return;

    // Mark exercise as completed
    const newCompleted = new Set(completedExercises);
    newCompleted.add(currentExercise.exerciseId);
    setCompletedExercises(newCompleted);

    // Award XP for completing exercise
    completeExercise(workout.planId, currentExercise.exerciseId);

    // Move to next exercise or complete workout
    if (isLastExercise) {
      // Workout complete!
      setIsWorkoutComplete(true);
      setIsWorkoutActive(false);
      completeWorkout(workout.planId);

      // Bonus XP for completing full workout
      addXP(50);
    } else {
      // Move to next exercise
      setCurrentExerciseIndex(prev => prev + 1);
    }
  }, [currentExercise, completedExercises, isLastExercise, workout.planId, completeExercise, completeWorkout, addXP]);

  const skipExercise = () => {
    if (isLastExercise) {
      handleExerciseComplete();
    } else {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  if (isWorkoutComplete) {
    return (
      <div className="glass-card p-8 rounded-xl text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-accent to-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <Trophy className="w-10 h-10 text-bg" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Workout Complete!</h2>
          <p className="text-text-secondary">Great job leveling up your fitness!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card text-center">
            <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{workout.exercises.length}</div>
            <div className="text-sm text-text-secondary">Exercises</div>
          </div>

          <div className="metric-card text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-fg">{formatDuration(totalElapsedTime / 1000)}</div>
            <div className="text-sm text-text-secondary">Total Time</div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={resetWorkout}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Do It Again</span>
          </button>

          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Share Achievement</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isWorkoutActive) {
    return (
      <div className="space-y-6">
        {/* Workout Overview */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-fg mb-4">Workout Overview</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{workout.exercises.length}</div>
              <div className="text-sm text-text-secondary">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{formatDuration(workout.estimatedDuration)}</div>
              <div className="text-sm text-text-secondary">Estimated Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-fg">Exercises:</h4>
            {workout.exercises.map((exercise, index) => (
              <div key={exercise.exerciseId} className="flex items-center space-x-3 p-3 bg-surface bg-opacity-60 rounded-lg">
                <div className="w-8 h-8 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-fg">{exercise.name}</div>
                  <div className="text-sm text-text-secondary">
                    {exercise.sets}×{exercise.reps}
                    {exercise.duration && ` • ${exercise.duration}s`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startWorkout}
          className="w-full btn-primary py-6 text-lg font-semibold flex items-center justify-center space-x-3"
        >
          <Play className="w-6 h-6" />
          <span>Start Workout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-fg">Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</h3>
            <p className="text-text-secondary">{formatDuration(totalElapsedTime / 1000)} elapsed</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={pauseWorkout}
              className="p-2 bg-surface hover:bg-opacity-80 rounded-lg transition-colors"
            >
              <Pause className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-accent to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Exercise */}
      <div className="glass-card p-6 rounded-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-fg mb-2">{currentExercise.name}</h2>
          <p className="text-text-secondary">{currentExercise.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-accent">{currentExercise.sets}</div>
            <div className="text-sm text-text-secondary">Sets</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-accent">{currentExercise.reps}</div>
            <div className="text-sm text-text-secondary">Reps</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-accent">{currentExercise.rest}s</div>
            <div className="text-sm text-text-secondary">Rest</div>
          </div>
        </div>

        {/* Exercise Timer */}
        <ExerciseTimer
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          onSkip={skipExercise}
          isActive={isWorkoutActive}
        />
      </div>

      {/* Pause/Resume Controls */}
      <div className="flex space-x-4">
        <button
          onClick={pauseWorkout}
          className="flex-1 btn-secondary py-4 flex items-center justify-center space-x-2"
        >
          <Pause className="w-5 h-5" />
          <span>Pause</span>
        </button>

        <button
          onClick={resetWorkout}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

