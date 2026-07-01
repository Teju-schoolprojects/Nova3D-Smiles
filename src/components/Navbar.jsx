import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export default function Navbar({ onBookClick, currentView, onViewChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a 
          href="#" 
          className="logo" 
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            onViewChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Cpu size={24} color="var(--primary)" style={{ filter: 'drop-shadow(var(--glow-cyan))' }} />
          <span>Nova3D</span> Smiles
        </a>

        <button 
          className="menu-toggle" 
          onClick={toggleMobileMenu} 
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          id="menu-toggle-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
          <li>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          </li>
          <li>
            <a href="#tech" onClick={(e) => handleLinkClick(e, 'tech')}>3D Tech</a>
          </li>
          <li>
            <a href="#simulator" onClick={(e) => handleLinkClick(e, 'simulator')}>3D Simulator</a>
          </li>
          <li>
            <a href="#calculator" onClick={(e) => handleLinkClick(e, 'calculator')}>Cost Calculator</a>
          </li>
          <li>
            <a href="#quiz" onClick={(e) => handleLinkClick(e, 'quiz')}>Smile Quiz</a>
          </li>
          <li>
            <a href="#team" onClick={(e) => handleLinkClick(e, 'team')}>Specialists</a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')}>FAQs</a>
          </li>
          <li className="nav-btn-container">
            <button 
              className="nav-btn" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              id="nav-book-btn"
            >
              Book 3D Scan
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
