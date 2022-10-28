import React, { useState, useEffect } from 'react';
// import Container from "react-bootstrap/Container"
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';

function App() {
  const [contentWidth, setContentWidth] = useState(0);
  useEffect(() => {
    const screenWidth = window.screen.width;
    setContentWidth(screenWidth * 0.8);
  });

  return (
    <div className="App">
      <div className="mx-auto" style={{ width: contentWidth }}>
        <Basic />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
