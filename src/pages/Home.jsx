import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../config';
import './Home.css';

const introTexts = [
  "Among billions of stars...",
  "Among endless galaxies...",
  "Among infinite possibilities...",
  "I found my universe.",
];

export default function Home() {
  const [introPhase, setIntroPhase] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const orbitsRef = useRef(null);
  const navigate = useNavigate();

  // Check if intro was already shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem('introShown');
    if (shown) {
      setShowIntro(false);
      setShowHero(true);
    }
  }, []);

  // Intro sequence
  useEffect(() => {
    if (!showIntro) return;
    if (introPhase <= introTexts.length) {
      const delay = introPhase === 0 ? 1500 : introPhase === introTexts.length ? 2000 : 2500;
      const timer = setTimeout(() => {
        if (introPhase < introTexts.length) {
          setIntroPhase(prev => prev + 1);
        } else {
          setShowIntro(false);
          setShowHero(true);
          sessionStorage.setItem('introShown', 'true');
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [introPhase, showIntro]);

  // Orbit mouse interaction
  useEffect(() => {
    if (!orbitsRef.current) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      if (orbitsRef.current) {
        orbitsRef.current.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [showHero]);

  return (
    <div className="home">
      {/* ── Intro Sequence ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="intro-content">
              {introTexts.map((text, i) => (
                <motion.p
                  key={i}
                  className="intro-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={introPhase > i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Section ── */}
      {showHero && (
        <motion.div
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Reveal Name */}
          <motion.div
            className="hero__name-reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
          >
            <span className="hero__heart">❤️</span>
            <h1 className="hero__name">{CONFIG.herName}</h1>
            <span className="hero__heart">❤️</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.2 }}
          >
            <h2 className="hero__title">
              You Are My <span className="text-gradient">Universe</span>
            </h2>
            <p className="hero__subtitle">
              No matter how many miles separate us, my heart will always revolve around you.
            </p>
          </motion.div>

          {/* Galaxy Heart with Photo */}
          <motion.div
            className="hero__galaxy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="galaxy-heart" ref={orbitsRef}>
              {/* Orbiting elements */}
              <div className="orbit orbit--1">
                <div className="orbit__planet orbit__planet--1" />
              </div>
              <div className="orbit orbit--2">
                <div className="orbit__planet orbit__planet--2" />
              </div>
              <div className="orbit orbit--3">
                <div className="orbit__planet orbit__planet--3" />
              </div>

              {/* Center photo */}
              <div className="galaxy-heart__center">
                <div className="galaxy-heart__glow" />
                <div className="galaxy-heart__photo">
                  <img
                    src={CONFIG.herPhoto}
                    alt={CONFIG.herName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="photo-placeholder">💕</div>`;
                    }}
                  />
                </div>
                <p className="galaxy-heart__caption">The Center Of My Universe</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <button className="btn-cosmic" onClick={() => navigate('/our-story')}>
              <span>Begin Our Journey</span>
              <span>✨</span>
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="hero__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            <div className="scroll-indicator">
              <div className="scroll-indicator__mouse">
                <div className="scroll-indicator__dot" />
              </div>
              <span>Scroll to explore</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
