'use client';

import { useTheme } from '../components/ThemeProvider';
import { Gamepad2, Trophy, Zap, Users } from 'lucide-react';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'default', label: 'Gaming (Default)' },
    { value: 'celo', label: 'Celo' },
    { value: 'solana', label: 'Solana' },
    { value: 'base', label: 'Base' },
    { value: 'coinbase', label: 'Coinbase' },
  ];

  return (
    <div className="min-h-screen bg-bg p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient mb-4">Theme Preview</h1>
          <p className="text-text-secondary">Preview different themes for GamerFit Nexus</p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-bold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  theme === themeOption.value
                    ? 'border-accent bg-accent bg-opacity-20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-fg text-sm">{themeOption.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Cards & Surfaces</h3>
            
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-bold text-fg mb-2">Glass Card</h4>
              <p className="text-text-secondary">This is a glass card with backdrop blur</p>
            </div>

            <div className="metric-card">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-fg">1,247</div>
                  <div className="text-sm text-text-secondary">Total Users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Buttons</h3>
            
            <div className="space-y-3">
              <button className="btn-primary w-full">Primary Button</button>
              <button className="btn-secondary w-full">Secondary Button</button>
              <button className="btn-accent w-full">Accent Button</button>
            </div>
          </div>

          {/* Progress & XP */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Progress Elements</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-fg">XP Progress</span>
                  <span className="text-accent">750/1000</span>
                </div>
                <div className="xp-bar h-3">
                  <div className="xp-fill" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="achievement-badge inline-block">
                Achievement Unlocked!
              </div>
            </div>
          </div>

          {/* Icons & Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-fg">Icons & Accents</h3>
            
            <div className="flex items-center space-x-6">
              <Gamepad2 className="w-8 h-8 text-accent" />
              <Trophy className="w-8 h-8 text-yellow-400" />
              <Zap className="w-8 h-8 text-accent" />
              <Users className="w-8 h-8 text-accent" />
            </div>

            <div className="text-gradient text-xl font-bold">
              Gradient Text Effect
            </div>
          </div>
        </div>

        {/* Workout Card Preview */}
        <div className="workout-card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  RPG
                </div>
                <span className="text-sm font-medium text-yellow-400">Intermediate</span>
              </div>
              <h3 className="text-lg font-bold text-fg mb-1">Epic Hero Training</h3>
              <p className="text-sm text-text-secondary">Build strength like a legendary hero preparing for the final boss</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>25m</span>
              <span>4 exercises</span>
              <span>42 likes</span>
            </div>
            <button className="btn-accent text-sm px-4 py-2">
              Start Workout
            </button>
          </div>
        </div>

        {/* Back to App */}
        <div className="text-center">
          <a
            href="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Back to GamerFit Nexus</span>
          </a>
        </div>
      </div>
    </div>
  );
}
