import { Sandpack } from "@codesandbox/sandpack-react";
import { useProject } from '../../context/ProjectContext';
import './IdeLayout.css';

const IdeLayout = () => {
  // 1. Get 'theme' from the context, along with your other variables
  const { files, setFiles, activeFile, theme } = useProject();

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
        // 2. Change the hardcoded "dark" to use the theme variable
        theme={theme}
        options={{
          editorHeight: 'calc(100vh - 45px - 35px - 25px)',
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