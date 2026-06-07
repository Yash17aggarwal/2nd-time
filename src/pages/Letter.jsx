import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CONFIG from '../config';
import './Letter.css';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const openEnvelope = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 1200);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setAudioError(true));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="letter-page">
      {/* ── Envelope Entry ── */}
      <AnimatePresence>
        {!showLetter && (
          <motion.section
            className="envelope-section"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="envelope-container"
            >
              <h2 className="envelope-title">My Letter To You <span>💌</span></h2>
              <p className="envelope-subtitle">A letter I've been writing with my heart.</p>

              <button
                className={`envelope ${isOpen ? 'envelope--open' : ''}`}
                onClick={openEnvelope}
                disabled={isOpen}
                aria-label="Open letter"
              >
                <div className="envelope__flap" />
                <div className="envelope__body">
                  <div className="envelope__letter-peek">
                    <span>💌</span>
                  </div>
                </div>
                <div className="envelope__glow" />
              </button>

              {!isOpen && (
                <motion.p
                  className="envelope-hint"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open
                </motion.p>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Letter Content ── */}
      {showLetter && (
        <motion.div
          className="letter-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Stardust particles */}
          <div className="letter-stardust">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="stardust-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 8}s`,
                  '--drift': `${(Math.random() - 0.5) * 100}px`,
                }}
              />
            ))}
          </div>

          <div className="letter-scroll">
            {/* ── Opening ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="letter-greeting handwritten">
                My Dearest {CONFIG.herName},
              </h3>
              <div className="letter-body">
                {CONFIG.letter.opening.split('\n\n').map((para, i) => (
                  <p key={i} className="letter-text">{para}</p>
                ))}
              </div>
            </motion.section>

            {/* ── Why I Love You ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Why I Love You</h4>
              <div className="section-divider" />
              <div className="letter-body">
                {CONFIG.letter.whyILoveYou.split('\n\n').map((para, i) => (
                  <p key={i} className="letter-text">{para}</p>
                ))}
              </div>
            </motion.section>

            {/* ── Long Distance ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Across The Stars</h4>
              <div className="section-divider" />

              <div className="letter-distance-visual">
                <div className="letter-planet">🌍</div>
                <div className="letter-stars-bridge">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="bridge-star" style={{ animationDelay: `${i * 0.4}s` }}>✨</span>
                  ))}
                </div>
                <div className="letter-planet">🪐</div>
              </div>

              <div className="letter-body">
                {CONFIG.letter.longDistance.split('\n\n').map((para, i) => (
                  <p key={i} className="letter-text">{para}</p>
                ))}
              </div>
            </motion.section>

            {/* ── Favorite Memories ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Our Favorite Memories</h4>
              <div className="section-divider" />
              <div className="letter-memories">
                {CONFIG.letter.favoriteMemories.map((mem, i) => (
                  <motion.button
                    key={i}
                    className="letter-memory-star"
                    onClick={() => setSelectedMemory(mem)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="letter-memory-star__icon">⭐</span>
                    <span className="letter-memory-star__title">{mem.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* ── Birthday Message ── */}
            <motion.section
              className="letter-section letter-section--birthday"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="birthday-header">
                <h3 className="birthday-title">
                  Happy Birthday My Love <span>❤️</span>
                </h3>
                <div className="birthday-stars">
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="birthday-star-particle"
                      style={{
                        '--angle': `${i * 30}deg`,
                        '--distance': `${60 + Math.random() * 40}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    >
                      ✨
                    </span>
                  ))}
                </div>
              </div>
              <div className="letter-body">
                {CONFIG.letter.birthdayMessage.split('\n\n').map((para, i) => (
                  <p key={i} className="letter-text">{para}</p>
                ))}
              </div>
            </motion.section>

            {/* ── Promises ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Promises I'll Always Keep</h4>
              <div className="section-divider" />
              <div className="promises-list">
                {CONFIG.letter.promises.map((promise, i) => (
                  <motion.div
                    key={i}
                    className="promise-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <span className="promise-star">⭐</span>
                    <span className="promise-text">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Future Dreams ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Our Future Written In The Stars</h4>
              <div className="section-divider" />
              <div className="dreams-grid">
                {CONFIG.letter.futureDreams.map((dream, i) => (
                  <motion.div
                    key={i}
                    className="dream-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  >
                    <span className="dream-icon">{dream.icon}</span>
                    <h5 className="dream-title">{dream.title}</h5>
                    <p className="dream-desc">{dream.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Voice Note ── */}
            <motion.section
              className="letter-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h4 className="letter-heading">Listen To My Heart 🎵</h4>
              <div className="section-divider" />
              <div className="voice-note glass-card">
                <div className="voice-note__visual">
                  <div className={`voice-wave ${isPlaying ? 'voice-wave--playing' : ''}`}>
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="voice-wave__bar"
                        style={{
                          animationDelay: `${i * 0.05}s`,
                          height: `${10 + Math.random() * 30}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <button className="voice-note__play" onClick={toggleAudio}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <p className="voice-note__label">
                  {audioError ? 'Add your audio to /public/audio/voice-note.mp3' : 'My voice, just for you'}
                </p>
                <audio
                  ref={audioRef}
                  src={CONFIG.voiceNote}
                  onEnded={() => setIsPlaying(false)}
                  onError={() => setAudioError(true)}
                />
              </div>
            </motion.section>

            {/* ── Closing ── */}
            <motion.section
              className="letter-section letter-section--closing"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <div className="letter-body">
                {CONFIG.letter.closing.split('\n\n').map((para, i) => (
                  <p key={i} className="letter-text">{para}</p>
                ))}
              </div>

              <div className="letter-closing-heart">
                <motion.div
                  animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ❤️
                </motion.div>
              </div>

              <div className="letter-signature">
                <p className="letter-text">Forever Yours,</p>
                <p className="letter-signature-name handwritten">{CONFIG.yourName}</p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      )}

      {/* ── Memory Popup ── */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            className="reason-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="reason-popup"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="reason-popup__star">⭐</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                {selectedMemory.title}
              </h3>
              <p className="letter-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                {selectedMemory.description}
              </p>
              <button className="reason-popup__close" onClick={() => setSelectedMemory(null)}>
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
