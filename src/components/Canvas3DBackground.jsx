import React, { useEffect, useRef } from 'react';

const Canvas3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
      initAmbientOrbs();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const GRID_SIZE = 48; // Clean, subtle box grid spacing
    const DISRUPT_RADIUS = 110; // Gentle, subtle disruption radius

    let cols = Math.ceil(width / GRID_SIZE) + 2;
    let rows = Math.ceil(height / GRID_SIZE) + 2;
    let gridNodes = [];

    function initGrid() {
      cols = Math.ceil(width / GRID_SIZE) + 2;
      rows = Math.ceil(height / GRID_SIZE) + 2;
      gridNodes = [];

      for (let r = 0; r < rows; r++) {
        gridNodes[r] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * GRID_SIZE;
          const y = r * GRID_SIZE;
          gridNodes[r][c] = {
            x,
            y,
            origX: x,
            origY: y,
            vx: 0,
            vy: 0,
            disrupted: false,
          };
        }
      }
    }

    // Initialize Randomly Floating Unnoticeable Ambient Glow Orbs
    let ambientOrbs = [];
    function initAmbientOrbs() {
      ambientOrbs = [];
      const numOrbs = 6;

      for (let i = 0; i < numOrbs; i++) {
        ambientOrbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 240 + 180,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          angle: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.012 + 0.005,
          baseAlpha: Math.random() * 0.018 + 0.012, // Ultra-subtle (1.2% - 3%)
        });
      }
    }

    initGrid();
    initAmbientOrbs();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 0a. Render Randomly Floating Unnoticeable Ambient Background Glow Orbs
      ambientOrbs.forEach((orb) => {
        orb.angle += orb.pulseSpeed;
        orb.x += orb.vx + Math.sin(orb.angle) * 0.4;
        orb.y += orb.vy + Math.cos(orb.angle) * 0.4;

        // Wrap around viewport boundaries smoothly
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const currentAlpha = orb.baseAlpha + Math.sin(orb.angle * 2) * 0.005;
        const currentRadius = orb.radius + Math.sin(orb.angle) * 20;

        const orbGradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          currentRadius
        );

        orbGradient.addColorStop(0, `rgba(245, 241, 232, ${Math.max(0, currentAlpha)})`);
        orbGradient.addColorStop(0.6, `rgba(161, 161, 170, ${Math.max(0, currentAlpha * 0.4)})`);
        orbGradient.addColorStop(1, 'rgba(12, 12, 14, 0)');

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 0b. Render Cursor Ambient Radial Glow
      if (mouseX > 0 && mouseY > 0) {
        const glowGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 260);
        glowGradient.addColorStop(0, 'rgba(245, 241, 232, 0.022)');
        glowGradient.addColorStop(0.5, 'rgba(245, 241, 232, 0.008)');
        glowGradient.addColorStop(1, 'rgba(12, 12, 14, 0)');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // 1. Update Node Repulsion & Spring Return Physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = gridNodes[r][c];

          const dx = node.x - mouseX;
          const dy = node.y - mouseY;
          const dist = Math.hypot(dx, dy);

          // Subtle Circular Particle Disruption Force
          if (dist < DISRUPT_RADIUS && dist > 0) {
            const force = (1 - dist / DISRUPT_RADIUS) * 5.5;
            const angle = Math.atan2(dy, dx);

            node.vx += Math.cos(angle) * force;
            node.vy += Math.sin(angle) * force;
            node.disrupted = true;
          } else {
            node.disrupted = false;
          }

          // Gentle spring restoration to original position
          const springX = (node.origX - node.x) * 0.09;
          const springY = (node.origY - node.y) * 0.09;

          node.vx += springX;
          node.vy += springY;

          // Velocity Damping
          node.vx *= 0.82;
          node.vy *= 0.82;

          node.x += node.vx;
          node.y += node.vy;
        }
      }

      // 2. Draw Horizontal Box Grid Lines (Low Visibility Subtle Color)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const node = gridNodes[r][c];
          if (c === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      // 3. Draw Vertical Box Grid Lines (Low Visibility Subtle Color)
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const node = gridNodes[r][c];
          if (r === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-90"
    />
  );
};

export default Canvas3DBackground;
