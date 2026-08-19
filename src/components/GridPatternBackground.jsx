import React, { useEffect, useRef } from 'react';

const GridPatternBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking & movement energy
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      energy: 0, // 0 when stationary, increases on movement, decays on stop
      active: false
    };

    let prevX = -1000;
    let prevY = -1000;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      if (prevX > -500 && prevY > -500) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        // Excite energy based on mouse velocity
        mouse.energy = Math.min(mouse.energy + speed * 0.04, 1.0);
      }

      prevX = e.clientX;
      prevY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.energy = 0;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const gridSize = 48; // Crisp 48px box grid
    const effectRadius = 200; // Radius around pointer

    let startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.003;

      // Exponential decay of movement energy when stationary
      mouse.energy *= 0.92;
      if (mouse.energy < 0.001) mouse.energy = 0;

      // Smooth mouse interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;

      // Build grid nodes with displacement active ONLY when energy > 0 (mouse actively moving)
      const nodes = [];
      for (let r = 0; r < rows; r++) {
        nodes[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * gridSize;
          const baseY = r * gridSize;

          let displacedX = baseX;
          let displacedY = baseY;

          if (mouse.energy > 0.001 && mouse.x > -500 && mouse.y > -500) {
            const dx = mouse.x - baseX;
            const dy = mouse.y - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < effectRadius && dist > 0) {
              const normDist = dist / effectRadius;
              // Wave distortion scales directly with mouse movement energy
              const wave = Math.sin(normDist * Math.PI * 3 - elapsed * 5) * (1 - normDist) * 12 * mouse.energy;
              const push = Math.cos(normDist * Math.PI * 0.5) * 10 * (1 - normDist) * mouse.energy;

              const angle = Math.atan2(dy, dx);
              const totalDisplacement = wave + push;

              displacedX -= Math.cos(angle) * totalDisplacement;
              displacedY -= Math.sin(angle) * totalDisplacement;
            }
          }

          nodes[r][c] = { x: displacedX, y: displacedY, baseX, baseY };
        }
      }

      // Very light base grid line color
      const baseGridColor = 'rgba(17, 17, 17, 0.035)';

      // 1. Draw horizontal grid lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const node = nodes[r][c];
          if (c === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            const prev = nodes[r][c - 1];
            const xc = (prev.x + node.x) / 2;
            const yc = (prev.y + node.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
          }
        }
        ctx.strokeStyle = baseGridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Draw vertical grid lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const node = nodes[r][c];
          if (r === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            const prev = nodes[r - 1][c];
            const xc = (prev.x + node.x) / 2;
            const yc = (prev.y + node.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, xc, yc);
          }
        }
        ctx.strokeStyle = baseGridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Highlight grid lines & render subtle hallucinatory ripples ONLY during movement
      if (mouse.energy > 0.01 && mouse.x > -500 && mouse.y > -500) {
        // Highlight grid segments near cursor during motion
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const curr = nodes[r][c];
            const dx = mouse.x - curr.baseX;
            const dy = mouse.y - curr.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < effectRadius) {
              const intensity = (1 - dist / effectRadius) * mouse.energy;

              // Highlight horizontal segment
              const nextCol = nodes[r][c + 1];
              ctx.beginPath();
              ctx.moveTo(curr.x, curr.y);
              ctx.lineTo(nextCol.x, nextCol.y);
              ctx.strokeStyle = `rgba(17, 17, 17, ${0.035 + intensity * 0.12})`;
              ctx.lineWidth = 1 + intensity * 0.8;
              ctx.stroke();

              // Highlight vertical segment
              const nextRow = nodes[r + 1][c];
              ctx.beginPath();
              ctx.moveTo(curr.x, curr.y);
              ctx.lineTo(nextRow.x, nextRow.y);
              ctx.strokeStyle = `rgba(17, 17, 17, ${0.035 + intensity * 0.12})`;
              ctx.lineWidth = 1 + intensity * 0.8;
              ctx.stroke();
            }
          }
        }

        // Render delicate fading ripple rings around pointer while moving
        const ringRadius = ((elapsed * 40) % (effectRadius * 0.75));
        const ringOpacity = (1 - ringRadius / (effectRadius * 0.75)) * 0.08 * mouse.energy;

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(17, 17, 17, ${ringOpacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default GridPatternBackground;
