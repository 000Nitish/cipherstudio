import React from 'react';
import Header from '../components/Header/Header.jsx';
import FileExplorer from '../components/FileExplorer/FileExplorer.jsx';
import IdeLayout from '../components/IdeLayout/IdeLayout.jsx';
import Controls from '../components/Controls/Controls.jsx';
import Footer from '../components/Footer/Footer.jsx'; // 1. Import the Footer
import './Homepage.css';


const HomePage = () => {
  return (
    // 2. Add a new wrapper div for the main layout
    <div className="app-layout"> 
      <Header />
      <Controls />
      <div className="main-content">
        <FileExplorer />
        <main className="editor-container">
          <IdeLayout />
        </main>
      </div>
      <Footer /> {/* 3. Add the Footer component at the end */}
    </div>
  );
};

export default HomePage;