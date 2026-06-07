import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CosmicBackground from './components/CosmicBackground';
import Navigation from './components/Navigation';
import FloatingMessages from './components/FloatingMessages';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Gallery from './pages/Gallery';
import Reasons from './pages/Reasons';
import Letter from './pages/Letter';
import Birthday from './pages/Birthday';
import Forever from './pages/Forever';
import './App.css';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div {...pageTransition}><Home /></motion.div>
        } />
        <Route path="/our-story" element={
          <motion.div {...pageTransition}><OurStory /></motion.div>
        } />
        <Route path="/gallery" element={
          <motion.div {...pageTransition}><Gallery /></motion.div>
        } />
        <Route path="/reasons" element={
          <motion.div {...pageTransition}><Reasons /></motion.div>
        } />
        <Route path="/letter" element={
          <motion.div {...pageTransition}><Letter /></motion.div>
        } />
        <Route path="/birthday" element={
          <motion.div {...pageTransition}><Birthday /></motion.div>
        } />
        <Route path="/forever" element={
          <motion.div {...pageTransition}><Forever /></motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <CosmicBackground />
        <Navigation />
        <FloatingMessages />
        <ScrollToTop />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
