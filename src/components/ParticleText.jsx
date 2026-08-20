import React, { useEffect, useRef } from 'react';

const ParticleText = ({
  text = 'Designer',
  fontFamily = 'serif',
  fontStyle = 'italic',
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = {
      x: null,
      y: null,
      radius: 140, // Disruption threshold
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initParticles = () => {
      const screenWidth = window.innerWidth;

      // Font size responsive calculation
      let fontSize = 110;
      if (screenWidth < 480) fontSize = 44;
      else if (screenWidth < 640) fontSize = 56;
      else if (screenWidth < 768) fontSize = 72;
      else if (screenWidth < 1024) fontSize = 88;
      else if (screenWidth < 1280) fontSize = 98;

      const fontStr = `${fontStyle} 400 ${fontSize}px "Playfair Display", Georgia, Cambria, "Times New Roman", serif`;
      ctx.font = fontStr;

      // Measure exact text width
      const textMetrics = ctx.measureText(text);
      const measuredTextWidth = Math.ceil(textMetrics.width);

      // Large left & right padding to protect capital 'D' swash on left and italic 'r' slant on right
      const paddingLeft = Math.ceil(fontSize * 0.35) + 20; // ~58px left padding
      const paddingRight = Math.ceil(fontSize * 0.5) + 40; // ~95px right padding
      const width = measuredTextWidth + paddingLeft + paddingRight;
      const height = Math.ceil(fontSize * 1.6);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Draw text on offscreen buffer to scan pixel locations
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#F5F1E8';
      ctx.font = fontStr;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';

      ctx.fillText(text, paddingLeft, height / 2);

      const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr);
      const data = imageData.data;

      const step = screenWidth < 640 ? 3 : 4;
      particles = [];

      for (let y = 0; y < height * dpr; y += step) {
        for (let x = 0; x < width * dpr; x += step) {
          const index = (y * (width * dpr) + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const posX = x / dpr;
            const posY = y / dpr;

            particles.push({
              x: posX,
              y: posY,
              originX: posX,
              originY: posY,
              vx: (Math.random() - 0.5) * 0.4,
              vy: (Math.random() - 0.5) * 0.4,
              size: screenWidth < 640 ? 1.2 : 1.5,
              color: '#F5F1E8',
              density: Math.random() * 25 + 10,
              friction: 0.86,
              ease: 0.08,
            });
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
    };

    initParticles();

    // Mouse & Touch events
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Animation & physics loop
    const animate = () => {
      const width = parseFloat(canvas.style.width) || canvas.width;
      const height = parseFloat(canvas.style.height) || canvas.height;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Disruption physics when cursor is near
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const forceX = Math.cos(angle) * force * p.density * 0.65;
            const forceY = Math.sin(angle) * force * p.density * 0.65;

            p.vx -= forceX;
            p.vy -= forceY;
          }
        }

        // Return force back to origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;

        p.vx += dxOrigin * p.ease;
        p.vy += dyOrigin * p.ease;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [text, fontFamily, fontStyle]);

  return (
    <div className={`relative inline-block align-middle overflow-visible ${className}`}>
      <canvas ref={canvasRef} className="block cursor-pointer select-none" />
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default ParticleText;
