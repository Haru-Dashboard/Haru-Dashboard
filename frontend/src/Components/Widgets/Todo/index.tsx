import React from 'react';
import { screenType } from '../../../Utils/Common';
import BigTitle from '../../Common/Title/BigTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';
import { Router } from 'react-router-dom';

const Todo = ({width, height}: screenType) => {
  return (
    /*
      Todo main Board; frame of routine and today 
    */
    <div className='todo-board'
      style={{height: height, width: width}}>
      {/* <p className=''>{screenWidth} {screenHeight}</p> */}
      <div style={{height: '10%'}} className="d-flex justify-content-between">
        <BigTitle title='Todo'/>
        <button className='py-0 my-2'>+</button>
      </div>
      <div style={{height: '90%'}}>
        <RoutineList />
        <TodayList />
      </div>
    </div>
  );
};

export default Todo;