import { Sandpack } from "@codesandbox/sandpack-react";
import { useProject } from '../../context/ProjectContext';
import './IdeLayout.css';

const IdeLayout = () => {
  const { files, setFiles, activeFile } = useProject();

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
        theme="dark"
        options={{
          // RE-ADD THIS LINE WITH THE CORRECT CALCULATION
          editorHeight: 'calc(100vh - 45px - 35px - 25px)', // Total Height - Header - Controls - Footer
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