'use client';

import { ReactNode } from 'react';
import { Gamepad2, User, Trophy, Plus, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/workouts', icon: Gamepad2, label: 'Workouts' },
    { href: '/create', icon: Plus, label: 'Create' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-gray-700 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-blue-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-bg" />
            </div>
            <h1 className="text-xl font-bold text-gradient">GamerFit Nexus</h1>
          </div>
          <div className="text-sm text-text-secondary">
            Level Up Your Fitness
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-card border-t border-gray-700 px-4 py-2 sticky bottom-0">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-around">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent bg-opacity-10'
                      : 'text-text-secondary hover:text-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
