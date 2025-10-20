import React, { createContext, useState, useContext } from 'react';

const defaultFiles = {
  "/App.js": { code: `export default function App() {\n  return <h1>Hello CipherStudio!</h1>\n}` },
  "/styles.css": { code: `body { font-family: sans-serif; }` },
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFile, setActiveFile] = useState("/App.js");
  
  // NEW: Add state for the theme
  const [theme, setTheme] = useState('dark'); // 'dark' is the default

  // Your existing function (unchanged)
  const addNewFileOrFolder = (name) => {
    setFiles(prev => ({ ...prev, [name]: { code: '' } }));
    setActiveFile(name);
  };

  // Your existing function (unchanged)
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

  // Your existing function (unchanged)
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

  // NEW: Function to toggle the theme
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    addNewFileOrFolder,
    deleteFile,
    renameFile,
    theme,        // Expose the new theme state
    toggleTheme,  // Expose the new toggle function
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);