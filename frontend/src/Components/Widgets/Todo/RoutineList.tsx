import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import CommonFilterBar from './FilterBar/CommonFilterBar';
import { routine, routineData } from '../../../Utils/Todo';
import { defaultURL } from '../../../API';
import RoutineListItems from './RoutineListItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const routineList = ({ today }: any) => {
  const [clickedCategory, setClickedCategory] = useState('ALL');
  const [isEmpty, setIsEmpty] = useState(false);
  const [filteredList, setFilteredList] = useState<Array<routineData>>([]);
  const [todayRoutineList, setTodayRoutineList] = useState<Array<routineData>>(
    [],
  );
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const [show, setShow] = useState(false);
  const [todayDate] = useState(new Date().getDay());
  const [isLogined, setIsLogined] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // filter bar component에서 클릭된 카테고리 가져오는 함수
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };

  useEffect(() => {
    if (checkTokenValidate()) {
      setIsLogined(true);
      const url = `todos?day=${days[todayDate]}`;
      fetch(defaultURL + url, {
        method: 'GET',
        headers: {
          Authorization: getAccessToken(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTodayRoutineList(data);
          setFilteredList(data);
          checkListLength(data);
        });
    } else {
      setIsLogined(false);
    }
  }, []);

  /* 
    list 길이 확인 함수
    이 함수 안쓰고 바로 filterList.length로 DOM에서 처리하면 배열이 비었을 때 0이 같이 화면에 렌더링 됨
  */
  const checkListLength = (filtered: routineData[]) => {
    if (filtered.length) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };
  // 클릭한 필터에 맞게 필터링하는 함수
  const filterTodayList = () => {
    if (clickedCategory === 'ALL') {
      // 전체 리스트 다 띄우기
      console.log('into all, ', todayRoutineList);
      checkListLength(todayRoutineList);
      setFilteredList(todayRoutineList);
    } else {
      // TODO: 카테고리와 현재 것이 같으면 filteredList에 넣기
      const filtered = todayRoutineList.filter(
        (item) => item.category === clickedCategory,
      );
      checkListLength(filtered);
      setFilteredList(filtered);
    }
  };

  // 새로운 todo가 추가되면 리스트 변경
  const localToday = localStorage.getItem('today');
  useEffect(() => {
    if (localToday) {
      setTodayRoutineList(JSON.parse(localToday));
      filterTodayList();
    }
  }, [localToday]);

  // 선택된 category가 바뀌면 필터링 진행
  useEffect(() => {
    console.log(clickedCategory);
    filterTodayList();
  }, [clickedCategory]);

  const onClickReload = () => {
    location.reload();
  };

  return (
    <div style={{ fontSize: '0.8rem' }} className="h-100">
      <div className="d-flex justify-content-between my-2">
        <SmallTitle title="Routine" color="#5BB7F0" />
        <div className="d-flex justify-content-end align-items-center">
          <FontAwesomeIcon
            icon={faRotateRight}
            className="me-2 hover"
            onClick={onClickReload}
          />
          <CommonFilterBar handleCategory={handleCategory} />
        </div>
      </div>
      {/* 리스트 목록 */}
      <div
        className="sub-board"
        style={{ height: '80%', overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="px-2 h-100">
          {/* 작성한 todo가 보이는 곳 */}
          {isLogined && (
            <div>
              {!isEmpty && (
                <div className="container h-100 px-0 py-3">
                  {filteredList != null
                    ? filteredList.map((item: routineData, idx: number) => {
                        return <RoutineListItems listItem={item} key={idx} />;
                      })
                    : ''}
                </div>
              )}
              {isEmpty && (
                <p className="text-center py-3 fw-bold">
                  {clickedCategory}에서 할 일을 추가해주세요!
                </p>
              )}
            </div>
          )}
          {!isLogined && (
            <div className="py-3 px-2">
              <p className="fw-bold text-center">
                로그인 후에 이용 가능합니다.
              </p>
            </div>
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
