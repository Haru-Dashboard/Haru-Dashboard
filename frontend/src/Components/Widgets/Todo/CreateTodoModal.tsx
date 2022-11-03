import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TodayFilterBar from './FilterBar/TodayFilterBar';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';
import SmallTitle from '../../Common/Title/SmallTitle';

const createTodoModal = ({ handleClose, show }: any) => {
  const [isToday, setIsToday] = useState(true);
  // const [ todayList, setTodayList ] = useState([{}])
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [writtenContent, setWrittenContent] = useState('');

  // 사용자가 생성한 todo를 localStorage에 저장하기
  // TODO: arr.length를 기준으로 인덱스 생성 시 todo들이 무작위로 삭제되고 새로 생성될 때 인덱스가 겹치는 문제 발생 가능
  const saveAtLocal = () => {
    // localStorage에서 작성된 todo 가져오기
    const localToday = localStorage.getItem('today');

    // 이미 작성된 것이 있으면 배열 형태로 파싱해서 state에 저장하기
    if (localToday) {
      const arr = JSON.parse(localToday);
      const tid = arr.length;

      // localStorage에 저장하기
      arr.push({
        id: `${tid}`,
        category: `${clickedCategory}`,
        content: `${writtenContent}`,
      });
      localStorage.setItem('today', JSON.stringify(arr));
    } else {
      // localStorage에 저장된 category가 없는 경우; 새로 category를 만들어 줌
      localStorage.setItem(
        'today',
        JSON.stringify([
          {
            id: 0,
            category: clickedCategory,
            content: writtenContent,
          },
        ]),
      );
    }
  };

  // filterBar 컴포넌트에서 넘어온 선택된 카테고리 state에 저장하기
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };

  /* saveToday 
    1. localStorage에 저장
    2. TodayList에 emit해서 추가
      - 사용자가 생성한 todo를 state에 추가해서 새로고침하면 state는 날아가고 localStorage 것만 로드되도록
      - filterBar 로직 참고
      2-1. emit해서 추가한 것은 handleCategory로 함
    3. 모달 닫기 
  */
  const saveToday = () => {
    console.log('savetoday func');

    // 1. localStorage에 저장 + 2. TodayList에 emit해서 추가
    saveAtLocal();
    // 3. 모달 닫기
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="pb-1" closeButton>
          <button
            onClick={(e) => setIsToday(true)}
            className="border border-0 bg-transparent">
            <SmallTitle title="Today" color={isToday ? '#49649E' : 'gray'} />
          </button>
          <button
            onClick={(e) => setIsToday(false)}
            className="ms-2 border border-0 bg-transparent">
            <SmallTitle title="Routine" color={isToday ? 'gray' : '#5BB7F0'} />
          </button>
          {/* <button className='border border-0 bg-light'
            onClick={e => setIsToday(true)}>Today</button>
          <button className='border border-0 bg-light'
            onClick={e => setIsToday(false)}>Routine</button> */}
        </Modal.Header>
        <Modal.Body>
          {isToday && (
            // todo today
            <div>
              {/* content */}
              <div className="d-flex justify-content-between">
                <TodayFilterBar handleCategory={handleCategory} />
                <input
                  type="text"
                  placeholder="오늘의 할 일"
                  onChange={(e) => setWrittenContent(e.target.value)}
                  className="ms-5 w-100 border border-0"
                />
              </div>
              {/* category input */}
            </div>
          )}
          {!isToday && (
            // todo routine
            <div>
              <RoutineFilterBar />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* 
            onClick 
            1. localStorage에 저장
            2. TodayList에 emit해서 추가; state에 추가해서 새로고침하면 state는 날아가고 localStorage 것만 로드되도록 ; filterBar 로직 참고
            3. 모달 닫기
           */}
          <Button variant="outline-primary" size="sm" onClick={saveToday}>
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default createTodoModal;
