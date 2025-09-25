import { WorkoutPlan } from './types';

export interface ShareOptions {
  platform: 'farcaster' | 'twitter' | 'generic';
  workout?: WorkoutPlan;
  achievement?: string;
  challenge?: string;
  customMessage?: string;
}

export function generateShareMessage(options: ShareOptions): string {
  const { workout, achievement, challenge, customMessage } = options;

  if (customMessage) {
    return customMessage;
  }

  if (workout) {
    return `🎮 Just completed "${workout.name}" in GamerFit Nexus! Leveling up my fitness game. Join me at gamerfit.app #GamerFit #FitnessGaming`;
  }

  if (achievement) {
    return `🏆 Unlocked "${achievement}" achievement in GamerFit Nexus! Turning gaming sessions into epic fitness quests. #GamerFit #Achievements`;
  }

  if (challenge) {
    return `⚔️ Joined "${challenge}" in GamerFit Nexus! Who else is ready to level up their fitness? #GamerFit #FitnessChallenge`;
  }

  return `🎯 Leveling up my fitness with GamerFit Nexus! Game-themed workouts that actually work. Check it out! #GamerFit #FitnessGaming`;
}

export function shareToFarcaster(options: ShareOptions): void {
  const message = generateShareMessage(options);

  // In a real implementation, this would integrate with Farcaster's API
  // For now, we'll use a generic share or log the message
  if (navigator.share) {
    navigator.share({
      title: 'GamerFit Nexus',
      text: message,
      url: window.location.origin,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${message} ${window.location.origin}`);
    alert('Share message copied to clipboard!');
  }
}

export function shareToTwitter(options: ShareOptions): void {
  const message = generateShareMessage(options);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.origin)}`;

  window.open(url, '_blank', 'width=550,height=420');
}

export function shareGeneric(options: ShareOptions): void {
  const message = generateShareMessage(options);

  if (navigator.share) {
    navigator.share({
      title: 'GamerFit Nexus',
      text: message,
      url: window.location.origin,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${message} ${window.location.origin}`);
    alert('Share message copied to clipboard!');
  }
}

export function shareContent(options: ShareOptions): void {
  switch (options.platform) {
    case 'farcaster':
      shareToFarcaster(options);
      break;
    case 'twitter':
      shareToTwitter(options);
      break;
    case 'generic':
    default:
      shareGeneric(options);
      break;
  }
}

// Achievement sharing helpers
export function shareAchievement(achievementName: string): void {
  shareContent({
    platform: 'farcaster',
    achievement: achievementName,
  });
}

export function shareWorkoutCompletion(workout: WorkoutPlan): void {
  shareContent({
    platform: 'farcaster',
    workout,
  });
}

export function shareChallengeJoin(challengeName: string): void {
  shareContent({
    platform: 'farcaster',
    challenge: challengeName,
  });
}

