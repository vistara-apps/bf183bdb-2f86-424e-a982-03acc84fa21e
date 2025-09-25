'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { GameThemeSelector } from '../components/GameThemeSelector';
import { ExerciseCard } from '../components/ExerciseCard';
import { SAMPLE_EXERCISES } from '@/lib/constants';
import { WorkoutPlan, Exercise, GameTheme, FitnessLevel } from '@/lib/types';
import { generateWorkoutId, generateExerciseId } from '@/lib/utils';
import { Plus, Save, Trash2, Edit } from 'lucide-react';

export default function CreateWorkoutPage() {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<GameTheme>('RPG');
  const [selectedDifficulty, setSelectedDifficulty] = useState<FitnessLevel>('Beginner');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const handleAddExercise = (exercise: Exercise) => {
    const newExercise = {
      ...exercise,
      exerciseId: generateExerciseId(),
    };
    setExercises([...exercises, newExercise]);
    setShowExerciseLibrary(false);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.exerciseId !== exerciseId));
  };

  const handleSaveWorkout = () => {
    if (!workoutName.trim() || exercises.length === 0) {
      alert('Please add a workout name and at least one exercise');
      return;
    }

    const newWorkout: WorkoutPlan = {
      planId: generateWorkoutId(),
      creatorUserId: 'current-user', // In real app, get from auth
      name: workoutName,
      description: workoutDescription,
      exercises,
      gameTheme: selectedTheme,
      difficulty: selectedDifficulty,
      createdAt: new Date(),
      likes: 0,
      remixCount: 0,
      estimatedDuration: exercises.reduce((total, ex) => {
        const exerciseTime = (ex.duration || (ex.reps * 3)) + ex.rest;
        return total + (exerciseTime * ex.sets / 60);
      }, 0)
    };

    console.log('Saving workout:', newWorkout);
    alert('Workout saved successfully! +25 XP earned');
    
    // Reset form
    setWorkoutName('');
    setWorkoutDescription('');
    setExercises([]);
  };

  const estimatedDuration = exercises.reduce((total, ex) => {
    const exerciseTime = (ex.duration || (ex.reps * 3)) + ex.rest;
    return total + (exerciseTime * ex.sets / 60);
  }, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg mb-2 flex items-center justify-center">
            <Edit className="w-6 h-6 text-accent mr-2" />
            Create Custom Workout
          </h1>
          <p className="text-text-secondary">Design your own game-themed fitness routine</p>
        </div>

        {/* Workout Details Form */}
        <div className="glass-card p-6 rounded-xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Workout Name</label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g., Epic RPG Hero Training"
              className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-fg placeholder-text-secondary focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg mb-2">Description</label>
            <textarea
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
              placeholder="Describe your workout and its inspiration..."
              rows={3}
              className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-fg placeholder-text-secondary focus:border-accent focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-fg mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as FitnessLevel)}
                className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-fg focus:border-accent focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fg mb-2">Estimated Duration</label>
              <div className="px-4 py-3 bg-surface border border-gray-600 rounded-lg text-text-secondary">
                {Math.round(estimatedDuration)} minutes
              </div>
            </div>
          </div>
        </div>

        {/* Game Theme Selection */}
        <div className="glass-card p-6 rounded-xl">
          <GameThemeSelector
            selectedTheme={selectedTheme}
            onThemeSelect={setSelectedTheme}
          />
        </div>

        {/* Exercises Section */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-fg">Exercises ({exercises.length})</h3>
            <button
              onClick={() => setShowExerciseLibrary(true)}
              className="btn-accent flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exercise</span>
            </button>
          </div>

          {exercises.length > 0 ? (
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.exerciseId} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={() => handleRemoveExercise(exercise.exerciseId)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <ExerciseCard
                    exercise={exercise}
                    showCompleteButton={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">
              <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No exercises added yet. Click "Add Exercise" to get started!</p>
            </div>
          )}
        </div>

        {/* Exercise Library Modal */}
        {showExerciseLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-fg">Exercise Library</h3>
                <button
                  onClick={() => setShowExerciseLibrary(false)}
                  className="text-text-secondary hover:text-fg"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                {SAMPLE_EXERCISES.map((exercise) => (
                  <button
                    key={exercise.exerciseId}
                    onClick={() => handleAddExercise(exercise)}
                    className="w-full text-left p-3 bg-bg rounded-lg hover:bg-opacity-80 transition-all duration-200"
                  >
                    <div className="font-medium text-fg">{exercise.name}</div>
                    <div className="text-sm text-text-secondary">{exercise.description}</div>
                    <div className="text-xs text-accent mt-1">
                      {exercise.sets}×{exercise.reps} • {exercise.rest}s rest
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSaveWorkout}
          disabled={!workoutName.trim() || exercises.length === 0}
          className="w-full btn-primary flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>Save Workout (+25 XP)</span>
        </button>
      </div>
    </AppShell>
  );
}
