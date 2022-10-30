import React from 'react';
import { screenType } from '../../../Utils/Common';
import BigTitle from '../../Common/Title/BigTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';

const Todo = ({width, height}: screenType) => {
  return (
    /*
      Todo main Board; frame of routine and today 
    */
    <div className='todo-board'
      style={{height: height, width: width}}>
      {/* <p className=''>{screenWidth} {screenHeight}</p> */}
      <div style={{height: '10%'}}>
        <BigTitle title='Todo'/>
      </div>
      <div style={{height: '90%'}}>
        <RoutineList />
        <TodayList />
      </div>
    </div>
  );
};

export default Todo;