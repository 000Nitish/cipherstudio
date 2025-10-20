import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        CipherSchools
      </div>
      <div className="header-right">
        <span className="app-name">CipherStudio</span>
        
        {/* Theme Switcher */}
        <label className="theme-switcher">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;