import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Tilt3D from './Tilt3D';

gsap.registerPlugin(ScrollTrigger);

const ProjectItem = ({ project, onOpenDetails }) => {
  const itemRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Reveal project details when item scrolls into viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(
      imageWrapperRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(
      numberRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 },
      '-=0.6'
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }, { scope: itemRef });

  const handleClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (onOpenDetails) {
      onOpenDetails(project);
    }
  };

  const isLeftImage = parseInt(project.id) % 2 !== 0;

  return (
    <div
      ref={itemRef}
      className="w-full py-16 md:py-24 border-b border-white/10 group perspective-1000"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
        isLeftImage ? '' : 'lg:flex-row-reverse'
      }`}>
        
        {/* Project Image Column with 3D Tilt */}
        <div className={`lg:col-span-7 ${isLeftImage ? 'lg:order-1' : 'lg:order-2'}`}>
          <Tilt3D maxTilt={14} scale={1.03} className="glow-3d rounded-sm">
            <div
              ref={imageWrapperRef}
              className="relative z-10 w-full aspect-[16/10] overflow-hidden rounded-sm border border-white/15 bg-[#1E1E22] shadow-xl cursor-pointer"
              data-cursor="view"
              onClick={handleClick}
            >
              {/* Browser top window bar accent */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-[#141416]/90 backdrop-blur-md z-20 flex items-center px-3 space-x-1.5 border-b border-white/10 translate-z-30">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="text-[10px] font-mono text-[#F5F1E8]/70 ml-2 truncate">
                  {project.liveUrl ? project.liveUrl : `https://${project.id}.dhruvkalathiya.dev`}
                </span>
              </div>

              <img
                ref={imageRef}
                src={project.image}
                alt={project.title}
                className="relative z-10 w-full h-full object-cover pt-7 transition-transform duration-700 ease-out group-hover:scale-[1.03] translate-z-20"
              />

              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
            </div>
          </Tilt3D>
        </div>

        {/* Project Content Info Column */}
        <div className={`lg:col-span-5 space-y-6 ${isLeftImage ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Top category & number */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono tracking-[0.25em] text-[#A1A1AA] uppercase">
              {project.category}
            </span>
            <span
              ref={numberRef}
              className="font-serif-display text-3xl font-bold text-[#F5F1E8] group-hover:translate-x-1 transition-transform duration-300"
            >
              {project.number}
            </span>
          </div>

          {/* Project Title */}
          <h3
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-[#F5F1E8] group-hover:font-editorial group-hover:italic transition-all duration-300"
          >
            {project.title}
          </h3>

          {/* Description */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono tracking-wider px-3 py-1 bg-[#1E1E22] text-[#F5F1E8] border border-white/15 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#F5F1E8] border-b border-[#F5F1E8] pb-1 hover-underline-animation group/cta"
                  data-cursor="open"
                >
                  <span>{project.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                </a>
              ) : (
                <button
                  onClick={() => onOpenDetails(project)}
                  className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#F5F1E8] border-b border-[#F5F1E8] pb-1 hover-underline-animation group/cta"
                  data-cursor="hover"
                >
                  <span>{project.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectItem;
