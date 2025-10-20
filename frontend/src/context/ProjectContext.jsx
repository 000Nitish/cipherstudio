import React, { createContext, useState, useContext } from 'react';

const defaultFiles = {
  "/App.js": { code: `export default function App() {\n  return <h1>Hello CipherStudio!</h1>\n}` },
  "/styles.css": { code: `body { font-family: sans-serif; }` },
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFile, setActiveFile] = useState("/App.js");

  // Simplified function
  const addNewFileOrFolder = (name) => {
    setFiles(prev => ({ ...prev, [name]: { code: '' } }));
    setActiveFile(name);
  };

  const value = {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    addNewFileOrFolder, // Use this new function
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);