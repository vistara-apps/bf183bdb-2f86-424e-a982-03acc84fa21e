'use client';

import { AppShell } from '../components/AppShell';
import { UserProfile } from '../components/UserProfile';
import { Settings2, Share2, Award, BarChart3 } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'default', label: 'Gaming (Default)', description: 'Cyberpunk neon theme' },
    { value: 'celo', label: 'Celo', description: 'Black & yellow theme' },
    { value: 'solana', label: 'Solana', description: 'Purple gradient theme' },
    { value: 'base', label: 'Base', description: 'Blue blockchain theme' },
    { value: 'coinbase', label: 'Coinbase', description: 'Navy professional theme' },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg mb-2">Your Profile</h1>
          <p className="text-text-secondary">Track your fitness gaming journey</p>
        </div>

        {/* User Profile */}
        <UserProfile />

        {/* Quick Stats */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-accent mr-2" />
            This Week's Activity
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-text-secondary">Workouts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">420</div>
              <div className="text-sm text-text-secondary">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">85</div>
              <div className="text-sm text-text-secondary">Minutes</div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
            <Settings2 className="w-5 h-5 text-accent mr-2" />
            App Theme
          </h3>
          
          <div className="space-y-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value as any)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  theme === themeOption.value
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-fg">{themeOption.label}</div>
                <div className="text-sm text-text-secondary">{themeOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sharing */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
            <Share2 className="w-5 h-5 text-accent mr-2" />
            Share Your Progress
          </h3>
          
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share on Farcaster</span>
            </button>
            
            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Share Achievement</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
            <Settings2 className="w-5 h-5 text-accent mr-2" />
            Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-fg">Workout Reminders</div>
                <div className="text-sm text-text-secondary">Get notified about daily workouts</div>
              </div>
              <button className="w-12 h-6 bg-accent rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-fg">Social Sharing</div>
                <div className="text-sm text-text-secondary">Auto-share achievements</div>
              </div>
              <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-fg">Challenge Notifications</div>
                <div className="text-sm text-text-secondary">Get notified about new challenges</div>
              </div>
              <button className="w-12 h-6 bg-accent rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
