import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CONFIG from '../config';
import './Gallery.css';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState('all');
  const [foundSecret, setFoundSecret] = useState(false);

  const filteredPhotos = filter === 'all'
    ? CONFIG.galleryPhotos
    : CONFIG.galleryPhotos.filter(p => p.category === filter);

  return (
    <div className="gallery-page">
      {/* ── Header ── */}
      <section className="section section-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>Universe <span className="text-gradient">Gallery</span></h2>
          <div className="section-divider" />
          <p>Every photo is a star in the constellation of our love.</p>
        </motion.div>
      </section>

      {/* ── Filter Buttons ── */}
      <div className="gallery-filters">
        {[
          { key: 'all', label: 'All Memories' },
          { key: 'her', label: 'Her ✨' },
          { key: 'us', label: 'Us Together 💕' },
        ].map(f => (
          <button
            key={f.key}
            className={`gallery-filter ${filter === f.key ? 'gallery-filter--active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Photo Grid ── */}
      <section className="section gallery-grid-section">
        <motion.div className="gallery-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.src}
                className="gallery-item"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="gallery-item__frame">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('gallery-item__frame--placeholder');
                      e.target.parentElement.innerHTML = `<div class="gallery-placeholder">📸<br/><small>${photo.caption}</small></div>`;
                    }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__caption handwritten">{photo.caption}</span>
                  </div>
                </div>
                <div className="gallery-item__glow" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Before & After ── */}
      <section className="section">
        <motion.div
          className="before-after"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h3 className="before-after__title">Before & After You</h3>
          <div className="section-divider" />
          <div className="before-after__grid">
            <div className="before-after__side before-after__side--before">
              <h4>My World Before You</h4>
              <div className="before-after__photos">
                {CONFIG.beforePhotos.map((p, i) => (
                  <div key={i} className="before-after__photo before-after__photo--muted">
                    <img
                      src={p.src}
                      alt={p.caption}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="gallery-placeholder small">🌑<br/><small>${p.caption}</small></div>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="before-after__divider">
              <div className="before-after__arrow">→</div>
            </div>
            <div className="before-after__side before-after__side--after">
              <h4>My World After You</h4>
              <div className="before-after__photos">
                {CONFIG.afterPhotos.map((p, i) => (
                  <div key={i} className="before-after__photo before-after__photo--bright">
                    <img
                      src={p.src}
                      alt={p.caption}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="gallery-placeholder small bright">🌟<br/><small>${p.caption}</small></div>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="before-after__quote handwritten">
            "Everything became brighter when you entered my life."
          </p>
        </motion.div>
      </section>

      {/* ── Polaroid Wall ── */}
      <section className="section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="section-header">
            <h3>Polaroid <span className="text-gradient">Memories</span></h3>
            <div className="section-divider" />
          </div>
          <div className="polaroid-wall">
            {CONFIG.galleryPhotos.slice(0, 6).map((photo, i) => (
              <motion.div
                key={i}
                className="polaroid"
                style={{
                  '--rotate': `${(Math.random() - 0.5) * 12}deg`,
                  '--delay': `${i * 0.2}s`,
                }}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: `var(--rotate)` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 10 }}
              >
                <div className="polaroid__photo">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="gallery-placeholder small">💕</div>`;
                    }}
                  />
                </div>
                <p className="polaroid__caption handwritten">❤️ {photo.caption}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Hidden Secret ── */}
      <div
        className="hidden-secret"
        onMouseEnter={() => {
          if (!foundSecret) setFoundSecret(true);
        }}
        onClick={() => {
          if (!foundSecret) setFoundSecret(true);
        }}
      >
        <span className="hidden-secret__trigger">✦</span>
      </div>

      <AnimatePresence>
        {foundSecret && (
          <motion.div
            className="secret-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFoundSecret(false)}
          >
            <motion.div
              className="secret-reveal__content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="secret-reveal__hearts">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="secret-heart"
                    style={{
                      '--x': `${Math.random() * 100}%`,
                      '--delay': `${Math.random() * 0.5}s`,
                      '--size': `${Math.random() * 1.5 + 0.5}rem`,
                    }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
              <p className="secret-reveal__text">{CONFIG.hiddenSurpriseMessage}</p>
              <span className="secret-reveal__close">tap to close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Photo Modal ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photo-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="photo-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="photo-modal__close" onClick={() => setSelectedPhoto(null)}>✕</button>
              <div className="photo-modal__image">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<div class="gallery-placeholder large">📸<br/>${selectedPhoto.caption}</div>`;
                  }}
                />
              </div>
              <div className="photo-modal__info">
                <h3 className="handwritten">{selectedPhoto.caption}</h3>
                <span>{selectedPhoto.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
