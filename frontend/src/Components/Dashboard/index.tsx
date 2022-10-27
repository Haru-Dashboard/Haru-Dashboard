import React, { useEffect, useState } from 'react';

const DashBoard = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(()=>{
    // full screen width
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    setScreenWidth(screenWidth*0.8)
    setScreenHeight(screenHeight*0.7)
  })
  return (<div className='default-full-bg'>
    {/* 
      main board 
      - add widget component inside div
    */}
    <div className='main-board'
      style={{height: `${screenHeight}px`, width: `${screenWidth}px`}}>

    </div>
  </div>);
};

export default DashBoard;
