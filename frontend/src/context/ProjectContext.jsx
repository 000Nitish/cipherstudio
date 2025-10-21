import React, { createContext, useState, useContext, useEffect } from 'react'; // 1. Make sure useContext is imported
import * as api from '../api/projectService.js';
import * as authApi from '../api/authService.js';

// 2. Export the context directly
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // All your existing states are here
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [theme, setTheme] = useState('dark');
  
  // States needed for saving and auth
  const [projectId, setProjectId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Auto-save feature
  useEffect(() => {
    if (projectId && Object.keys(files).length > 0) {
      const timer = setTimeout(() => {
        api.updateProject(projectId, files);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [files, projectId]);

  // All your existing file management functions are here
  const addNewFileOrFolder = (name) => {
    setFiles(prev => ({ ...prev, [name]: { code: '' } }));
    setActiveFile(name);
  };
  const deleteFile = (path) => { /* ...your full delete logic... */ };
  const renameFile = (oldPath, newPath) => { /* ...your full rename logic... */ };
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  // Your project save/load and auth functions are here
  const saveCurrentProject = async () => {
    if (Object.keys(files).length === 0) return alert("Cannot save an empty project.");
    
    const newProject = await api.saveProject(files);
    if (newProject && newProject._id) {
      setProjectId(newProject._id);
      alert(`Project saved! Your new Project ID is: ${newProject._id}`);
    }
  };

  const loadProject = async (id) => {
    const project = await api.getProjectById(id);
    if (project && project.files) {
      setFiles(project.files);
      setProjectId(id);
      setActiveFile(Object.keys(project.files)[0]);
    }
  };

  const login = async (userData) => {
    const response = await authApi.login(userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // This 'value' object is unchanged
  const value = {
    files, setFiles,
    activeFile, setActiveFile,
    theme, toggleTheme,
    projectId,
    token, user,
    addNewFileOrFolder,
    deleteFile,
    renameFile,
    saveCurrentProject,
    loadProject,
    login,
    logout,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// 3. The 'useProject' hook has been deleted from this file to fix the error.