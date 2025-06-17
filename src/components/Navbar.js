import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We will create this CSS or use global styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="container">
        <a href="#" className="logo">
          <i className="fas fa-code"></i>Shivendra Portfolio
        </a>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/skill" onClick={() => setIsOpen(false)}>Skills</Link></li>
          <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/login" onClick={() => setIsOpen(false)}>CMS</Link></li>
          
        </ul>
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
