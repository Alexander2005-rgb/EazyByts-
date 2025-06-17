import React from 'react';
import shivendraImage from '../assets/shivendra.jpg';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Full Stack Developer & UI/UX Designer</h3>
            <p>Hello! I'm Shivendra, a passionate Full Stack Developer with over 3 months of experience creating innovative web applications. I specialize in JavaScript, React, Node.js, and modern web technologies.</p>
            <p>My approach combines technical expertise with a keen eye for design, resulting in applications that are not only functional but also provide an exceptional user experience.</p>
            <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or hiking in the mountains to clear my mind and find inspiration.</p>
            <div className="hero-btns">
              <a href="/path/to/cv.pdf" className="btn" target="_blank" rel="noopener noreferrer">Download CV</a>
              <a href="#contact" className="btn btn-outline">Hire Me</a>
            </div>
          </div>
          <div className="about-image">
            <img src={shivendraImage} alt="Shivendra" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
