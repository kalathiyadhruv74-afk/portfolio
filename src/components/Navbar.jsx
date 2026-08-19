import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/work' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 sm:px-8 md:px-12 pointer-events-none ${
          scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out rounded-2xl md:rounded-full ${
              scrolled
                ? 'glass-panel-scrolled -translate-y-1.5 md:-translate-y-2 scale-[0.985] md:scale-[0.99] px-5 md:px-7 py-2.5 shadow-2xl'
                : 'glass-panel translate-y-0 scale-100 px-6 md:px-8 py-3.5'
            }`}
          >
            {/* Left Brand Logo */}
            <Link
              to="/"
              className="font-serif text-2xl md:text-3xl font-bold tracking-tighter text-[#111111] transition-transform duration-300 hover:scale-105"
              data-cursor="hover"
            >
              DK.
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] font-medium uppercase text-[#65635F]">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative group flex items-center py-1 transition-colors duration-300 ${
                      isActive ? 'text-[#111111] font-semibold' : 'hover:text-[#111111]'
                    }`}
                    data-cursor="hover"
                  >
                    {/* Active Indicator Dot */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-[#111111] mr-2 transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-100 shadow-[0_0_8px_rgba(17,17,17,0.3)]' : 'opacity-0 scale-0'
                      }`}
                    />
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#111111] transition-transform duration-300 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Far Right CTA */}
            <div className="hidden md:flex items-center">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F1E8] bg-[#111111] border border-[#111111] px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[#65635F] hover:shadow-lg group"
                data-cursor="hover"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] focus:outline-none rounded-lg bg-[#111111]/5 border border-[#111111]/15"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-[95] bg-[#F5F1E8]/90 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="flex flex-col space-y-8">
          <p className="text-[10px] tracking-[0.3em] font-semibold text-[#65635F] uppercase border-b border-[#111111]/15 pb-3">
            Navigation
          </p>
          {navItems.map((item, idx) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-4xl text-[#111111] flex items-center justify-between border-b border-[#111111]/10 pb-4"
            >
              <span>{item.label}</span>
              <span className="text-xs font-sans text-[#65635F]">0{idx + 1}</span>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-4 bg-[#111111] text-[#F5F1E8] font-medium tracking-widest text-xs uppercase block rounded-full shadow-lg"
          >
            Let's Talk ↗
          </Link>
          <div className="flex justify-between items-center text-[10px] text-[#65635F] tracking-widest uppercase pt-2">
            <span>Surat, India</span>
            <span>© 2026 Dhruv Kalathiya</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
