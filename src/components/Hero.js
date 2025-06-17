import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Hi, I'm <span>Shivendra</span><br />
            Full Stack Developer
          </h1>
          <p>
            I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even if you don't realize it yet, I want to solve your problem by creating innovative web solutions.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Developer Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
