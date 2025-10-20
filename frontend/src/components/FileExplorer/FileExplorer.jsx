import React, { useState, useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import ContextMenu from '../ContextMenu/ContextMenu'; // 1. Import ContextMenu
import './FileExplorer.css';

const FileExplorer = () => {
  // 2. Get the new functions from the context
  const { files, activeFile, setActiveFile, addNewFileOrFolder, deleteFile, renameFile } = useProject();
  
  // Your existing states (unchanged)
  const [isCreating, setIsCreating] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  // 3. Add state for the context menu
  const [menu, setMenu] = useState(null);

  // Your existing fileTree logic (unchanged)
  const fileTree = useMemo(() => {
    const tree = {};
    Object.keys(files).forEach(path => {
      let currentLevel = tree;
      const parts = path.substring(1).split('/');
      parts.forEach((part, index) => {
        if (!part) return;
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

  // Your existing creation logic (unchanged)
  const handleCreate = () => {
    if (!newItemName) {
      setIsCreating(null);
      return;
    }
    const basePath = selectedFolder ? `${selectedFolder}` : '';
    let newPath = isCreating === 'folder' 
      ? `${basePath}/${newItemName}/` 
      : `${basePath}/${newItemName}`;
    newPath = newPath.replace(/^\//, '');
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
    if (!selectedFolder) {
      setSelectedFolder('');
    }
  };
  
  // 4. Add handlers for the menu actions
  const handleContextMenu = (e, filePath) => {
    e.preventDefault();
    setMenu({ x: e.pageX, y: e.pageY, file: filePath });
  };
  const closeMenu = () => setMenu(null);
  const handleRename = () => {
    const oldPath = menu.file;
    const isFolder = oldPath.endsWith('/');
    const oldName = isFolder ? oldPath.slice(0, -1).split('/').pop() : oldPath.split('/').pop();
    const newName = prompt("Enter new name:", oldName);
    
    if (newName && newName !== oldName) {
      const newPath = oldPath.substring(0, oldPath.lastIndexOf('/')) + '/' + newName + (isFolder ? '/' : '');
      renameFile(oldPath, newPath);
    }
    closeMenu();
  };
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${menu.file}?`)) {
      deleteFile(menu.file);
    }
    closeMenu();
  };

  // Your existing renderTree function, with one small addition
  const renderTree = (tree, path = '') => (
    <ul>
      {Object.keys(tree).sort().map(name => {
        if (name === '__isFile') return null;
        const currentPath = `${path}/${name}${tree[name].__isFile ? '' : '/'}`;
        const isFile = tree[name].__isFile;
        
        return (
          <li key={currentPath}>
            {/* 5. Add onContextMenu to the file/folder item */}
            <div
              className={`file-item ${activeFile === currentPath ? 'active' : ''}`}
              onContextMenu={(e) => handleContextMenu(e, currentPath)}
              onClick={() => {
                if (isFile) {
                  setActiveFile(currentPath);
                  setSelectedFolder(path);
                } else {
                  setSelectedFolder(currentPath);
                }
              }}
            >
              {isFile ? '📄' : '📁'} {name}
            </div>
            {!isFile && Object.keys(tree[name]).length > 1 && renderTree(tree[name], currentPath)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="file-explorer" onClick={() => menu && closeMenu()}>
      {/* Your existing header (unchanged) */}
      <div className="file-explorer-header">
        <span>FILES</span>
        <div className="action-icons">
          <button onClick={() => handleNewItemClick('file')} title="New File">📄</button>
          <button onClick={() => handleNewItemClick('folder')} title="New Folder">📁</button>
          <button title="Reload" onClick={() => window.location.reload()}>🔄</button>
        </div>
      </div>
      
      {renderTree(fileTree)}

      {/* Your existing input field (unchanged) */}
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

      {/* 6. Conditionally render the ContextMenu */}
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onRename={handleRename}
          onDelete={handleDelete}
          onClose={closeMenu}
        />
      )}
    </aside>
  );
};

export default FileExplorer;