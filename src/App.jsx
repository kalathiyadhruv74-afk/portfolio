import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import GridPatternBackground from './components/GridPatternBackground';
import Canvas3DBackground from './components/Canvas3DBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add custom-cursor-active class to body for desktop pointer suppression
    document.body.classList.add('custom-cursor-active');

    // Lenis Smooth Scroll Engine Integration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function updateLenis(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#0C0C0E] text-[#F5F1E8] selection:bg-[#F5F1E8] selection:text-[#0C0C0E] overflow-x-hidden">
        {/* Intro Page Loader */}
        {loading && <Loader onComplete={() => setLoading(false)} />}

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Full-Screen Interactive 3D Canvas Background */}
        <Canvas3DBackground />

        {/* Box Grid Pattern & Round Pointer Spotlight Effect */}
        <GridPatternBackground />

        {/* Navigation Header */}
        <Navbar />

        {/* Multi-Page Routes */}
        <main className="relative z-10 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
