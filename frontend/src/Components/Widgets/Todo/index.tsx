import React, { useState } from 'react';
import { screenType } from '../../../Utils/Common';
import BigTitle from '../../Common/Title/BigTitle';
import SmallTitle from '../../Common/Title/SmallTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';
import CreateTodoModal from './CreateTodoModal';
import BtnPlus from '../../Common/Button/BtnPlus';

const Todo = ({ width, height }: screenType) => {
  const [show, setShow] = useState(false);
  const [isTodayRemoved, setIsTodayRemoved] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDone = () => {
    // localStorage에 있는 todo today 지우기
    localStorage.removeItem('today');
    // 바로 반영시키기
    setIsTodayRemoved(true);
  };

  return (
    /*
      Todo main Board; frame of routine and today 
    */
    <div className="todo-board">
      <div style={{ height: height, width: width }}>
        {/* <p className=''>hello world {width}//</p> */}
        <div
          style={{ height: '10%' }}
          className="d-flex justify-content-between align-items-center ms-5 me-3 mt-2">
          <BigTitle title="Todo" />
          {/* <button className='py-0 my-2' onClick={handleShow}>+</button> */}
          <BtnPlus onClick={handleShow} />
        </div>
        <div style={{ height: '90%' }} className="px-2 pb-2">
          <div style={{ height: '38%' }}>
            <RoutineList />
          </div>
          <div style={{ height: '45%' }}>
            <TodayList isTodayRemoved={isTodayRemoved} />
          </div>
          <div className="d-flex justify-content-end me-2 mt-2">
            <button
              className="bg-transparent"
              onClick={onClickDone}
              style={{ borderColor: '#927695', borderRadius: '20px' }}>
              <SmallTitle color="#927695" title="Done!" />
            </button>
          </div>
        </div>
        <div>
          <CreateTodoModal handleClose={handleClose} show={show} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
