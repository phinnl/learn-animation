'use client';

import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { tours } from './tours';

export function TourCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  return (
    <div>
      <section ref={containerRef} className="mt-[50vh]">
        {tours.map((tour, index) => (
          <TourCard
            key={index}
            index={index}
            {...tour}
            progress={scrollYProgress}
            startRange={index * 0.1}
            targetScale={1 - (tours.length - index) * 0.05}
          />
        ))}
      </section>
      <div className="h-screen bg-amber-200"></div>
    </div>
  );
}

type TourCardProps = (typeof tours)[0] & {
  index: number;
  progress: MotionValue<number>;
  startRange: number;
  targetScale: number;
};

const TourCard = (props: TourCardProps) => {
  const {
    name,
    country,
    description,
    image,
    weather,
    local_time,
    index,
    startRange,
    targetScale,
    progress,
  } = props;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scaleCard = useTransform(progress, [startRange, 1], [1, targetScale]);
  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  return (
    <motion.article
      className="sticky h-screen flex items-center justify-center"
      style={{
        top: `calc(-10% + ${index * 25}px)`,
        scale: scaleCard,
      }}
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-[700px] aspect-video relative flex items-end">
        <motion.div
          ref={containerRef}
          className="h-full w-full absolute inset-0"
          style={{
            opacity: scrollYProgress,
            scale,
          }}
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </motion.div>

        <div className="p-4 flex flex-col gap-3 z-10 relative w-full">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold leading-tight">
                {name}, {country}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold text-xs">
                  4 ngày • 3 đêm
                </span>
                <span>Khởi hành từ HN</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-sm text-gray-500">
              <span>
                {weather.temperature} °C, {weather.condition}
              </span>
              <span>{local_time} KST</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-snug">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-white to-slate-50 shadow-md grid place-items-center font-bold text-gray-900 text-sm">
                ★
              </div>
              <div>
                <div className="font-bold">Từ 8.900.000₫</div>
                <div className="text-xs text-gray-500">
                  Bao gồm KS + hướng dẫn
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
