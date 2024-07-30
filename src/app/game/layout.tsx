import { Suspense } from 'react';
import '../globals.css';
import Tracker from '@/src/components/tracker';
import { GoogleAnalytics } from 'nextjs-google-analytics';

export const metadata = {
  title: 'Game',
  description: 'Rogen AI - AI powered roguelike game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics trackPageViews />
        <Tracker />
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
