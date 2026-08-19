import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
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
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-[#111111]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#65635F] uppercase">
              01 / ABOUT DHRUV
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
              Crafting full-stack applications with <br />
              <span className="font-editorial italic font-normal text-5xl sm:text-7xl text-[#65635F]">
                purpose & clean code.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#65635F] leading-relaxed max-w-2xl">
              Computer Science Engineering student & developer based in Surat, India. Specializing in building robust web applications across React, Node.js, Python, and Django.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/about"
              className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F1E8] bg-[#111111] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#65635F] group"
              data-cursor="hover"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-[#111111]/15">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#111111]/15 pb-8 gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-[#65635F] uppercase">
                02 / FEATURED WORK
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111]">
                Selected Projects
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#111111] uppercase hover-underline-animation"
              data-cursor="hover"
            >
              <span>View All Work (02)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PantryPal Card */}
            <div className="group border border-[#111111]/15 bg-[#EBE5D9]/40 p-6 rounded-sm space-y-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative z-10">
              <div className="aspect-video overflow-hidden rounded-sm border border-[#111111]/15 relative z-10">
                <img
                  src={pantrypalImg}
                  alt="PantryPal"
                  className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#65635F] uppercase">SMART PANTRY MANAGEMENT</span>
                <h3 className="text-2xl font-bold font-serif text-[#111111]">PantryPal</h3>
                <p className="text-sm text-[#65635F] line-clamp-2">
                  Smart food inventory & ingredient-based recipe discovery platform.
                </p>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#111111] uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* BookMyCut Card */}
            <div className="group border border-[#111111]/15 bg-[#EBE5D9]/40 p-6 rounded-sm space-y-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative z-10">
              <div className="aspect-video overflow-hidden rounded-sm border border-[#111111]/15 relative z-10">
                <img
                  src={bookmycutImg}
                  alt="BookMyCut"
                  className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#65635F] uppercase">SALON APPOINTMENT PLATFORM</span>
                <h3 className="text-2xl font-bold font-serif text-[#111111]">BookMyCut</h3>
                <p className="text-sm text-[#65635F] line-clamp-2">
                  Modern salon appointment booking & service schedule management system.
                </p>
              </div>
              <Link
                to="/work"
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#111111] uppercase group-hover:translate-x-1 transition-transform"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Teaser */}
      <section className="py-24 px-6 md:px-12 bg-transparent border-b border-[#111111]/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-[0.3em] text-[#65635F] uppercase">
              03 / CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111111]">
              Full-Stack Tech Stack & Skills
            </h2>
            <p className="text-sm text-[#65635F] max-w-xl">
              React, JavaScript, Python, Django, Node.js, Express, REST APIs, Tailwind CSS, SQL & Database Management.
            </p>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] border border-[#111111] px-8 py-4 rounded-full hover:bg-[#111111] hover:text-[#F5F1E8] transition-all duration-300 group shrink-0"
            data-cursor="hover"
          >
            <span>Explore Skills</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-[#F5F1E8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] text-[#EBE5D9]/60 uppercase">
              04 / START A CONVERSATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-serif">
              Have a project in mind?
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] bg-[#F5F1E8] px-8 py-4 rounded-full hover:bg-[#EBE5D9] transition-all duration-300 group shrink-0"
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
