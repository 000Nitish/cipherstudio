import React from 'react';
import HomePage from './pages/HomePage';
import { ProjectProvider } from './context/ProjectContext'; // Import the provider
import './App.css';

function App() {
  return (
    // Wrap HomePage with the ProjectProvider
    <ProjectProvider>
      <div className="App">
        <HomePage />
      </div>
    </ProjectProvider>
  );
}

export default App;