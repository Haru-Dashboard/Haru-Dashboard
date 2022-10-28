import React, { useEffect, useState } from 'react';
import Todo from '../Widgets/Todo';

const DashBoard = () => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(()=>{
    // full screen width
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    setScreenWidth(Math.ceil(screenWidth*0.8))
    setScreenHeight(Math.ceil(screenHeight*0.65))
  })
  return (<div className='default-full-bg'>
    {/* 
      main board 
      - add widget component inside div
    */}
    <div className='main-board'
      style={{height: `${screenHeight}px`, width: `${screenWidth}px`}}>
      {/* todo widget */}
      <Todo screenWidth={screenWidth} screenHeight={screenHeight}/>
      {/* <p>{screenHeight}, {screenWidth}</p> */}
    </div>
  </div>);
};

export default DashBoard;
