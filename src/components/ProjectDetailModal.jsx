import React from 'react';
import { X, ExternalLink, Code2, Database, ShieldCheck, Layers } from 'lucide-react';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#141416]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#1E1E22] border border-white/20 rounded-sm shadow-2xl overflow-y-auto p-6 sm:p-8 md:p-12 text-[#F5F1E8] space-y-8">
        
        {/* Header & Close Button */}
        <div className="flex items-start justify-between border-b border-white/15 pb-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#A1A1AA] uppercase block mb-1">
              PROJECT {project.number} — {project.category}
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold font-serif text-[#F5F1E8]">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/20 rounded-full hover:bg-[#F5F1E8] hover:text-[#141416] transition-colors duration-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Showcase Banner */}
        <div className="w-full aspect-video rounded-sm overflow-hidden border border-white/15 bg-[#26262B]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-8 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase">
              Architecture & Overview
            </h4>
            <p className="text-base text-[#F5F1E8] leading-relaxed">
              {project.description}
            </p>
            
            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase">Key Features</h5>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#F5F1E8] font-mono mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6 bg-[#26262B] p-6 rounded-sm border border-white/10">
            <div>
              <h5 className="text-xs font-mono tracking-widest text-[#A1A1AA] uppercase mb-3">
                Tech Stack
              </h5>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 bg-[#1E1E22] border border-white/15 text-[#F5F1E8] rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-[#A1A1AA] pt-2 border-t border-white/10">
              <p className="flex justify-between">
                <span>Repository:</span>
                <span className="text-[#F5F1E8] font-semibold">GitHub Source</span>
              </p>
              <p className="flex justify-between">
                <span>Type:</span>
                <span className="text-[#F5F1E8] font-semibold">REST API Backend</span>
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-white/15 text-xs font-mono text-[#A1A1AA]">
          <span>Dhruv Kalathiya Portfolio</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#F5F1E8] text-[#141416] font-sans font-semibold tracking-wider uppercase rounded-full hover:bg-[#EBE5D9] transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailModal;
