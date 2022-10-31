import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { screenType } from '../../App';

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
        Calendar
      </div>
      <div className="p-1" key="1">
        Bookmark
      </div>
      <div className="p-1" key="2">
        In Progress
      </div>
      <div className="p-1" key="3">
        IT News
      </div>
    </GridLayout>
  );
};

export default GridBox;
