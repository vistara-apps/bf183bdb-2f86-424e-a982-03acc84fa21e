// Production optimizations and utilities

import { useCallback, useMemo } from 'react';

// Debounce utility for performance optimization
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const debouncedCallback = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), delay);
      };
    })(),
    [callback, delay]
  );

  return debouncedCallback as T;
}

// Throttle utility for performance optimization
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttledCallback = useCallback(
    (() => {
      let lastCall = 0;
      return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          callback(...args);
        }
      };
    })(),
    [callback, delay]
  );

  return throttledCallback as T;
}

// Memoized calculations for expensive operations
export function useMemoizedXP(level: number): number {
  return useMemo(() => {
    // Calculate XP required for level using geometric progression
    if (level <= 1) return 0;
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }, [level]);
}

export function useMemoizedLevel(xp: number): number {
  return useMemo(() => {
    let level = 1;
    let requiredXP = 0;

    while (requiredXP <= xp) {
      level++;
      requiredXP = Math.floor(100 * Math.pow(1.5, level - 1));
    }

    return level - 1;
  }, [xp]);
}

// Image optimization utilities
export function getOptimizedImageUrl(src: string, width: number, height?: number): string {
  // In a real app, this would integrate with an image CDN like Cloudinary or Next.js Image
  // For now, return the original URL
  return src;
}

// Bundle size optimization - lazy load heavy components
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(importFunc);
};

// Preload critical resources
export function preloadCriticalResources() {
  // Preload critical fonts, images, or data
  if (typeof window !== 'undefined') {
    // Preload web fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/fonts/inter.woff2';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}

// Performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const startTime = performance.now();

  return useCallback(() => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
    }

    // In production, you might want to send this to analytics
    if (process.env.NODE_ENV === 'production' && duration > 16.67) {
      // Log slow renders (> 1 frame at 60fps)
      console.warn(`Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`);
    }
  }, [componentName, startTime]);
}

// Memory optimization - cleanup utilities
export function useCleanupEffect(cleanup: () => void) {
  React.useEffect(() => {
    return cleanup;
  }, []);
}

// Cache utilities for expensive calculations
const calculationCache = new Map<string, any>();

export function useCachedCalculation<T>(
  key: string,
  calculation: () => T,
  dependencies: any[] = []
): T {
  return useMemo(() => {
    const cacheKey = `${key}-${JSON.stringify(dependencies)}`;

    if (calculationCache.has(cacheKey)) {
      return calculationCache.get(cacheKey);
    }

    const result = calculation();
    calculationCache.set(cacheKey, result);
    return result;
  }, dependencies);
}

// Error boundary with performance monitoring
export function useErrorTracking() {
  return useCallback((error: Error, errorInfo?: any) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', error, errorInfo);
    }

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: send to Sentry, LogRocket, etc.
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }
  }, []);
}

// Accessibility utilities
export function useFocusTrap(ref: React.RefObject<HTMLElement>) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const focusableElements = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }, [ref]);

  React.useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, ref]);
}

// SEO utilities
export function generateMetaTags({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      image,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
    },
  };
}

// Progressive Web App utilities
export function usePWASupport() {
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });
  }, []);

  const installPWA = useCallback(async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  }, [deferredPrompt]);

  return { isInstallable, installPWA };
}</content>
</xai:function_call">lib/optimizations.ts

