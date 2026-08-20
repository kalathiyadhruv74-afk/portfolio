import React, { useState, useRef } from 'react';
import { ArrowUpRight, Mail, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import Tilt3D from './Tilt3D';

const contactLinks = [
  {
    label: 'Email',
    title: 'SEND AN EMAIL ↗',
    href: 'mailto:kalathiyadhruv74@gmail.com',
    detail: 'kalathiyadhruv74@gmail.com',
    icon: Mail
  },
  {
    label: 'LinkedIn',
    title: 'CONNECT ON LINKEDIN ↗',
    href: 'https://www.linkedin.com/in/dhruv-kalathiya-1606603a3',
    detail: 'in/dhruv-kalathiya-1606603a3',
    icon: Linkedin
  },
  {
    label: 'GitHub',
    title: 'EXPLORE GITHUB ↗',
    href: 'https://github.com/kalathiyadhruv74-afk',
    detail: '@kalathiyadhruv74-afk',
    icon: Github
  }
];

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 bg-transparent border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] uppercase">
              04 / CONTACT
            </span>
            <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#F5F1E8] leading-[1.05]">
              Have something <br />
              interesting in mind? <br />
              <span className="font-editorial italic font-normal text-6xl sm:text-8xl text-[#A1A1AA]">
                Let's build it.
              </span>
            </h2>
          </div>
          <p className="text-xs font-mono tracking-widest text-[#A1A1AA] max-w-sm uppercase">
            I'm open to interesting development projects, collaborations and opportunities. If you have something worth building, let's talk.
          </p>
        </div>

        {/* Large Horizontal Link Rows */}
        <div className="space-y-0 border-t border-white/10">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 p-6 md:p-10 transition-all duration-500 ease-out hover:bg-[#1E1E22] hover:text-[#F5F1E8] hover:px-8 md:hover:px-12"
              data-cursor="open"
            >
              <div className="flex items-center space-x-6">
                <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F1E8]/70 uppercase">
                  {link.label}
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-[#F5F1E8] group-hover:text-[#F5F1E8]">
                  {link.title}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-4 mt-4 md:mt-0">
                <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F1E8]/80">
                  {link.detail}
                </span>
                <ArrowUpRight className="w-6 h-6 text-[#F5F1E8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Underline Contact Form with 3D Tilt */}
        <div className="pt-12 md:pt-16 max-w-3xl mx-auto">
          <Tilt3D maxTilt={10} scale={1.015} className="glow-3d rounded-sm">
            <div className="space-y-8 bg-[#1E1E22] p-8 sm:p-12 rounded-sm border border-white/15">
              <div className="space-y-2 translate-z-30">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F1E8]">
                  Send a Direct Message
                </h3>
                <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-widest">
                  Fill out the details below to reach out directly
                </p>
              </div>

          {submitted ? (
            <div className="p-8 bg-[#26262B] text-[#F5F1E8] rounded-sm space-y-3 animate-fadeIn text-center border border-white/10">
              <CheckCircle2 className="w-10 h-10 mx-auto text-[#F5F1E8]" />
              <h4 className="text-xl font-bold font-serif">Message Received</h4>
              <p className="text-xs font-mono text-[#A1A1AA]">
                Thank you for getting in touch, {formData.name}. I'll respond as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-[#F5F1E8] placeholder-[#A1A1AA]/40 focus:outline-none focus:border-[#F5F1E8] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider block">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-[#F5F1E8] placeholder-[#A1A1AA]/40 focus:outline-none focus:border-[#F5F1E8] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider block">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project concept, inquiry or collaboration idea..."
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-[#F5F1E8] placeholder-[#A1A1AA]/40 focus:outline-none focus:border-[#F5F1E8] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#F5F1E8] text-[#141416] text-xs font-mono font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#EBE5D9] transition-all duration-300 group"
                data-cursor="hover"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
            </div>
          </Tilt3D>
        </div>

      </div>
    </section>
  );
};

export default Contact;
