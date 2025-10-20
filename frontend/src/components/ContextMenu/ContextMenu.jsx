import React from 'react';
import './ContextMenu.css';

const ContextMenu = ({ x, y, onRename, onDelete, onClose }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }} onMouseLeave={onClose}>
      <ul>
        <li onClick={onRename}>Rename</li>
        <li onClick={onDelete}>Delete</li>
      </ul>
    </div>
  );
};

export default ContextMenu;