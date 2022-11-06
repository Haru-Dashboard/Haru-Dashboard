import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { screenType } from '../../Utils/Common';
import Calendar from '../Widgets/Calendar';
import ITNews from '../Widgets/ITNews';
import Bookmark from '../Widgets/Bookmark';
import Project from '../Widgets/Project';

const GridBox = ({ width, height }: screenType) => {
  const [layout, setLayout] = useState([
    { h: 6, i: '0', w: 7, x: 0, y: 0 }, // Note i => key
    { h: 6, i: '1', w: 5, x: 7, y: 0 },
    { h: 6, i: '2', w: 9, x: 0, y: 6 },
    { h: 6, i: '3', w: 3, x: 9, y: 6 },
  ]);

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      margin={[0, 0]}
      rowHeight={height / 12}
      width={width}
      isDraggable={false}
      isResizable={false}>
      <div className="p-1" key="0">
        <Calendar width={width} height={height / 2} />
      </div>
      <div className="p-1" key="1">
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(256, 256, 256, 0.1)',
            borderRadius: '3.5rem',
          }}>
          <Bookmark />
        </div>
      </div>
      <div className="p-1" key="2">
        <Project />
      </div>
      <div className="p-1" key="3">
        <ITNews />
      </div>
    </GridLayout>
  );
};

export default GridBox;
