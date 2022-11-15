import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TodayFilterBar from './FilterBar/TodayFilterBar';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';
import SmallTitle from '../../Common/Title/SmallTitle';
import SelectDayBar from './SelectDayBar';
import { week } from '../../../Utils/Todo';
import { defaultURL } from '../../../API';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const createTodoModal = ({ handleClose, show, handleSaved }: any) => {
  const [isToday, setIsToday] = useState(true);
  // const [ todayList, setTodayList ] = useState([{}])
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [writtenContent, setWrittenContent] = useState('');
  const [selectedDayList, setSelectedDayList] = useState<Array<week>>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [data, setData] = useState({});

  // 사용자가 생성한 todo를 localStorage에 저장하기
  // TODO: arr.length를 기준으로 인덱스 생성 시 todo들이 무작위로 삭제되고 새로 생성될 때 인덱스가 겹치는 문제 발생 가능
  const saveAtLocal = () => {
    // localStorage에서 작성된 todo 가져오기
    const localToday = localStorage.getItem('today');

    // 이미 작성된 것이 있으면 배열 형태로 파싱해서 state에 저장하기
    if (localToday) {
      const arr = JSON.parse(localToday);
      const tid = Number(arr[arr.length - 1].id);

      // localStorage에 저장하기
      arr.push({
        id: tid + 1,
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
    // 1. localStorage에 저장 + 2. TodayList에 emit해서 추가
    saveAtLocal();
    // 3. 모달 닫기
    handleClose();
  };

  // routine 생성하기 fetch 함수
  const saveRoutine = () => {
    const url = 'todos';
    const data = {
      category: clickedCategory,
      title: writtenContent,
      sun: selectedDayList[0].isClicked,
      mon: selectedDayList[1].isClicked,
      tue: selectedDayList[2].isClicked,
      wed: selectedDayList[3].isClicked,
      thu: selectedDayList[4].isClicked,
      fri: selectedDayList[5].isClicked,
      sat: selectedDayList[6].isClicked,
    };
    if (checkTokenValidate()) {
      fetch(defaultURL + url, {
        method: 'POST',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          handleSaved(true);
          handleClose();
        });
    }
  };

  // selectedDayBar에서 선택된 날짜 리스트를 받아오기 위한 함수
  const handleSelectedDayList = (selectedList: Array<week>) => {
    setSelectedDayList(selectedList);
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
        {isToday && (
          <div>
            <Modal.Body>
              {/* todo today */}
              <div>
                {/* content */}
                <div className="d-flex justify-content-between">
                  <TodayFilterBar handleCategory={handleCategory} />
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Today"
                    onChange={(e) => setWrittenContent(e.target.value)}
                    className="ms-5 w-100 border border-0"
                  />
                </div>
                {/* category input */}
              </div>
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
          </div>
        )}
        {!isToday && (
          // todo routine
          <div>
            <Modal.Body>
              <div>
                {/* 날짜 선택 부분 */}
                <SelectDayBar handleSelectedDayList={handleSelectedDayList} />
                <hr />
                <div className="d-flex justify-content-between">
                  <RoutineFilterBar handleCategory={handleCategory} />
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Routine 이름"
                    onChange={(e) => setWrittenContent(e.target.value)}
                    className="ms-5 w-100 border border-0"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* 
            onClick 
            1. localStorage에 저장
            2. TodayList에 emit해서 추가; state에 추가해서 새로고침하면 state는 날아가고 localStorage 것만 로드되도록 ; filterBar 로직 참고
            3. 모달 닫기
          */}
              <Button variant="outline-primary" size="sm" onClick={saveRoutine}>
                SAVE
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default createTodoModal;
