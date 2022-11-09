import React, { useState } from 'react';
import Calendar from '../Widgets/Calendar';
import News from '../Widgets/News';
import Bookmark from '../Widgets/Bookmark';
import Project from '../Widgets/Project';

const GridBoard = () => {
  const [layout, setLayout] = useState(
    // Note
    // i: key, x & y: coordinate
    [
      { h: 6, i: '0', w: 7, x: 0, y: 0, widget: <Calendar /> },
      { h: 6, i: '1', w: 5, x: 7, y: 0, widget: <Bookmark /> },
      { h: 6, i: '2', w: 9, x: 0, y: 6, widget: <Project /> },
      { h: 6, i: '3', w: 3, x: 9, y: 6, widget: <News /> },
    ],
  );

  // TODO: add logic for recalculating layout
  // const onLayoutChange = () => {};

  return (
    <section className="grid-board w-75 h-100 p-2">
      <div className="layout position-relative w-100 h-100">
        {layout.map((l, idx) => (
          <div
            className="widget-wrapper p-2 position-absolute"
            key={idx}
            style={{
              top: `${(l.y / 12) * 100}%`,
              left: `${(l.x / 12) * 100}%`,
              width: `${(l.w / 12) * 100}%`,
              height: `${(l.h / 12) * 100}%`,
            }}>
            {l.widget}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridBoard;
