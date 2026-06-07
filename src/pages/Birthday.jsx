import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CONFIG from '../config';
import './Birthday.css';

function Firework({ x, y, color }) {
  return (
    <div className="firework" style={{ left: `${x}%`, top: `${y}%` }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="firework__particle"
          style={{
            '--angle': `${i * 30}deg`,
            '--distance': `${40 + Math.random() * 60}px`,
            '--color': color,
            animationDelay: `${Math.random() * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Birthday() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [hearts, setHearts] = useState([]);
  const intervalRef = useRef(null);

  const revealSurprise = () => {
    setIsRevealed(true);

    // Generate confetti
    const newConfetti = [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      color: ['#e84393', '#f0c27f', '#667eea', '#fd79a8', '#a855f7', '#ffffff'][Math.floor(Math.random() * 6)],
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);

    // Generate hearts
    const newHearts = [...Array(25)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      size: 0.8 + Math.random() * 1.5,
    }));
    setHearts(newHearts);

    // Spawn fireworks periodically
    let count = 0;
    intervalRef.current = setInterval(() => {
      const colors = ['#e84393', '#f0c27f', '#667eea', '#fd79a8', '#a855f7'];
      setFireworks(prev => [
        ...prev,
        {
          id: Date.now() + count,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 40,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
      count++;
      if (count > 15) {
        clearInterval(intervalRef.current);
      }
    }, 600);

    // Cleanup old fireworks
    setTimeout(() => {
      setFireworks([]);
    }, 12000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="birthday-page">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* ── Gift Box ── */
          <motion.div
            key="gift"
            className="gift-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="gift-container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <h2 className="gift-title">A Special Surprise <span>🎁</span></h2>
              <p className="gift-subtitle">Something magical awaits behind these stars...</p>

              <motion.button
                className="gift-box"
                onClick={revealSurprise}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="gift-box__body">
                  <div className="gift-box__ribbon-h" />
                  <div className="gift-box__ribbon-v" />
                  <div className="gift-box__bow">🎀</div>
                  <div className="gift-box__glow" />
                </div>
                <span className="gift-box__label">Open Your Gift</span>
              </motion.button>

              <motion.p
                className="gift-hint"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Tap to unwrap ✨
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Birthday Celebration ── */
          <motion.div
            key="celebration"
            className="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Fireworks */}
            <div className="fireworks-layer">
              {fireworks.map(fw => (
                <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
              ))}
            </div>

            {/* Confetti */}
            <div className="confetti-layer">
              {confetti.map(c => (
                <div
                  key={c.id}
                  className="confetti-piece"
                  style={{
                    left: `${c.x}%`,
                    '--delay': `${c.delay}s`,
                    '--duration': `${c.duration}s`,
                    '--color': c.color,
                    '--size': `${c.size}px`,
                    '--rotation': `${c.rotation}deg`,
                  }}
                />
              ))}
            </div>

            {/* Hearts */}
            <div className="hearts-layer">
              {hearts.map(h => (
                <div
                  key={h.id}
                  className="floating-heart"
                  style={{
                    left: `${h.x}%`,
                    '--delay': `${h.delay}s`,
                    '--duration': `${h.duration}s`,
                    '--size': `${h.size}rem`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>

            {/* Main Content */}
            <motion.div
              className="celebration__content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: 'spring', damping: 15 }}
            >
              <motion.div
                className="celebration__emoji"
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 1, delay: 1 }}
              >
                🎂
              </motion.div>

              <h1 className="celebration__title">
                Happy Birthday<br />
                <span className="text-gold">My Love</span> ❤️
              </h1>

              <motion.div
                className="celebration__divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              <motion.p
                className="celebration__message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {CONFIG.birthdaySurpriseMessage}
              </motion.p>

              <motion.div
                className="celebration__name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <span className="handwritten" style={{ fontSize: '1.5rem', color: 'var(--nebula-rose)' }}>
                  For you, {CONFIG.herName} ✨
                </span>
              </motion.div>

              {/* Sparkle ring around content */}
              <div className="celebration__sparkle-ring">
                {[...Array(16)].map((_, i) => (
                  <span
                    key={i}
                    className="sparkle-dot"
                    style={{
                      '--angle': `${i * 22.5}deg`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    ✦
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
