'use client';

import { Lenis } from 'lenis/react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useEffect, useState } from 'react';

const frameCount = 344; // Số frame ảnh
const images = Array.from(
  { length: frameCount },
  (_, i) => `/images/frame_${String(i + 1).padStart(4, '0')}.jpg`
);

export default function ScrollVideo() {
  const { scrollYProgress } = useScroll();
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [currentSrc, setCurrentSrc] = useState(images[0]);

  // Map scroll progress -> frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    setCurrentSrc(images[Math.floor(latest)]);
  });

  // Preload ảnh
  useEffect(() => {
    const imgElements = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    setLoadedImages(imgElements);
  }, []);

  return (
    <Lenis root options={{ lerp: 0.1 }}>
      <div style={{ height: '900vh', background: '#000' }}>
        <motion.div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          {loadedImages.length > 0 && (
            <motion.img
              src={currentSrc}
              alt="frame sequence"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              transition={{ duration: 0 }}
            />
          )}
        </motion.div>
      </div>
    </Lenis>
  );
}
