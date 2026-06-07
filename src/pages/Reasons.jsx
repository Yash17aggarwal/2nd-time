import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CONFIG from '../config';
import './Reasons.css';

export default function Reasons() {
  const [stars, setStars] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const canvasRef = useRef(null);

  // Generate star positions
  useEffect(() => {
    const reasons = CONFIG.reasonsILoveYou;
    const generated = reasons.map((reason, i) => ({
      id: i,
      reason,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      size: Math.random() * 4 + 3,
      brightness: Math.random() * 0.5 + 0.5,
      revealed: false,
      delay: Math.random() * 2,
    }));
    setStars(generated);
  }, []);

  const handleStarClick = useCallback((star) => {
    setSelectedStar(star);
    if (!star.revealed) {
      setStars(prev => prev.map(s =>
        s.id === star.id ? { ...s, revealed: true } : s
      ));
      setRevealedCount(prev => prev + 1);
    }
  }, []);

  return (
    <div className="reasons-page">
      {/* ── Header ── */}
      <section className="section section-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>Reasons I <span className="text-gradient">Love You</span></h2>
          <div className="section-divider" />
          <p>Every star in this sky holds a reason why my heart chose you.</p>
          <p className="reasons-counter">
            ✨ {revealedCount} / {CONFIG.reasonsILoveYou.length} reasons discovered
          </p>
        </motion.div>
      </section>

      {/* ── Interactive Star Sky ── */}
      <section className="reasons-sky">
        <div className="reasons-sky__hint">
          <span>✨ Click the stars to discover each reason ✨</span>
        </div>

        {stars.map((star) => (
          <motion.button
            key={star.id}
            className={`reason-star ${star.revealed ? 'reason-star--revealed' : ''}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              '--size': `${star.size}px`,
              '--brightness': star.brightness,
              '--delay': `${star.delay}s`,
            }}
            onClick={() => handleStarClick(star)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: star.delay * 0.3, duration: 0.5 }}
            whileHover={{ scale: 2.5 }}
            aria-label={`Reason star ${star.id + 1}`}
          >
            <span className="reason-star__dot" />
            <span className="reason-star__glow" />
            {star.revealed && <span className="reason-star__check">✓</span>}
          </motion.button>
        ))}

        {/* Connecting lines for revealed stars */}
        <svg className="reasons-sky__connections" viewBox="0 0 100 100" preserveAspectRatio="none">
          {stars.filter(s => s.revealed).map((star, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            return (
              <line
                key={`${prev.id}-${star.id}`}
                x1={prev.x}
                y1={prev.y}
                x2={star.x}
                y2={star.y}
                stroke="rgba(232, 67, 147, 0.15)"
                strokeWidth="0.15"
              />
            );
          })}
        </svg>
      </section>

      {/* ── Selected Reason Popup ── */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div
            className="reason-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              className="reason-popup"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reason-popup__star">✨</div>
              <span className="reason-popup__number">Reason #{selectedStar.id + 1}</span>
              <p className="reason-popup__text">{selectedStar.reason}</p>
              <button
                className="reason-popup__close"
                onClick={() => setSelectedStar(null)}
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── All Reasons List ── */}
      <section className="section reasons-list-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="section-header">
            <h3>All The <span className="text-gold">Reasons</span></h3>
            <div className="section-divider" />
          </div>

          <div className="reasons-list">
            {CONFIG.reasonsILoveYou.map((reason, i) => (
              <motion.div
                key={i}
                className="reason-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
              >
                <span className="reason-item__star">✨</span>
                <span className="reason-item__text">{reason}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="reasons-footer handwritten"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            "...and a million more reasons that words could never capture."
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
