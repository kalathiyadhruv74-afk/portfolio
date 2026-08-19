import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import portraitImg from '../assets/portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const portraitRef = useRef(null);
  const metaRef = useRef(null);
  const bioRef = useRef(null);

  useGSAP(() => {
    // GSAP ScrollTrigger timeline for Hero parallax & line separation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      }
    });

    // Heading lines shift in opposite directions on scroll
    tl.to(titleLeftRef.current, {
      xPercent: -15,
      opacity: 0.4,
      ease: 'none'
    }, 0);

    tl.to(titleRightRef.current, {
      xPercent: 15,
      opacity: 0.4,
      ease: 'none'
    }, 0);

    // Portrait image lifts upward with parallax
    tl.to(portraitRef.current, {
      yPercent: -20,
      scale: 1.05,
      ease: 'none'
    }, 0);

    // Metadata and bio fade out slightly
    tl.to([metaRef.current, bioRef.current], {
      opacity: 0,
      y: -30,
      ease: 'none'
    }, 0);
  }, { scope: heroRef });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full pt-28 md:pt-36 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Top Metadata Bar */}
      <div
        ref={metaRef}
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#65635F] uppercase border-b border-[#111111]/10 pb-4"
      >
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
          <span>FULL-STACK DEVELOPER</span>
        </span>
        <span>SURAT, INDIA</span>
      </div>

      {/* Main Asymmetric Hero Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center relative py-8">
        
        {/* Left / Central Big Headline */}
        <div className="lg:col-span-8 z-10 space-y-2 md:space-y-4">
          <div ref={titleLeftRef} className="will-change-transform">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#111111] leading-[0.9]">
              Developer <span className="font-normal text-3xl sm:text-5xl md:text-6xl text-[#65635F]">by logic.</span>
            </h1>
          </div>

          <div ref={titleRightRef} className="will-change-transform pl-4 md:pl-16">
            <h2 className="font-editorial text-6xl sm:text-8xl md:text-[110px] lg:text-[130px] font-normal leading-[0.85] text-[#111111] capitalize">
              Designer <span className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl not-italic text-[#65635F]">by instinct.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Portrait Column */}
        <div className="lg:col-span-4 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
          <div
            ref={portraitRef}
            className="relative z-10 w-64 sm:w-72 md:w-80 aspect-[3/4] overflow-hidden rounded-sm border border-[#111111]/20 shadow-2xl bg-[#EBE5D9] group"
            data-cursor="view"
          >
            {/* Grayscale Portrait */}
            <img
              src={portraitImg}
              alt="Dhruv Kalathiya Portrait"
              className="relative z-10 w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            {/* Subtle editorial watermark label */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[9px] font-mono tracking-widest text-[#F5F1E8] mix-blend-difference uppercase">
              <span>DHRUV KALATHIYA</span>
              <span>2026 ISSUE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bio & CTAs */}
      <div
        ref={bioRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-6 border-t border-[#111111]/10"
      >
        {/* Name & Short Description */}
        <div className="md:col-span-8 space-y-2">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#111111]">
            Dhruv Kalathiya
          </h3>
          <p className="text-sm md:text-base text-[#65635F] max-w-2xl leading-relaxed font-normal">
            Full-Stack Web Developer and Computer Science Engineering student focused on building clean, functional and thoughtful digital products using modern frontend and backend technologies.
          </p>
        </div>

        {/* Minimal CTAs */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end space-x-6">
          <a
            href="#work"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] hover-underline-animation py-1"
            data-cursor="hover"
          >
            View My Work ↓
          </a>
          <a
            href="#contact"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] hover-underline-animation py-1"
            data-cursor="hover"
          >
            Let's Talk ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
