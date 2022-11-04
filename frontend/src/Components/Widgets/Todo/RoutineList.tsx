import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';

const routineList = () => {
  return (
    <div style={{ fontSize: '0.8rem' }} className="h-100">
      <div className="d-flex justify-content-between my-2">
        <div className="ms-4">
          <SmallTitle title="Routine" color="#5BB7F0" />
        </div>
        <div>
          <RoutineFilterBar />
        </div>
      </div>
      <div className="sub-board mx-3" style={{ height: '80%' }}></div>
    </div>
  );
};

export default routineList;
