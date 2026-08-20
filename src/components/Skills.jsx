import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Fast, staggered reveal for skills items when section enters viewport
    const rows = gsap.utils.toArray('.skill-row');
    gsap.fromTo(
      rows,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 bg-transparent border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              03 / CAPABILITIES
            </span>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F1E8]">
              Tools behind <br />
              <span className="font-editorial italic font-normal text-6xl sm:text-8xl text-[#A1A1AA]">
                the work.
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono tracking-widest text-[#A1A1AA] max-w-xs uppercase">
            Technical stack & engineering practices used across production frontend and backend applications.
          </p>
        </div>

        {/* Minimal Horizontal List Rows */}
        <div className="space-y-0 border-t border-white/10">
          {skillsData.map((skillGroup) => (
            <div
              key={skillGroup.id}
              className="skill-row group border-b border-white/10 p-6 md:p-10 transition-[background-color,color,padding,border-color] duration-300 ease-out hover:bg-[#1E1E22] hover:text-[#F5F1E8] hover:px-8 md:hover:px-12"
              data-cursor="hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Category Number & Title */}
                <div className="lg:col-span-4 flex items-baseline space-x-4">
                  <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F1E8]/70">
                    {skillGroup.id}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-[#F5F1E8]">
                    {skillGroup.category}
                  </h3>
                </div>

                {/* Technology Badges List */}
                <div className="lg:col-span-8 flex flex-wrap gap-2 sm:gap-3">
                  {skillGroup.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs sm:text-sm font-mono px-4 py-2 bg-[#1E1E22] border border-white/15 text-[#F5F1E8] rounded-sm transition-colors duration-300 group-hover:bg-[#26262B] group-hover:border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Skill Description Subtext */}
              <p className="mt-4 text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F1E8]/80 max-w-2xl">
                {skillGroup.summary}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

