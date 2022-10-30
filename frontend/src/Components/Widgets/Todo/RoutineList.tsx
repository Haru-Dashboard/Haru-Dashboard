import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import FilterBar from './FilterBar';

const routineList = () => {
  return (
  <div style={{height: '40%'}}>
    <div className='container'>
      <div className="row justify-content-between my-2">
        <div className="col">
          <SmallTitle title="Routine" color="#5BB7F0"/>
        </div>
        <div className="col-4">
          <FilterBar />
        </div>
      </div>
    </div>
    <div className='sub-board mx-3' style={{height: '80%'}}></div>     
  </div>
  );
};

export default routineList;