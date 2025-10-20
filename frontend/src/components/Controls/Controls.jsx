import React from 'react';
import { useProject } from '../../context/ProjectContext';
import './Controls.css';

const Controls = () => {
  const { saveCurrentProject, loadProject } = useProject();

  const handleLoad = () => {
    const projectId = prompt("Please enter the Project ID to load:");
    if (projectId) {
      loadProject(projectId.trim());
    }
  };

  return (
    <div className="controls-bar">
      <button onClick={saveCurrentProject}>Save Project</button>
      <button onClick={handleLoad}>Load Project</button>
    </div>
  );
};

export default Controls;