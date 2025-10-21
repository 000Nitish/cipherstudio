import React, { useState, useContext } from 'react'; // 1. Import useContext
import { ProjectContext } from '../../context/ProjectContext'; // 2. Import ProjectContext
import ProjectList from '../ProjectList/ProjectList';
import './Controls.css';

const Controls = () => {
  // 3. Change useProject() to useContext(ProjectContext)
  const { saveCurrentProject } = useContext(ProjectContext);
  const [showProjectList, setShowProjectList] = useState(false);

  return (
    <>
      <div className="controls-bar">
        <button onClick={saveCurrentProject}>Save Project</button>
        <button onClick={() => setShowProjectList(true)}>Load Project</button>
      </div>
      
      {showProjectList && <ProjectList onClose={() => setShowProjectList(false)} />}
    </>
  );
};

export default Controls;