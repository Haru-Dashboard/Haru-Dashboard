import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TodayFilterBar from './FilterBar/TodayFilterBar';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';
import SmallTitle from '../../Common/Title/SmallTitle';
import SelectDayBar from './SelectDayBar';

const createTodoModal = ({ handleClose, show }: any) => {
  const [isToday, setIsToday] = useState(true);
  // const [ todayList, setTodayList ] = useState([{}])
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [writtenContent, setWrittenContent] = useState('');
  const [lastTid, setLastTid] = useState(0);
  const [selectedDayList, setSelectedDayList] = useState<Array<string>>([]);

  // 사용자가 생성한 todo를 localStorage에 저장하기
  // TODO: arr.length를 기준으로 인덱스 생성 시 todo들이 무작위로 삭제되고 새로 생성될 때 인덱스가 겹치는 문제 발생 가능
  const saveAtLocal = () => {
    // localStorage에서 작성된 todo 가져오기
    const localToday = localStorage.getItem('today');

    // 이미 작성된 것이 있으면 배열 형태로 파싱해서 state에 저장하기
    if (localToday) {
      const arr = JSON.parse(localToday);
      const tid = Number(arr[arr.length - 1].id);
      console.log(arr[arr.length - 1], typeof tid);

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
    console.log('savetoday func');

    // 1. localStorage에 저장 + 2. TodayList에 emit해서 추가
    saveAtLocal();
    // 3. 모달 닫기
    handleClose();
  };

  // routine function
  // const onClickDay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   const targetId = e.currentTarget.id; // ok; 그냥 target을 쓰니까 value값을 못 읽어옴
  //   // console.log(e.currentTarget.value);

  //   // 기존에 이미 선택된 요소이면 빼버리기
  //   if (selectedDay.includes(targetId)) {
  //     let idx = selectedDay.indexOf(targetId);
  //     selectedDay.splice(idx, 1);
  //     // have to fix: 뺀 요소가 바로바로 반영이 안됨
  //   } else {
  //     if (!selectedDay.length) {
  //       setSelectedDay([targetId]);
  //       // console.log(selectedDay);
  //     } else {
  //       setSelectedDay(selectedDay.concat(targetId));
  //       // console.log(selectedDay);
  //     }
  //   }
  //   // console.log(selectedDay);
  // };

  // selectedDayBar에서 선택된 날짜 리스트를 받아오기 위한 함수
  const handleSelectedDayList = (selectedList: Array<string>) => {
    console.log('handleselectodaylist', selectedList);
    const arr = selectedList;
    console.log('createmodal arr==>', selectedList);

    // have to fix: 이 코드가 작동을 안함; selectedList까지 정상 출력이 되는데 들어가지를 않음
    setSelectedDayList(selectedList);
  };

  useEffect(() => {
    console.log('createtodomodal useeffect= ', selectedDayList);
    // setSelectedDayList(selectedDayList);
  }, [selectedDayList]);

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
                <Form.Control
                  type="text"
                  placeholder="Today"
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
              {/* 날짜 선택 부분 */}
              <SelectDayBar handleSelectedDayList={handleSelectedDayList} />
              <hr />
              <div className="d-flex justify-content-between">
                <RoutineFilterBar />
                <Form.Control
                  type="text"
                  placeholder="Routine 이름"
                  onChange={(e) => setWrittenContent(e.target.value)}
                  className="ms-5 w-100 border border-0"
                />
              </div>
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
