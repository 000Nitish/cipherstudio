import React from 'react';
import { useProject } from '../../context/ProjectContext'; // 1. Import useProject
import './Header.css';

const Header = () => {
  // 2. Get theme and toggleTheme from the context
  const { theme, toggleTheme } = useProject();

  return (
    <header className="header">
      <div className="logo">
        CipherSchools
      </div>
      <div className="header-right">
        <span className="app-name">CipherStudio</span>
        
        <label className="theme-switcher">
          {/* 3. Connect the switch to our state and function */}
          <input 
            type="checkbox" 
            checked={theme === 'dark'} 
            onChange={toggleTheme} 
          />
          <span className="slider"></span>
        </label>
        
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Header;