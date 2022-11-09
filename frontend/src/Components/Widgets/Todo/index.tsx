import React, { useState } from 'react';
import BigTitle from '../../Common/Title/BigTitle';
import SmallTitle from '../../Common/Title/SmallTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';
import CreateTodoModal from './CreateTodoModal';
import BtnPlus from '../../Common/Button/BtnPlus';
import './index.css';

const Todo = () => {
  const [show, setShow] = useState(false);
  const [isTodayRemoved, setIsTodayRemoved] = useState(false);
  const [today, setToday] = useState(new Date().getDay());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDone = () => {
    // localStorage에 있는 todo today 지우기
    localStorage.removeItem('today');
    // 바로 반영시키기
    setIsTodayRemoved(true);
    setToday(today + 1);
  };

  return (
    /*
      Todo main Board; frame of routine and today 
    */
    <section className="todo-board">
      <div
        // style={{ height: '10%' }}
        className="d-flex justify-content-between align-items-center">
        <BigTitle title="Todo" />
        <BtnPlus onClick={handleShow} />
      </div>
      <div style={{ height: '90%' }}>
        <div style={{ height: '38%' }}>
          <RoutineList />
        </div>
        <div style={{ height: '45%' }}>
          <TodayList isTodayRemoved={isTodayRemoved} />
        </div>
        <div className="d-flex justify-content-end">
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
    </section>
  );
};

export default Todo;
