'use client';

import { useState } from 'react';
import { Share2, MessageCircle, Twitter, Copy } from 'lucide-react';
import { shareContent, ShareOptions } from '@/lib/social';

interface ShareButtonProps {
  options: ShareOptions;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ShareButton({
  options,
  variant = 'secondary',
  size = 'md',
  className = ''
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (platform: ShareOptions['platform']) => {
    setIsSharing(true);
    try {
      shareContent({ ...options, platform });
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = `inline-flex items-center space-x-2 rounded-lg font-medium transition-all duration-200 ${
    variant === 'primary'
      ? 'bg-accent hover:bg-opacity-90 text-bg'
      : variant === 'secondary'
      ? 'bg-surface hover:bg-opacity-80 text-fg border border-gray-600'
      : 'p-2 hover:bg-surface rounded-lg'
  } ${sizeClasses[size]} ${className}`;

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={() => handleShare('generic')}
          disabled={isSharing}
          className={baseClasses}
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => handleShare('generic')}
        disabled={isSharing}
        className={baseClasses}
      >
        {isSharing ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        <span>Share</span>
      </button>

      {/* Share Options Dropdown (could be expanded) */}
      <div className="absolute top-full mt-2 right-0 bg-surface border border-gray-600 rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <button
          onClick={() => handleShare('farcaster')}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-700 rounded"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Farcaster</span>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-700 rounded"
        >
          <Twitter className="w-4 h-4" />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleShare('generic')}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-700 rounded"
        >
          <Copy className="w-4 h-4" />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
}

// Quick share buttons for common actions
export function ShareWorkoutButton({ workout }: { workout: any }) {
  return (
    <ShareButton
      options={{
        platform: 'farcaster',
        workout,
      }}
      variant="secondary"
      size="sm"
    />
  );
}

export function ShareAchievementButton({ achievement }: { achievement: string }) {
  return (
    <ShareButton
      options={{
        platform: 'farcaster',
        achievement,
      }}
      variant="secondary"
      size="sm"
    />
  );
}

