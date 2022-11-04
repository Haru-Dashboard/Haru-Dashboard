import React, { useState } from 'react';
import { localToday } from './TodayList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';

const TodayListItems = ({ listItem, setFilteredList }: any) => {
  const [isCompleted, setIsCompleted] = useState(false);
  // localStorage에서 저장된 todo 가져오기; localStorage가 갱신되면 바꾸기
  const localToday = localStorage.getItem('today');

  // 선택한 todo 삭제하기
  const onClickDelete = (id: number) => {
    // console.log(idx); // ok
    if (localToday) {
      // 리스트 전체
      const list = JSON.parse(localToday);
      // 지우고자 하는 요소의 인덱스 찾기
      const index = list.findIndex(function (item: localToday) {
        return item.id === id;
      });
      list.splice(index, 1);
      // console.log(list);

      localStorage.setItem('today', JSON.stringify(list)); // ok
      setFilteredList(list);
    }
  };

  return (
    <div className="row ms-2 mt-2 today-hover" id={`today${listItem.id}`}>
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
      <p
        className="col-6 p-0 m-0 overflow-hidden"
        style={{
          whiteSpace: 'nowrap',
          textDecoration: isCompleted ? 'line-through' : 'none',
        }}>
        {listItem.content}
      </p>
      {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
      <FontAwesomeIcon
        icon={faSquareMinus}
        color="#FA5252"
        onClick={(e) => onClickDelete(listItem.id)}
        key={listItem.id}
        className="col-1 p-0 ms-1"
      />
    </div>
  );
};

export default TodayListItems;