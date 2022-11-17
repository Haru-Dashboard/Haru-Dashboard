import React, { useState } from 'react';
import { localToday } from './TodayList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import TodoMoreModal from './TodoMoreModal';
import Swal from 'sweetalert2';

const TodayListItems = ({
  listItem,
  isCompleted,
  setFilteredList,
  handleIsCompleted,
}: any) => {
  // const [isCompleted, setIsCompleted] = useState(false);
  // localStorage에서 저장된 todo 가져오기; localStorage가 갱신되면 바꾸기
  // const [isCompleted, setIsCompleted] = useState(false);
  const localToday = localStorage.getItem('today');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 선택한 todo 삭제하기
  const onClickDelete = (id: number) => {
    if (localToday) {
      // 리스트 전체
      const list = JSON.parse(localToday);
      // 지우고자 하는 요소의 인덱스 찾기
      const index = list.findIndex(function (item: localToday) {
        return item.id === id;
      });
      list.splice(index, 1);

      localStorage.setItem('today', JSON.stringify(list)); // ok
      setFilteredList(list);
    }
    Swal.fire({
      text: '삭제되었습니다',
      icon: 'success',
      showConfirmButton: true,
      timer: 1000,
    });
  };

  // todo toggling
  const saveIsCompleted = () => {
    /*
      localstorage에서 현재 저장된 목록을 가져온다.
      목록을 순회하면서 id가 선택된 todo와 같은 인덱스를 찾는다
      해당 인덱스에 splice를 써서 isCompleted만 바꿔서 다시 넣는다
      그리고 다시 로컬 스토리지에 저장한다.
     */
    if (localToday) {
      const localTodayList = JSON.parse(localToday);
      localTodayList.map((today: localToday, idx: number) => {
        if (today.id === listItem.id) {
          localTodayList.splice(idx, 1, {
            id: today.id,
            category: today.category,
            content: today.content,
            isCompleted: !today.isCompleted,
          });
        }
      });
      localStorage.setItem('today', JSON.stringify(localTodayList));
      handleIsCompleted();
    }
  };

  return (
    <div>
      <div className="row ms-2 mt-2 hover d-flex align-items-center">
        {/* TODO: 선택한 요소만 체크된 박스로 바꾸기, todo 저장 시에 isCompleted: false를 기본으로 체크되면 localStorage isCompleted: true로 바뀌게 */}
        <FontAwesomeIcon
          icon={isCompleted ? faSquareCheck : faSquare}
          color="#FFFFFF"
          className="col-1 p-0"
          onClick={saveIsCompleted}
        />
        <div
          className="col-2 py-1 px-0 mx-1 my-0 text-center overflow-hidden border border-0 rounded"
          style={{
            fontSize: '0.5rem',
            backgroundColor: '#DFBBB1',
            whiteSpace: 'nowrap',
          }}>
          {listItem.category.slice(0, 4)}
        </div>
        <div
          className="col-6 p-0 m-0 overflow-hidden"
          onClick={handleShow}
          style={{
            whiteSpace: 'nowrap',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}>
          {listItem.content}
        </div>
        {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
        <FontAwesomeIcon
          icon={faSquareMinus}
          color="#FA5252"
          onClick={(e) => onClickDelete(listItem.id)}
          key={listItem.id}
          className="col-1 p-0 ms-1 hover"
        />
      </div>
      <div>
        <TodoMoreModal
          name="today"
          handleClose={handleClose}
          show={show}
          listItem={listItem}
          saveIsCompleted={saveIsCompleted}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};

export default TodayListItems;
