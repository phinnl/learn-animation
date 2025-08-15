'use client';

import { Lenis } from 'lenis/react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function SectionOverlapsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const scaleSection1 = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const rotateSection1 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const opacitySection1 = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const scaleSection2 = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const rotateSection2 = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <Lenis root options={{ lerp: 0.05 }}>
      <main className="relative bg-black" ref={containerRef}>
        <motion.section
          style={{
            scale: scaleSection1,
            rotate: rotateSection1,
            opacity: opacitySection1,
          }}
          className="h-screen bg-red-600 top-0 sticky flex items-center justify-center"
        >
          <h1 className="text-4xl text-white">Section 1</h1>
        </motion.section>
        <motion.section
          style={{
            scale: scaleSection2,
            rotate: rotateSection2,
            opacity: opacitySection2,
          }}
          className="h-screen bg-sky-600 flex items-center justify-center relative"
        >
          <h1 className="text-4xl text-white">Section 2</h1>
        </motion.section>
      </main>
    </Lenis>
  );
}
