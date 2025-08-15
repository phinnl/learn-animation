'use client';

import { Lenis } from 'lenis/react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useEffect, useRef } from 'react';

const frameCount = 574; // Số frame ảnh
const images = Array.from(
  { length: frameCount },
  (_, i) => `/images/frame_${String(i + 1).padStart(4, '0')}.jpg`
);

export default function ScrollVideo() {
  const { scrollYProgress } = useScroll();
  const imageCache = useRef<Record<number, HTMLImageElement>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    const img = imageCache.current[index];

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  // Map scroll progress -> frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const current = Math.floor(latest);
    const buffer = 5; // load trước/sau 5 frame

    // Load ảnh trong buffer
    for (
      let f = Math.max(0, current - buffer);
      f <= Math.min(frameCount - 1, current + buffer);
      f++
    ) {
      if (!imageCache.current[f]) {
        const img = new Image();
        img.src = images[f];
        img.onload = () => {
          imageCache.current[f] = img;
          if (f === current) drawFrame(f); // Vẽ khi ảnh hiện tại load xong
        };
      }
    }

    // Nếu frame hiện tại đã cache thì vẽ ngay
    if (imageCache.current[current]) {
      drawFrame(current);
    }
  });

  useEffect(() => {
    // Lấy frame hiện tại khi vừa mount
    const current = Math.floor(frameIndex.get());
    const buffer = 5;

    // Load ảnh trong buffer quanh vị trí hiện tại
    for (
      let f = Math.max(0, current - buffer);
      f <= Math.min(frameCount - 1, current + buffer);
      f++
    ) {
      if (!imageCache.current[f]) {
        const img = new Image();
        img.src = images[f];
        img.onload = () => {
          imageCache.current[f] = img;
          if (f === current) drawFrame(f);
        };
      }
    }
  }, []);

  return (
    <Lenis root options={{ lerp: 0.1 }}>
      <div style={{ height: '450vh', background: '#000' }}>
        <motion.div
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            style={{ width: '100%', height: 'auto' }}
          />
        </motion.div>
      </div>
    </Lenis>
  );
}
