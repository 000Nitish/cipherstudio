import React from 'react';
import HomePage from './pages/HomePage';
import { ProjectProvider, useProject } from './context/ProjectContext'; // Import useProject
import './App.css';

// Create a new component so we can access the context
const AppContent = () => {
  const { theme } = useProject(); // Get the theme from the context

  return (
    // Add the theme as a class name
    <div className={`App ${theme}`}>
      <HomePage />
    </div>
  );
}

function App() {
  return (
    // The provider must be on the outside
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}

export default App;