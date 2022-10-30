import React, { useState, useEffect } from 'react';
// import Container from "react-bootstrap/Container"
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';


function App() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    setScreenWidth(screenWidth);
    setScreenHeight(screenHeight);
  });

  return (
    <div className="App">
      <div className="mx-auto" style={{ width: screenWidth * 0.8 }}>
        <Basic width={screenWidth * 0.8} height={screenHeight * 0.12} />
        <Dashboard width={screenWidth * 0.8} height={screenHeight * 0.6} />
      </div>
    </div>
  );
}

export default App;
