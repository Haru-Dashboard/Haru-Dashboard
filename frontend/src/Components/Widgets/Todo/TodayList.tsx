import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import TodayFilterBar from './FilterBar/TodayFilterBar';

const todayList = () => {
  return (
    <div style={{height: '55%'}}>
      <div className='container'>
        <div className="row justify-content-between my-2">
          <div className="col-3">
            <SmallTitle title="Today" color="#49649E"/>
          </div>
          <div className="col-4">
            <TodayFilterBar />
          </div>
        </div>
      </div>
      <div className='sub-board mx-3' style={{height: '80%'}}></div>     
    </div>
  );
};

export default todayList;