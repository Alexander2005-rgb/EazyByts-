import React from 'react';

const footerStyle = {
  width: '100%',
  backgroundColor: '#282c34',
  color: 'white',
  textAlign: 'center',
  padding: '10px 0',
  fontSize: '14px',
  boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
};

const linkStyle = {
  color: '#61dafb',
  margin: '0 10px',
  textDecoration: 'none',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div>
        &copy; {new Date().getFullYear()} Shivendra Portfolio. All rights reserved.
      </div>
      <div>
        <a href="https://github.com/shivendra" style={linkStyle} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/shivendra" style={linkStyle} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:shivendra@example.com" style={linkStyle}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
