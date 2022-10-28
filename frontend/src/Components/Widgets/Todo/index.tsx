import React from 'react';
import { screenLength } from '../../../Utils/Todo';
import BigTitle from '../../Common/Title/BigTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';

const Todo = ({screenWidth, screenHeight}: screenLength) => {
  return (
    /*
      Todo main Board; frame of routine and today 
    */
    <div className='todo-board'
      style={{height: `${screenHeight}px`, width: `${screenWidth*0.25}px`}}>
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