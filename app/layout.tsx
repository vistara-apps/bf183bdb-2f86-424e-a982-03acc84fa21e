import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GamerFit Nexus - Level Up Your Fitness',
  description: 'A mobile/web app for gamers to discover, create, and share personalized, game-themed workout plans.',
  keywords: ['fitness', 'gaming', 'workout', 'base', 'miniapp'],
  openGraph: {
    title: 'GamerFit Nexus',
    description: 'Level Up Your Fitness, Game On.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
