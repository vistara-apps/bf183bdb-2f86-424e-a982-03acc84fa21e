'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { WorkoutCard } from '../components/WorkoutCard';
import { GameThemeSelector } from '../components/GameThemeSelector';
import { SAMPLE_WORKOUTS, GAME_THEMES } from '@/lib/constants';
import { WorkoutPlan, GameTheme, FitnessLevel } from '@/lib/types';
import { Search, Filter, Gamepad2 } from 'lucide-react';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutPlan[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<GameTheme | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<FitnessLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load workouts (in real app, this would be from API)
    const allWorkouts = [...SAMPLE_WORKOUTS];
    setWorkouts(allWorkouts);
    setFilteredWorkouts(allWorkouts);
  }, []);

  useEffect(() => {
    // Filter workouts based on selected criteria
    let filtered = workouts;

    if (selectedTheme !== 'all') {
      filtered = filtered.filter(workout => workout.gameTheme === selectedTheme);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(workout => workout.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredWorkouts(filtered);
  }, [workouts, selectedTheme, selectedDifficulty, searchQuery]);

  const handleWorkoutSelect = (workout: WorkoutPlan) => {
    console.log('Selected workout:', workout.name);
    // Navigate to workout detail
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg mb-2 flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-accent mr-2" />
            Game-Themed Workouts
          </h1>
          <p className="text-text-secondary">Discover workouts inspired by your favorite games</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-600 rounded-lg text-fg placeholder-text-secondary focus:border-accent focus:outline-none"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-accent hover:text-accent-dark"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="glass-card p-6 rounded-xl space-y-6">
            {/* Game Theme Filter */}
            <div>
              <h3 className="text-lg font-semibold text-fg mb-3">Game Theme</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTheme('all')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTheme === 'all'
                      ? 'bg-accent text-bg'
                      : 'bg-surface text-text-secondary hover:text-fg'
                  }`}
                >
                  All Themes
                </button>
                {GAME_THEMES.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setSelectedTheme(theme.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTheme === theme.value
                        ? 'bg-accent text-bg'
                        : 'bg-surface text-text-secondary hover:text-fg'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-lg font-semibold text-fg mb-3">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty as FitnessLevel | 'all')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedDifficulty === difficulty
                        ? 'bg-accent text-bg'
                        : 'bg-surface text-text-secondary hover:text-fg'
                    }`}
                  >
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workout List */}
        <div className="space-y-4">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.planId}
                workout={workout}
                onSelect={handleWorkoutSelect}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-fg mb-2">No workouts found</h3>
              <p className="text-text-secondary">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
