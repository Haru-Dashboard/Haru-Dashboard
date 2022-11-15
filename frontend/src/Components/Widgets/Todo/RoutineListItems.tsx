import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import RoutineMoreModal from './RoutineMoreModal';
import { defaultURL } from '../../../API';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const RoutineListItems = ({ listItem, handleDelete, handleUpdate }: any) => {
  const [isCompleted, setIsCompleted] = useState(false);
  // localStorage에서 저장된 todo 가져오기; localStorage가 갱신되면 바꾸기
  const localToday = localStorage.getItem('today');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickMore = () => {
    handleShow();
  };
  const onClickDelete = () => {
    const url = `todos/${listItem.todoId}`;
    if (checkTokenValidate()) {
      fetch(defaultURL + url, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        handleDelete(true);
        Swal.fire({
          text: '삭제되었습니다',
          icon: 'success',
          showConfirmButton: true,
          timer: 1000,
        });
      });
    }
  };

  // const [isSaved, setIsSaved] = useState(false);
  const handleUpdateEmit = (bool: boolean) => {
    handleUpdate(bool);
  };

  return (
    <div>
      <div className="row ms-2 mt-2 hover">
        {/* TODO: 선택한 요소만 체크된 박스로 바꾸기, todo 저장 시에 isCompleted: false를 기본으로 체크되면 localStorage isCompleted: true로 바뀌게 */}
        <FontAwesomeIcon
          icon={isCompleted ? faSquareCheck : faSquare}
          color="#FFFFFF"
          className="col-1 p-0"
          onClick={(e) => setIsCompleted(!isCompleted)}
        />
        <div
          className="col-2 p-0 mx-1 my-0 text-center overflow-hidden border border-0 rounded"
          style={{
            fontSize: '12px',
            backgroundColor: '#DFBBB1',
            whiteSpace: 'nowrap',
          }}>
          {listItem.category}
        </div>
        <div
          className="col-6 p-0 m-0 overflow-hidden"
          onClick={onClickMore}
          style={{
            whiteSpace: 'nowrap',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}>
          {listItem.title}
        </div>
        {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
        <FontAwesomeIcon
          icon={faSquareMinus}
          color="#FA5252"
          onClick={onClickDelete}
          key={listItem.todoId}
          className="col-1 p-0 ms-1 hover"
        />
      </div>
      <div>
        <RoutineMoreModal
          handleClose={handleClose}
          show={show}
          listItem={listItem}
          setIsCompleted={setIsCompleted}
          handleUpdateEmit={handleUpdateEmit}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};

export default RoutineListItems;
