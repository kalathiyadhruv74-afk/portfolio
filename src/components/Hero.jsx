import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import portraitImg from '../assets/portrait.jpg';
import ParticleText from './ParticleText';
import Tilt3D from './Tilt3D';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const portraitRef = useRef(null);
  const metaRef = useRef(null);
  const bioRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      metaRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
    )
    .fromTo(
      titleLeftRef.current,
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1 },
      '-=0.5'
    )
    .fromTo(
      titleRightRef.current,
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1 },
      '-=0.8'
    )
    .fromTo(
      portraitRef.current,
      { scale: 0.85, opacity: 0, rotateY: 20 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 1.2 },
      '-=0.8'
    )
    .fromTo(
      bioRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[92vh] max-h-[1000px] pt-28 md:pt-36 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-transparent perspective-1000"
    >
      {/* Top Metadata Bar */}
      <div
        ref={metaRef}
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#A1A1AA] uppercase border-b border-white/10 pb-4"
      >
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#F5F1E8] animate-pulse" />
          <span>FULL-STACK DEVELOPER</span>
        </span>
        <span>SURAT, INDIA</span>
      </div>

      {/* Main Asymmetric Hero Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center relative py-8">
        
        {/* Left / Central Big Headline */}
        <div className="lg:col-span-8 z-10 space-y-2 md:space-y-4">
          <div ref={titleLeftRef} className="will-change-transform">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#F5F1E8] leading-[0.9]">
              Developer <span className="font-normal text-2xl sm:text-4xl md:text-6xl text-[#A1A1AA]">by logic.</span>
            </h1>
          </div>

          <div ref={titleRightRef} className="will-change-transform pl-2 sm:pl-4 md:pl-16">
            <h2 className="font-editorial text-5xl sm:text-7xl md:text-[100px] lg:text-[130px] font-normal leading-[0.85] text-[#F5F1E8] capitalize flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
              <ParticleText text="Designer" fontFamily="serif" fontStyle="italic" />
              <span className="font-sans font-bold text-3xl sm:text-5xl md:text-7xl not-italic text-[#A1A1AA] align-baseline">by instinct.</span>
            </h2>
          </div>
        </div>

        {/* Interactive Hanging Lanyard ID Badge Card */}
        <div className="lg:col-span-4 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          
          {/* Centered Lanyard + Badge Assembly */}
          <div className="flex flex-col items-center origin-top animate-float-slow">

            {/* Proper Full-Length Woven Fabric Lanyard Strap */}
            <div className="w-7 sm:w-8 h-36 sm:h-48 -mt-24 sm:-mt-32 bg-[#18181C] border-x-2 border-white/20 shadow-2xl relative z-0 flex flex-col items-center justify-center overflow-hidden rounded-t-sm">
              {/* Fabric Ribbed Canvas Pattern */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.06)_3px,rgba(255,255,255,0.06)_6px)]" />
              {/* Printed Lanyard Text */}
              <span className="[writing-mode:vertical-rl] text-[9px] font-mono tracking-[0.25em] text-[#F5F1E8]/75 select-none uppercase font-bold relative z-10 py-2">
                ✦ DHRUV KALATHIYA ✦ FULL-STACK DEV ✦
              </span>
            </div>

            {/* Metallic Silver Swivel Hook & Clasp Assembly */}
            <div className="relative z-20 flex flex-col items-center -my-3">
              {/* Metallic Strap Clamp */}
              <div className="w-8 h-3 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-xs border border-white/40 shadow-md" />
              {/* Swivel Loop Ring */}
              <div className="w-4 h-4 rounded-full border-2 border-slate-200 bg-slate-800 shadow-inner -my-1" />
              {/* Swivel Lobster Claw Hook */}
              <div className="w-3 h-5 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 rounded-sm border border-white/50 shadow-lg -my-0.5" />
            </div>

            {/* Hanging ID Badge Card Container with 3D Tilt */}
            <Tilt3D maxTilt={14} scale={1.03} className="glow-3d rounded-xl origin-top max-w-full">
              <div
                ref={portraitRef}
                className="relative z-10 w-[280px] sm:w-80 p-4 sm:p-5 bg-[#1E1E22] border border-white/20 rounded-xl shadow-2xl space-y-4 font-mono select-none group max-w-full"
                data-cursor="view"
              >
              {/* Top ID Badge Slot Cutout */}
              <div className="w-10 h-2.5 rounded-full bg-[#141416] border border-white/25 mx-auto shadow-inner" />

              {/* ID Badge Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] tracking-wider text-[#A1A1AA] uppercase">
                <span className="flex items-center space-x-1.5 font-bold text-[#F5F1E8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LJIET CS — BADGE</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px]">
                  ACTIVE ID
                </span>
              </div>

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-md border border-white/15 bg-[#141416] shadow-md group">
                <img
                  src={portraitImg}
                  alt="Dhruv Kalathiya ID Photo"
                  className="relative z-10 w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out translate-z-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/80 via-transparent to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 z-30 flex justify-between items-end text-[9px] font-mono tracking-widest text-[#F5F1E8] uppercase">
                  <span>SURAT, GUJARAT</span>
                  <span>ISSUE 2024-28</span>
                </div>
              </div>

              {/* ID Badge Details Breakdown */}
              <div className="space-y-1.5 text-left text-xs translate-z-30 pt-1">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-1">
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">MEMBER NAME</span>
                  <span className="font-bold text-[#F5F1E8] tracking-tight">DHRUV KALATHIYA</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/10 pb-1">
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">DESIGNATION</span>
                  <span className="font-semibold text-emerald-300 text-[11px]">FULL-STACK DEVELOPER</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">BADGE ID</span>
                  <span className="font-mono text-[11px] text-[#A1A1AA]">#DK-2026-CS</span>
                </div>
              </div>

              {/* Bottom Barcode Graphic Accent */}
              <div className="pt-2 border-t border-white/10 flex flex-col items-center space-y-1 translate-z-20 opacity-85">
                <div className="w-full h-7 bg-[repeating-linear-gradient(90deg,#F5F1E8,#F5F1E8_2px,transparent_2px,transparent_4px,#F5F1E8_4px,#F5F1E8_7px,transparent_7px,transparent_9px)] rounded-xs" />
                <span className="text-[9px] font-mono text-[#A1A1AA] tracking-[0.3em] uppercase">
                  082026-DK-LJIET-DEV
                </span>
              </div>

            </div>
          </Tilt3D>
        </div>
      </div>

      </div>

      {/* Bottom Bio & CTAs */}
      <div
        ref={bioRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-6 border-t border-white/10"
      >
        {/* Name & Short Description */}
        <div className="md:col-span-8 space-y-2">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#F5F1E8]">
            Dhruv Kalathiya
          </h3>
          <p className="text-sm md:text-base text-[#A1A1AA] max-w-2xl leading-relaxed font-normal">
            Full-Stack Web Developer and Computer Science Engineering student focused on building clean, functional and thoughtful digital products using modern frontend and backend technologies.
          </p>
        </div>

        {/* Minimal CTAs */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end space-x-6">
          <a
            href="#work"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F1E8] hover-underline-animation py-1"
            data-cursor="hover"
          >
            View My Work ↓
          </a>
          <a
            href="#contact"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F1E8] hover-underline-animation py-1"
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
