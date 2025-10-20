import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-bar">
      <div className="footer-section footer-left">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
      </div>
      <div className="footer-section footer-right">
        <span>JavaScript</span>
        <span>🔔 0</span>
      </div>
    </footer>
  );
};

export default Footer;