import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GraduationCap, MapPin, Code2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const quoteLineRef = useRef(null);

  useGSAP(() => {
    // Animate second line of editorial quote on scroll
    gsap.fromTo(
      quoteLineRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteLineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 bg-transparent border-b border-[#111111]/15"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* Section Label */}
        <div className="flex items-center justify-between border-b border-[#111111]/15 pb-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#65635F] uppercase">
            01 / ABOUT
          </span>
          <span className="text-xs font-mono tracking-widest text-[#111111]">
            EST. 2024 — PRESENT
          </span>
        </div>

        {/* Headline & 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Headline Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
              Developer, <br />
              problem solver & <br />
              <span className="font-editorial font-normal italic text-5xl sm:text-7xl md:text-8xl text-[#65635F]">
                constant learner.
              </span>
            </h2>

            {/* Quick Fact Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 bg-[#EBE5D9]/60 border border-[#111111]/10 rounded-sm space-y-1">
                <div className="flex items-center space-x-2 text-xs text-[#65635F]">
                  <GraduationCap className="w-4 h-4 text-[#111111]" />
                  <span className="font-mono">EDUCATION</span>
                </div>
                <p className="text-sm font-semibold text-[#111111]">B.E. Computer Science</p>
                <p className="text-xs text-[#65635F]">LJIET (Exp. 2028)</p>
              </div>

              <div className="p-4 bg-[#EBE5D9]/60 border border-[#111111]/10 rounded-sm space-y-1">
                <div className="flex items-center space-x-2 text-xs text-[#65635F]">
                  <MapPin className="w-4 h-4 text-[#111111]" />
                  <span className="font-mono">LOCATION</span>
                </div>
                <p className="text-sm font-semibold text-[#111111]">Surat, Gujarat</p>
                <p className="text-xs text-[#65635F]">India</p>
              </div>
            </div>
          </div>

          {/* Description Paragraphs Column */}
          <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-[#65635F] leading-relaxed pt-2">
            <p className="text-[#111111] font-medium text-lg sm:text-xl">
              Dhruv Kalathiya is a Full-Stack Web Developer and Computer Science Engineering student at LJIET, focused on building practical web applications that combine thoughtful interfaces with reliable backend systems.
            </p>
            <p>
              He works across frontend and backend technologies including React, JavaScript, Python, Django, Flask, Node.js and databases.
            </p>
            <p>
              His goal is simple: build digital products that are useful, intuitive and technically solid.
            </p>

            <div className="pt-4 flex items-center space-x-4 text-xs font-mono tracking-widest text-[#111111] uppercase">
              <span className="flex items-center space-x-1.5">
                <Code2 className="w-4 h-4" />
                <span>FULL-STACK</span>
              </span>
              <span>—</span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>CREATIVE TECH</span>
              </span>
            </div>
          </div>

        </div>

        {/* Editorial Statement Quote */}
        <div className="pt-12 md:pt-16 border-t border-[#111111]/15 space-y-4">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#65635F] uppercase">
            Philosophy
          </p>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#111111]">
              I don't just want websites to work.
            </h3>
            <div className="overflow-hidden">
              <p
                ref={quoteLineRef}
                className="font-editorial text-4xl sm:text-6xl md:text-7xl italic font-normal text-[#111111] leading-tight"
              >
                I want them to feel good to use.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
