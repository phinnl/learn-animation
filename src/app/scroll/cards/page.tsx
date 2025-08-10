'use client';

import { Lenis } from 'lenis/react';
import { TourCards } from './tour-cards';

export default function CardsPage() {
  return (
    <main>
      <Lenis root options={{ lerp: 0.05 }}>
        <TourCards />
      </Lenis>
    </main>
  );
}
