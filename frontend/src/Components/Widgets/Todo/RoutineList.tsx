import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';

const routineList = () => {
  return (
    <div style={{height: '40%'}}>
      <SmallTitle title="Routine" color="#5BB7F0"/>
      <div className='sub-board mx-3' style={{height: '80%'}}></div>     
    </div>
  );
};

export default routineList;