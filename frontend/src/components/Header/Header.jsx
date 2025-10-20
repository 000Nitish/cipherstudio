import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link from react-router-dom
import { useProject } from '../../context/ProjectContext';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useProject();

  return (
    <header className="header">
      <div className="logo">
        CipherSchools
      </div>
      <div className="header-right">
        <span className="app-name">CipherStudio</span>
        
        <label className="theme-switcher">
          <input 
            type="checkbox" 
            checked={theme === 'dark'} 
            onChange={toggleTheme} 
          />
          <span className="slider"></span>
        </label>
        
        {/* 2. Replace the <button> with a <Link> component */}
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </header>
  );
};

export default Header;