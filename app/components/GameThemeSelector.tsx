'use client';

import { GameTheme } from '@/lib/types';
import { GAME_THEMES } from '@/lib/constants';
import { getGameThemeColor } from '@/lib/utils';

interface GameThemeSelectorProps {
  selectedTheme?: GameTheme;
  onThemeSelect: (theme: GameTheme) => void;
}

export function GameThemeSelector({ selectedTheme, onThemeSelect }: GameThemeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-fg">Choose Your Game Theme</h3>
      <div className="grid grid-cols-2 gap-3">
        {GAME_THEMES.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onThemeSelect(theme.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedTheme === theme.value
                ? 'border-accent bg-accent bg-opacity-10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 bg-gradient-to-r ${getGameThemeColor(theme.value)} text-white`}>
              {theme.label}
            </div>
            <p className="text-sm text-text-secondary">{theme.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
