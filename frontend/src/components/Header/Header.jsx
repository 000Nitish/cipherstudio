import React, { useContext } from 'react'; // 1. Import useContext from React
import { Link, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext'; // 2. Import ProjectContext
import './Header.css';

const Header = () => {
  // 3. Change useProject() to useContext(ProjectContext)
  const { theme, toggleTheme, token, logout } = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        CipherStudio
      </div>
      <div className="header-right">
        <span className="app-name">ChangeTheme</span>
        
        <label className="theme-switcher">
          <input 
            type="checkbox" 
            checked={theme === 'dark'} 
            onChange={toggleTheme} 
          />
          <span className="slider"></span>
        </label>
        
        {token ? (
          <button onClick={handleLogout} className="login-button">Logout</button>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;