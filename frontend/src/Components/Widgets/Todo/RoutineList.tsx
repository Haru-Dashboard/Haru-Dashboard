import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import CommonFilterBar from './FilterBar/CommonFilterBar';
import RoutineMoreModal from './RoutineMoreModal';
import { routine, routineData } from '../../../Utils/Todo';
import { defaultURL } from '../../../API';
import RoutineListItems from './RoutineListItems';
import { Cookies } from 'react-cookie';

const routineList = ({ today }: any) => {
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [isEmpty, setIsEmpty] = useState(false);
  const [wholeList, setWholeList] = useState<Array<routine>>([]);
  const [filteredList, setFilteredList] = useState<Array<routine>>([]);
  const [todayRoutineList, setTodayRoutineList] = useState<Array<routineData>>(
    [],
  );
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // filter bar component에서 클릭된 카테고리 가져오는 함수
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };

  /* 
    list 길이 확인 함수
    이 함수 안쓰고 바로 filterList.length로 DOM에서 처리하면 배열이 비었을 때 0이 같이 화면에 렌더링 됨
  */
  const checkIsEmpty = (filtered: routine[]) => {
    if (filtered.length) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    let accessToken = new Cookies().get('accessToken');

    if (accessToken !== undefined) {
      accessToken = 'Bearer ' + accessToken;
      const url = `todos?day=${days[today]}`;
      fetch(defaultURL + url, {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTodayRoutineList(data);
        });
    }
  }, []);

  // 클릭한 필터에 맞게 필터링하는 함수
  const filterTodayList = () => {
    if (clickedCategory === '전체') {
      // 전체 리스트 다 띄우기
    } else {
      const filtered = wholeList.filter((item) => {
        // TODO: 카테고리와 현재 것이 같으면 filteredList에 넣기
        item.category === clickedCategory;
      });
      checkIsEmpty(filtered);
      setFilteredList(filtered);
    }
  };

  return (
    <div style={{ fontSize: '0.8rem' }} className="h-100">
      <div className="d-flex justify-content-between my-2">
        <SmallTitle title="Routine" color="#5BB7F0" />
        <div>
          <CommonFilterBar handleCategory={handleCategory} />
        </div>
      </div>
      {/* 리스트 목록 */}
      <div
        className="sub-board"
        style={{ height: '80%', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="px-2 h-100">
          {/* 작성한 todo가 보이는 곳 */}
          {!isEmpty && (
            <div className="container h-100 px-0 py-3">
              {todayRoutineList != null && todayRoutineList.length > 0
                ? todayRoutineList.map((item: routineData, nums: number) => {
                    return (
                      <RoutineListItems listItem={item} key={nums} />
                      // setFilteredList={setFilteredList}
                    );
                  })
                : ''}
            </div>
          )}
          {isEmpty && (
            <p className="text-center pt-5 fw-bold">
              {clickedCategory}에서 할 일을 추가해주세요!
            </p>
          )}
        </div>
      </div>
      <div>
        {/* <RoutineMoreModal handleClose={handleClose} show={show} /> */}
      </div>
    </div>
  );
};

export default routineList;
