import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';

const routineList = () => {
  return (
    <div style={{ height: '35%', fontSize: '0.8rem' }}>
      <div className="container">
        <div className="row justify-content-between my-2">
          <div className="ms-4 col">
            <SmallTitle title="Routine" color="#5BB7F0" />
          </div>
          <div className="col-4">
            <RoutineFilterBar />
          </div>
        </div>
      </div>
      <div className="sub-board mx-3" style={{ height: '80%' }}></div>
    </div>
  );
};

export default routineList;
