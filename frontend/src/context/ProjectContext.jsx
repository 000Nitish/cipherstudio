import React, { createContext, useState, useContext } from 'react';

const defaultFiles = {
  "/App.js": { code: `export default function App() {\n  return <h1>Hello CipherStudio!</h1>\n}` },
  "/styles.css": { code: `body { font-family: sans-serif; }` },
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFile, setActiveFile] = useState("/App.js");

  // Your existing function (unchanged)
  const addNewFileOrFolder = (name) => {
    setFiles(prev => ({ ...prev, [name]: { code: '' } }));
    setActiveFile(name);
  };

  // NEW: Function to delete a file or folder
  const deleteFile = (path) => {
    setFiles(currentFiles => {
      const newFiles = { ...currentFiles };
      if (path.endsWith('/')) { // If it's a folder
        for (const key in newFiles) {
          if (key.startsWith(path)) {
            delete newFiles[key];
          }
        }
      } else { // If it's a file
        delete newFiles[path];
      }
      
      if (activeFile && activeFile.startsWith(path)) {
        setActiveFile(Object.keys(newFiles)[0] || null);
      }
      
      return newFiles;
    });
  };

  // NEW: Function to rename a file or folder
  const renameFile = (oldPath, newPath) => {
    setFiles(currentFiles => {
      const newFiles = { ...currentFiles };
      if (oldPath.endsWith('/')) { // If it's a folder
        for (const key in newFiles) {
          if (key.startsWith(oldPath)) {
            const newKey = key.replace(oldPath, newPath);
            newFiles[newKey] = newFiles[key];
            delete newFiles[key];
          }
        }
      } else { // If it's a file
        newFiles[newPath] = newFiles[oldPath];
        delete newFiles[oldPath];
      }

      if (activeFile === oldPath) {
        setActiveFile(newPath);
      }
      
      return newFiles;
    });
  };

  const value = {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    addNewFileOrFolder,
    deleteFile, // Expose the new functions
    renameFile, // Expose the new functions
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);