import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Statement = () => {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useGSAP(() => {
    // Parallax speed offset on each line when scrolling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    });

    tl.to(line1Ref.current, { xPercent: -8, ease: 'none' }, 0);
    tl.to(line2Ref.current, { xPercent: 5, ease: 'none' }, 0);
    tl.to(line3Ref.current, { xPercent: -10, ease: 'none' }, 0);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full py-32 md:py-48 px-6 md:px-12 bg-[#111111] text-[#F5F1E8] overflow-hidden select-none relative"
    >
      {/* Background graphic subtle lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-4 text-center md:text-left relative z-10">
        
        {/* Line 1 */}
        <div ref={line1Ref} className="will-change-transform">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#F5F1E8] uppercase leading-[0.9]">
            Good design
          </h2>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref} className="will-change-transform md:pl-16">
          <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white/50 uppercase leading-[0.9]">
            gets attention.
          </h3>
        </div>

        {/* Line 3 with Serif Italic Accent */}
        <div ref={line3Ref} className="will-change-transform md:pl-32 pt-2">
          <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[130px] font-bold text-[#F5F1E8] leading-[0.85]">
            Good development <br />
            <span className="font-editorial italic font-normal text-6xl sm:text-8xl md:text-[140px] text-[#EBE5D9] lowercase">
              keeps it.
            </span>
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Statement;
