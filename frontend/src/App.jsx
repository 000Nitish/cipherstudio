// 1. Import 'useContext' from React and 'ProjectContext'
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProjectProvider, ProjectContext } from './context/ProjectContext';
import './App.css';

const AppContent = () => {
  // 2. Change 'useProject()' to 'useContext(ProjectContext)'
  const { theme } = useContext(ProjectContext);
  
  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ProjectProvider>
      <Router>
        <AppContent />
      </Router>
    </ProjectProvider>
  );
}

export default App;