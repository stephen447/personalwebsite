import './App.css';
import HomePage from './pages/HomePage/HomePage';
import React, { useState } from 'react';
import WelcomeOverlay from './components/WelcomeOverlay/WelcomeOverlay';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Update the mouse position
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div className='app' onMouseMove={handleMouseMove}>
        <WelcomeOverlay><HomePage /></WelcomeOverlay>
        <div
        className="glow"
        style={{ left: mousePosition.x-125, top: mousePosition.y-125 }}
      ></div>
    </div>

  );
}

export default App;
