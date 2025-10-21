import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import ProjectList from '../ProjectList/ProjectList'; // 1. Import the new ProjectList component
import './Controls.css';

const Controls = () => {
  const { saveCurrentProject } = useProject();
  // 2. Add state to show/hide the project list modal
  const [showProjectList, setShowProjectList] = useState(false);

  return (
    // Use a React Fragment <> to wrap multiple components
    <>
      <div className="controls-bar">
        <button onClick={saveCurrentProject}>Save Project</button>
        {/* 3. Make the button toggle the modal's visibility */}
        <button onClick={() => setShowProjectList(true)}>Load Project</button>
      </div>
      
      {/* 4. Conditionally render the ProjectList modal */}
      {showProjectList && <ProjectList onClose={() => setShowProjectList(false)} />}
    </>
  );
};

export default Controls;