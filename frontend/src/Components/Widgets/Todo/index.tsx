import React, { useEffect, useState } from 'react';
import BigTitle from '../../Common/Title/BigTitle';
import SmallTitle from '../../Common/Title/SmallTitle';
import RoutineList from './RoutineList';
import TodayList from './TodayList';
import CreateTodoModal from './CreateTodoModal';
import BtnPlus from '../../Common/Button/BtnPlus';
import Swal from 'sweetalert2';
import './index.css';
import { tokenExists } from '../../../API/Authentication';

const Todo = () => {
  const [show, setShow] = useState(false);
  const [isTodayRemoved, setIsTodayRemoved] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [isCreated, setisCreated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (tokenExists()) {
      setIsLogined(true);
      setShow(true);
    } else {
      setIsLogined(false);
      Swal.fire({
        text: '로그인 후에 이용 가능합니다',
        icon: 'error',
        showConfirmButton: true,
        timer: 1000,
      });
    }
  };

  const handleSaved = (bool: boolean) => {
    setisCreated(bool);
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
      <div className="h-90">
        <div className="h-40">
          <RoutineList isCreated={isCreated} />
        </div>
        <div className="h-50">
          <TodayList isTodayRemoved={isTodayRemoved} />
        </div>
      </div>
      <div>
        <CreateTodoModal
          handleClose={handleClose}
          show={show}
          handleSaved={handleSaved}
        />
      </div>
    </section>
  );
};

export default Todo;
