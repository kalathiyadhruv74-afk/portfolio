import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import TerminalWindow from '../components/TerminalWindow';
import Tilt3D from '../components/Tilt3D';
import { ArrowRight, Sparkles, Layers, Terminal, Mail } from 'lucide-react';
import pantrypalImg from '../assets/pantrypal.jpg';
import bookmycutImg from '../assets/bookmycut.jpg';

const HomePage = () => {
  return (
    <div className="space-y-0">
      {/* Main Hero Section */}
      <Hero />

      {/* Marquee Ticker */}
      <Marquee />

      {/* About Overview Teaser Section */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              01 / ABOUT DHRUV
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F5F1E8] leading-tight">
              Crafting full-stack applications with <br />
              <span className="font-editorial italic font-normal text-5xl sm:text-7xl text-[#A1A1AA]">
                purpose & clean code.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl">
              Computer Science Engineering student & developer based in Surat, India. Specializing in building robust web applications across React, Node.js, Python, and Django.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/about"
              className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#141416] bg-[#F5F1E8] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#EBE5D9] group"
              data-cursor="hover"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
                02 / FEATURED WORK
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F5F1E8]">
                Selected Projects
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F5F1E8] uppercase hover-underline-animation"
              data-cursor="hover"
            >
              <span>View All Work (02)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PantryPal Card with Zero-Gravity Floating & 3D Tilt */}
            <Tilt3D maxTilt={12} scale={1.03} className="glow-3d rounded-sm animate-float-medium">
              <div className="group border border-white/15 bg-[#1E1E22] p-6 sm:p-8 rounded-sm space-y-6 transition-all duration-500 relative z-10">
                <div className="aspect-video overflow-hidden rounded-sm border border-white/10 relative z-10 translate-z-20">
                  <img
                    src={pantrypalImg}
                    alt="PantryPal"
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 translate-z-30">
                  <span className="text-xs font-mono text-[#A1A1AA] uppercase">SMART PANTRY MANAGEMENT</span>
                  <h3 className="text-2xl font-bold font-serif text-[#F5F1E8]">PantryPal</h3>
                  <p className="text-sm text-[#A1A1AA] line-clamp-2">
                    Smart food inventory & ingredient-based recipe discovery platform.
                  </p>
                </div>
                <Link
                  to="/work"
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F5F1E8] uppercase group-hover:translate-x-1 transition-transform translate-z-20"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Tilt3D>

            {/* BookMyCut Card with Zero-Gravity Floating & 3D Tilt */}
            <Tilt3D maxTilt={12} scale={1.03} className="glow-3d rounded-sm animate-float-slow">
              <div className="group border border-white/15 bg-[#1E1E22] p-6 sm:p-8 rounded-sm space-y-6 transition-all duration-500 relative z-10">
                <div className="aspect-video overflow-hidden rounded-sm border border-white/10 relative z-10 translate-z-20">
                  <img
                    src={bookmycutImg}
                    alt="BookMyCut"
                    className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 translate-z-30">
                  <span className="text-xs font-mono text-[#A1A1AA] uppercase">SALON APPOINTMENT PLATFORM</span>
                  <h3 className="text-2xl font-bold font-serif text-[#F5F1E8]">BookMyCut</h3>
                  <p className="text-sm text-[#A1A1AA] line-clamp-2">
                    Modern salon appointment booking & service schedule management system.
                  </p>
                </div>
                <Link
                  to="/work"
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#F5F1E8] uppercase group-hover:translate-x-1 transition-transform translate-z-20"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Tilt3D>
          </div>
        </div>
      </section>

      {/* Capabilities Teaser */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              03 / CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#F5F1E8]">
              Full-Stack Tech Stack & Skills
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              React, JavaScript, Python, Django, Node.js, Express, REST APIs, Tailwind CSS, SQL & Database Management.
            </p>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F1E8] border border-white/20 px-8 py-4 rounded-full hover:bg-[#F5F1E8] hover:text-[#141416] transition-all duration-300 group shrink-0"
            data-cursor="hover"
          >
            <span>Explore Skills</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Interactive Developer Terminal Showcase Section */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase flex items-center justify-center md:justify-start space-x-2">
              <Terminal className="w-4 h-4 text-[#F5F1E8]" />
              <span>04 / INTERACTIVE CLI — DEVELOPER SHELL</span>
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-serif text-[#F5F1E8]">
              Try the Portfolio Terminal
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl">
              Execute shell commands live or click the command chips below to inspect bio data, packages, and REST endpoints directly from the CLI.
            </p>
          </div>

          <Tilt3D maxTilt={8} scale={1.015} className="glow-3d rounded-xl animate-float-slow">
            <TerminalWindow />
          </Tilt3D>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#1E1E22] text-[#F5F1E8] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              05 / START A CONVERSATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-serif">
              Have a project in mind?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#141416] bg-[#F5F1E8] px-8 py-4 rounded-full hover:bg-[#EBE5D9] transition-all duration-300 group shrink-0"
            data-cursor="hover"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
