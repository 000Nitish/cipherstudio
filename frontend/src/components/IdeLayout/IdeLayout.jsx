import React, { useContext } from 'react'; // 1. Import useContext
import { Sandpack } from "@codesandbox/sandpack-react";
import { ProjectContext } from '../../context/ProjectContext'; // 2. Import ProjectContext
import './Idelayout.css';

const IdeLayout = () => {
  // 3. Change useProject() to useContext(ProjectContext)
  const { files, setFiles, activeFile, theme } = useContext(ProjectContext);

  const handleCodeUpdate = (newCode) => {
    if (activeFile) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [activeFile]: { ...prevFiles[activeFile], code: newCode },
      }));
    }
  };

  return (
    <div className="ide-wrapper">
      <Sandpack
        template="react"
        theme={theme}
        // 4. FIX: Use the 'layout' prop for a 50/50 split screen
        layout="split" 
        options={{
          // The old 'editorHeight' is removed to allow for the split layout
          showTabs: true,
          showLineNumbers: true,
          activeFile: activeFile,
        }}
        files={files}
        onCodeUpdate={handleCodeUpdate}
      />
    </div>
  );
};

export default IdeLayout;