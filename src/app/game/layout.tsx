import { Suspense } from 'react';
import '../globals.css';

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
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
