import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CONFIG from '../config';
import './OurStory.css';

export default function OurStory() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="story-page">
      {/* ── Header ── */}
      <section className="section section-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>Our <span className="text-gradient">Cosmic</span> Story</h2>
          <div className="section-divider" />
          <p>Every great love story is written in the stars. Here is ours.</p>
        </motion.div>
      </section>

      {/* ── Cosmic Timeline ── */}
      <section className="section timeline-section">
        <div className="timeline">
          <div className="timeline__line" />
          {CONFIG.timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <button
                className="timeline__planet"
                onClick={() => setSelectedEvent(event)}
                aria-label={`View memory: ${event.title}`}
              >
                <span className="timeline__planet-icon">{event.icon}</span>
                <div className="timeline__planet-glow" />
              </button>
              <div className="timeline__card glass-card" onClick={() => setSelectedEvent(event)}>
                <span className="timeline__date">{event.date}</span>
                <h3 className="timeline__title">{event.title}</h3>
                <p className="timeline__caption">{event.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Long Distance Section ── */}
      <section className="section distance-section">
        <motion.div
          className="distance"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="distance__visual">
            <motion.div
              className="distance__planet distance__planet--me"
              initial={{ x: -80 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <div className="distance__planet-body">
                <span>🌍</span>
              </div>
              <span className="distance__planet-label">{CONFIG.yourName}</span>
            </motion.div>

            <div className="distance__bridge">
              <div className="distance__bridge-line" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="distance__star-msg"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    top: `${30 + Math.random() * 40}%`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>

            <motion.div
              className="distance__planet distance__planet--her"
              initial={{ x: 80 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <div className="distance__planet-body">
                <span>🪐</span>
              </div>
              <span className="distance__planet-label">{CONFIG.herName}</span>
            </motion.div>
          </div>

          <motion.div
            className="distance__text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3>Distance measures miles, <span className="text-gradient">not love.</span></h3>
            <p className="handwritten" style={{ fontSize: '1.3rem', color: 'var(--nebula-rose)', marginTop: '1rem' }}>
              "Different places. Same sky. Same heart."
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Memory Card Modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="memory-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="memory-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="memory-modal__close" onClick={() => setSelectedEvent(null)}>
                ✕
              </button>
              <div className="memory-modal__icon">{selectedEvent.icon}</div>
              <div className="memory-modal__photo">
                <img
                  src={selectedEvent.photo}
                  alt={selectedEvent.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <span className="memory-modal__date">{selectedEvent.date}</span>
              <h3 className="memory-modal__title">{selectedEvent.title}</h3>
              <p className="memory-modal__story">{selectedEvent.story}</p>
              <p className="memory-modal__caption handwritten">"{selectedEvent.caption}"</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
