import React, { useState } from 'react';
import { screenType } from '../../../Utils/Common';
import BigTitle from '../../Common/Title/BigTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';
import CreateTodoModal from './CreateTodoModal';

const Todo = ({ width, height }: screenType) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    /*
      Todo main Board; frame of routine and today 
    */
   <div className='todo-board'>
    <div style={{height: height, width: width}}>
      {/* <p className=''>hello world {width}//</p> */}
      <div style={{height: '10%'}} className="d-flex justify-content-between">
        <BigTitle title='Todo'/>
        <button className='py-0 my-2' onClick={handleShow}>+</button>
      </div>
      <div style={{height: '90%'}}>
        <RoutineList />
        <TodayList />
      </div>
      <div>
        <CreateTodoModal handleClose={handleClose} show={show}/>
      </div>
    </div>
   </div>
  );
};

export default Todo;