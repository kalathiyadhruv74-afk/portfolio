import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    // Animate giant DHRUV background text horizontally on footer scroll
    gsap.to(bgTextRef.current, {
      xPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.5,
      }
    });
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-20 pb-12 px-6 md:px-12 bg-[#EBE5D9] text-[#111111] overflow-hidden select-none"
    >
      {/* Giant Decorative Outlined Serif Background Text */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-20 overflow-hidden whitespace-nowrap">
        <h1
          ref={bgTextRef}
          className="font-serif-display text-[160px] sm:text-[240px] md:text-[340px] font-bold text-outline-dark tracking-tighter leading-none translate-x-10 will-change-transform"
        >
          DHRUV KALATHIYA
        </h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Main Footer Layout Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#111111]/15 pb-12">
          
          {/* Left Logo */}
          <div className="md:col-span-4 space-y-2">
            <Link
              to="/"
              className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-[#111111] inline-block"
              data-cursor="hover"
            >
              DK.
            </Link>
            <p className="text-xs font-mono text-[#65635F]">
              Dhruv Kalathiya — Portfolio
            </p>
          </div>

          {/* Center Details */}
          <div className="md:col-span-4 text-left md:text-center space-y-1">
            <span className="text-xs font-mono tracking-[0.25em] font-semibold text-[#111111] uppercase block">
              FULL-STACK DEVELOPER
            </span>
            <span className="text-xs font-mono text-[#65635F] block">
              Specialized in React, Python & Django REST
            </span>
          </div>

          {/* Right Location & Back to Top */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end space-x-6">
            <div className="text-left md:text-right">
              <span className="text-xs font-mono tracking-[0.2em] font-semibold text-[#111111] uppercase block">
                SURAT, INDIA
              </span>
              <span className="text-[11px] font-mono text-[#65635F]">
                Available Worldwide
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-[#111111] text-[#F5F1E8] text-xs font-mono tracking-widest uppercase rounded-full hover:bg-[#65635F] transition-all duration-300 group"
              data-cursor="hover"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#65635F] space-y-4 sm:space-y-0">
          <p>© 2026 DHRUV KALATHIYA. ALL RIGHTS RESERVED.</p>
          <p className="tracking-wider uppercase">
            DESIGNED & DEVELOPED BY DHRUV KALATHIYA
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
