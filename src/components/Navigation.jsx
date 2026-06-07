import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: '✨' },
  { path: '/our-story', label: 'Our Story', icon: '🌌' },
  { path: '/gallery', label: 'Gallery', icon: '📸' },
  { path: '/reasons', label: 'Why I Love You', icon: '💫' },
  { path: '/letter', label: 'My Letter', icon: '💌' },
  { path: '/birthday', label: 'Birthday Gift', icon: '🎁' },
  { path: '/forever', label: 'Forever Us', icon: '💕' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <NavLink to="/" className="nav__logo">
          <span className="nav__logo-heart">❤️</span>
          <span className="nav__logo-text">My Universe</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="nav__links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav__link ${isActive ? 'nav__link--active' : ''}`
              }
            >
              <span className="nav__link-icon">{item.icon}</span>
              <span className="nav__link-label">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`nav__toggle ${isOpen ? 'nav__toggle--active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav__mobile-link ${isActive ? 'nav__mobile-link--active' : ''}`
                  }
                >
                  <span className="nav__mobile-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
