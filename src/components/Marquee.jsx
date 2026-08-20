import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  'REACT',
  'PYTHON',
  'DJANGO',
  'JAVASCRIPT',
  'NODE.JS',
  'MYSQL',
  'CREATIVE DEVELOPMENT',
  'REST APIS',
  'TAILWIND CSS',
  'FLASK',
];

const Marquee = () => {
  const marqueeContainerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Infinite marquee tween animation instance
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 25,
      repeat: -1,
    });

    ScrollTrigger.create({
      trigger: marqueeContainerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Dynamically adjust the tween's timeScale based on scroll direction
        if (self.getVelocity() !== 0) {
          gsap.to(tween, {
            timeScale: self.direction === 1 ? 1.5 : 0.8,
            duration: 0.5,
            overwrite: 'auto',
          });
        }
      },
    });
  }, { scope: marqueeContainerRef });

  return (
    <section
      ref={marqueeContainerRef}
      className="w-full py-6 md:py-8 bg-[#1E1E22] border-y border-white/10 overflow-hidden select-none"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <div ref={trackRef} className="flex space-x-8 md:space-x-12 items-center will-change-transform">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="font-serif-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-outline-light hover:text-[#F5F1E8] transition-colors duration-300">
                {item}
              </span>
              <span className="text-white/30 text-xl font-mono">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
