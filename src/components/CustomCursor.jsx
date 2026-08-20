import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'hover', 'view', 'open'
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Check if device has touch input or small screen
    const touchCheck = () => {
      if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
        setIsTouch(true);
      } else {
        setIsTouch(false);
      }
    };

    touchCheck();
    window.addEventListener('resize', touchCheck);

    if (isTouch) return;

    // Detect if element under cursor has dark background
    const checkDarkBg = (x, y) => {
      // Hide cursor temporarily from elementFromPoint target
      if (cursorRef.current) cursorRef.current.style.pointerEvents = 'none';
      const el = document.elementFromPoint(x, y);
      if (!el) return false;

      let current = el;
      while (current && current !== document.body && current !== document.documentElement) {
        const style = window.getComputedStyle(current);
        const bg = style.backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128; // True if background is dark
          }
        }
        current = current.parentElement;
      }
      return false;
    };

    // Fast mouse movement listener
    const moveCursor = (e) => {
      setIsVisible(true);
      
      // Update cursor position via GSAP
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out'
      });

      // Check background luminance under cursor
      const dark = checkDarkBg(e.clientX, e.clientY);
      setIsDarkBg(dark);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event Delegation for hover states
    const handleOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorVariant('view');
          setCursorText('VIEW');
        } else if (type === 'open') {
          setCursorVariant('open');
          setCursorText('OPEN ↗');
        } else if (type === 'hover') {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (e.target.closest('a, button, [role="button"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('resize', touchCheck);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [isTouch]);

  if (isTouch) return null;

  // Determine classes based on cursor state
  let sizeClasses = 'w-3 h-3 bg-[#F5F1E8] shadow-md';
  let fontClasses = 'text-[10px] font-semibold tracking-wider text-[#141416]';

  if (cursorVariant === 'hover') {
    sizeClasses = 'w-10 h-10 bg-[#F5F1E8]/20 border border-[#F5F1E8] backdrop-blur-[1px]';
  } else if (cursorVariant === 'view' || cursorVariant === 'open') {
    sizeClasses = 'w-20 h-20 bg-[#F5F1E8] text-[#141416] shadow-2xl';
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9990] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ease-out ${sizeClasses} ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{ willChange: 'transform' }}
    >
      {cursorText && (
        <span ref={textRef} className={`${fontClasses} select-none animate-fadeIn`}>
          {cursorText}
        </span>
      )}
    </div>
  );
};

export default CustomCursor;
