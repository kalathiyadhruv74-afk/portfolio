import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projectsData } from '../data/projects';
import ProjectItem from './ProjectItem';
import ProjectDetailModal from './ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useGSAP(() => {
    // ScrollTrigger to detect which project is active in viewport
    projectsData.forEach((_, idx) => {
      const el = document.getElementById(`project-${idx}`);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveProjectIndex(idx),
          onEnterBack: () => setActiveProjectIndex(idx),
        });
      }
    });
  }, { scope: sectionRef });

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 md:px-12 bg-transparent"
    >
      {/* Floating fixed project counter indicator */}
      <div className="hidden lg:flex fixed bottom-12 right-12 z-40 bg-[#1E1E22] text-[#F5F1E8] px-4 py-2 rounded-full border border-white/20 shadow-2xl text-xs font-mono tracking-widest items-center space-x-2 pointer-events-none transition-opacity duration-300">
        <span className="text-[#A1A1AA]">WORK INDEX</span>
        <span className="text-white/40">|</span>
        <span className="font-bold text-[#F5F1E8]">
          0{activeProjectIndex + 1} / 0{projectsData.length}
        </span>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              02 / SELECTED WORK
            </span>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F1E8]">
              Selected <br />
              <span className="font-editorial italic font-normal text-6xl sm:text-8xl text-[#A1A1AA]">
                Projects
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono tracking-widest text-[#A1A1AA] max-w-xs uppercase">
            A curation of full-stack applications & backend APIs engineered for performance and utility.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {projectsData.map((project, index) => (
            <div key={project.id} id={`project-${index}`}>
              <ProjectItem
                project={project}
                onOpenDetails={handleOpenDetails}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal for Backend Project */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
