import { useRef } from 'react';
import { motion } from 'framer-motion';
import CONFIG from '../config';
import './Forever.css';

export default function Forever() {
  const containerRef = useRef(null);

  return (
    <div className="forever-page" ref={containerRef}>
      {/* ── Stars Merging Scene ── */}
      <section className="forever-scene">
        <motion.div
          className="forever-stars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Star 1 - You */}
          <motion.div
            className="forever-star forever-star--1"
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="forever-star__body" />
            <div className="forever-star__glow forever-star__glow--blue" />
            <span className="forever-star__label handwritten">{CONFIG.yourName}</span>
          </motion.div>

          {/* Merge Effect */}
          <motion.div
            className="forever-merge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 2.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="forever-merge__galaxy" />
            <div className="forever-merge__heart-glow" />
            <div className="forever-merge__photo">
              <img
                src={CONFIG.favoritePhoto || CONFIG.couplePhoto}
                alt="Us together"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="photo-placeholder" style="width:100%;height:100%;border-radius:50%">❤️</div>`;
                }}
              />
            </div>
          </motion.div>

          {/* Star 2 - Her */}
          <motion.div
            className="forever-star forever-star--2"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="forever-star__body" />
            <div className="forever-star__glow forever-star__glow--pink" />
            <span className="forever-star__label handwritten">{CONFIG.herName}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Final Message ── */}
      <section className="forever-message section">
        <motion.div
          className="forever-text-flow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="forever-quote"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            "If I had to choose between the universe and you..."
          </motion.p>

          <motion.div
            className="forever-dots"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </motion.div>

          <motion.p
            className="forever-quote forever-quote--highlight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            "I would choose you."
          </motion.p>

          <motion.div
            className="forever-dots"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </motion.div>

          <motion.p
            className="forever-quote forever-quote--final"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 2.8 }}
          >
            "Because <span className="text-gradient">you are my universe.</span>"
          </motion.p>
        </motion.div>
      </section>

      {/* ── Final Signature ── */}
      <section className="forever-signature section">
        <motion.div
          className="signature-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="signature-heart"
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.div>

          <p className="signature-text">Forever Yours,</p>
          <h2 className="signature-name handwritten">{CONFIG.yourName}</h2>

          <div className="signature-line">
            <motion.div
              className="signature-line__inner"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          <motion.p
            className="signature-final"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            No matter how vast the universe is,<br />
            my favorite place will always be<br />
            <span className="text-gold">wherever you are.</span>
          </motion.p>

          {/* Floating emojis */}
          <div className="signature-emojis">
            {['🌌', '✨', '💕', '🌟', '💫', '❤️', '🌙', '⭐'].map((emoji, i) => (
              <span
                key={i}
                className="signature-emoji"
                style={{
                  '--x': `${20 + Math.random() * 60}%`,
                  '--delay': `${i * 0.8}s`,
                  '--duration': `${5 + Math.random() * 5}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="forever-footer">
        <p>Made with all the love in my heart ❤️</p>
        <p className="forever-footer__year">— Forever</p>
      </footer>
    </div>
  );
}
