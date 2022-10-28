import React, { useEffect, useState } from 'react';

const DashBoard = () => {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const screenHeight = window.screen.height;
    setScreenHeight(screenHeight * 0.65);
  });

  return (
    <div
      className="main-board w-100"
      style={{
        height: `${screenHeight}px`,
      }}>
      {/* 
        main board 
        - add widget component inside div
      */}
    </div>
  );
};

export default DashBoard;
