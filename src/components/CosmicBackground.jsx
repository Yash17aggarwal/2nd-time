import { useEffect, useRef, useCallback } from 'react';
import './CosmicBackground.css';

export default function CosmicBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);

  const createStars = useCallback((width, height) => {
    const stars = [];
    const count = Math.min(Math.floor((width * height) / 3000), 400);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        parallaxFactor: Math.random() * 0.02 + 0.005,
      });
    }
    return stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      starsRef.current = createStars(width, height);
    };

    resize();

    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / height - 0.5) * 2;
    };

    const maybeSpawnShootingStar = () => {
      if (Math.random() < 0.003 && shootingStarsRef.current.length < 2) {
        shootingStarsRef.current.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 60,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + Math.random() * 0.3,
          opacity: 1,
          life: 1,
        });
      }
    };

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.5 + 0.5;
        const opacity = star.opacity * (0.5 + twinkle * 0.5);
        const px = star.x + mx * star.parallaxFactor * 40;
        const py = star.y + my * star.parallaxFactor * 40;

        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add glow to bigger stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, star.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(px, py, 0, px, py, star.radius * 3);
          grad.addColorStop(0, `rgba(200, 210, 255, ${opacity * 0.3})`);
          grad.addColorStop(1, 'rgba(200, 210, 255, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Shooting stars
      maybeSpawnShootingStar();
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.015;
        s.opacity = s.life;

        if (s.life <= 0) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [createStars]);

  return (
    <>
      <canvas ref={canvasRef} className="cosmic-canvas" />
      <div className="nebula-layer">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>
    </>
  );
}
