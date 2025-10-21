import React, { useState, useEffect, useContext } from 'react'; // 1. Import useContext
import { ProjectContext } from '../../context/ProjectContext'; // 2. Import ProjectContext
import * as api from '../../api/projectService';
import './ProjectList.css';

const ProjectList = ({ onClose }) => {
  const [projects, setProjects] = useState([]);
  // 3. Change useProject() to useContext(ProjectContext)
  const { loadProject } = useContext(ProjectContext);

  useEffect(() => {
    const fetchProjects = async () => {
      const userProjects = await api.getProjects();
      if (userProjects) {
        setProjects(userProjects);
      }
    };
    fetchProjects();
  }, []);

  const handleLoad = (projectId) => {
    loadProject(projectId);
    onClose(); // Close the list after loading
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="project-list-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Load Project</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id} onClick={() => handleLoad(project._id)}>
                <span className="project-name">
                  Project {project._id.slice(-6)}
                </span>
                <span className="project-date">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;