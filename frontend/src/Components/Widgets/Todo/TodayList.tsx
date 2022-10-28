import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import FilterBar from './FilterBar';

const todayList = () => {
  return (
    <div style={{height: '60%'}}>
      <div className='d-flex justify-content-between'>
        <SmallTitle title="Today" color="#49649E"/>
        <FilterBar />
      </div>
      <div className='sub-board mx-3' style={{height: '80%'}}></div>     
    </div>
  );
};

export default todayList;