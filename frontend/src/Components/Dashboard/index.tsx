import React from 'react';
import GridBox from './GridBox';
import { screenType } from '../../App';

const DashBoard = ({ width, height }: screenType) => {
  return (
    <div
      className="main-board w-100 d-flex"
      style={{
        height: `${height}px`,
      }}>
      {/* FIXME: div 대신 TODO로 바꿔야 함 */}
      <div style={{ width: width * 0.25 }}></div>
      <GridBox width={width * 0.75} height={height} />
    </div>
  );
};

export default DashBoard;
