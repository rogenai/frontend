import { Suspense } from 'react';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (<>
      <Suspense>
        {children}
      </Suspense>
  </>)
}
