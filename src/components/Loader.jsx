import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const dkRef = useRef(null);
  const subtitleRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Step 1: DK logo mask reveal up
      tl.fromTo(
        dkRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      // Step 2: Subtitle text reveal & progress bar expand
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      )
      .to(
        barRef.current,
        { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
        '-=0.4'
      )
      // Step 3: Fast smooth exit lift
      .to([dkRef.current, subtitleRef.current, barRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.2
      })
      .to(containerRef.current, {
        y: '-100%',
        duration: 0.7,
        ease: 'expo.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#EBE5D9] text-[#111111] pointer-events-auto select-none"
    >
      <div className="overflow-hidden mb-2">
        <h1
          ref={dkRef}
          className="font-serif text-6xl md:text-8xl font-bold tracking-tighter"
        >
          DK.
        </h1>
      </div>

      <div className="overflow-hidden">
        <p
          ref={subtitleRef}
          className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[#65635F]"
        >
          Dhruv Kalathiya — Full-Stack Developer
        </p>
      </div>

      <div className="w-32 h-[1.5px] bg-[#111111]/15 mt-6 overflow-hidden relative rounded-full">
        <div
          ref={barRef}
          className="absolute inset-0 bg-[#111111] origin-left scale-x-0"
        />
      </div>
    </div>
  );
};

export default Loader;
