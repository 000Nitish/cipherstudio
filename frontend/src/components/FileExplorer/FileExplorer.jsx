import React, { useState, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import './FileExplorer.css';

const FileExplorer = () => {
  const { files, activeFile, setActiveFile, addNewFileOrFolder } = useProject();
  const [isCreating, setIsCreating] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const fileTree = useMemo(() => {
    const tree = {};
    Object.keys(files).forEach(path => {
      let currentLevel = tree;
      const parts = path.substring(1).split('/');
      parts.forEach((part, index) => {
        if (!part) return; // Skip empty parts from trailing slashes
        if (!currentLevel[part]) {
          currentLevel[part] = {};
        }
        if (index === parts.length - 1 && !path.endsWith('/')) {
          currentLevel[part].__isFile = true;
        }
        currentLevel = currentLevel[part];
      });
    });
    return tree;
  }, [files]);

  const handleCreate = () => {
    if (!newItemName) {
      setIsCreating(null);
      return;
    }
    const basePath = selectedFolder ? `${selectedFolder}` : '';
    let newPath = isCreating === 'folder' 
      ? `${basePath}/${newItemName}/` 
      : `${basePath}/${newItemName}`;
    
    newPath = newPath.replace(/^\//, ''); // Remove leading slash if it exists
    addNewFileOrFolder(`/${newPath}`);
    
    setNewItemName('');
    setIsCreating(null);
    setSelectedFolder('');
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreate();
    else if (e.key === 'Escape') {
      setNewItemName('');
      setIsCreating(null);
      setSelectedFolder('');
    }
  };

  const handleNewItemClick = (type) => {
    setIsCreating(type);
    // If no folder is selected, the creation path is the root
    if (!selectedFolder) {
      setSelectedFolder('');
    }
  };

  const renderTree = (tree, path = '') => (
    <ul>
      {Object.keys(tree).sort().map(name => {
        if (name === '__isFile') return null;
        const currentPath = `${path}/${name}`;
        const isFile = tree[name].__isFile;
        
        return (
          <li key={currentPath}>
            <div
              className={`file-item ${activeFile === currentPath ? 'active' : ''}`}
              onClick={() => {
                if (isFile) {
                  setActiveFile(currentPath);
                  setSelectedFolder(path); // Select the parent folder
                } else {
                  setSelectedFolder(currentPath);
                }
              }}
            >
              {isFile ? '📄' : '📁'} {name}
            </div>
            {!isFile && Object.keys(tree[name]).length > 0 && renderTree(tree[name], currentPath)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="file-explorer">
      <div className="file-explorer-header">
        <span>FILES</span>
        <div className="action-icons">
          {/* ADDED ICONS ONCLICK HANDLERS */}
          <button onClick={() => handleNewItemClick('file')} title="New File">📄</button>
          <button onClick={() => handleNewItemClick('folder')} title="New Folder">📁</button>
          {/* RELOAD BUTTON ADDED BACK */}
          <button title="Reload" onClick={() => window.location.reload()}>🔄</button>
        </div>
      </div>
      {renderTree(fileTree)}
      {isCreating && (
        <div className="new-item-input-container">
          <span>{isCreating === 'file' ? '📄' : '📁'}</span>
          <input
            type="text" autoFocus value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={handleKeyDown} onBlur={handleCreate}
            className="new-item-input"
          />
        </div>
      )}
    </aside>
  );
};

export default FileExplorer;