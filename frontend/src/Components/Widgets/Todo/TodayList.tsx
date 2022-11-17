import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
// import TodayFilterBar from './FilterBar/TodayFilterBar';
import CommonFilterBar from './FilterBar/CommonFilterBar';
import TodayListItems from './TodayListItems';
// import TodoMoreModal from './TodoMoreModal';

export type localToday = {
  id: number;
  category: string;
  content: string;
  isCompleted: boolean;
};

type isTodayRemoved = {
  isTodayRemoved: boolean;
};

const todayList = ({ isTodayRemoved }: isTodayRemoved) => {
  // clickedCategory는 필터링할 때 사용하기
  const [clickedCategory, setClickedCategory] = useState('ALL');
  const [localTodayList, setLocalTodayList] = useState<localToday[]>([]);
  const [filteredList, setFilteredList] = useState<localToday[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  // localStorage에서 저장된 todo 가져오기; localStorage가 갱신되면 바꾸기
  const localToday = localStorage.getItem('today');

  // filter bar component에서 클릭된 카테고리 가져오는 함수
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };

  /* 
    list 길이 확인 함수
    이 함수 안쓰고 바로 filterList.length로 DOM에서 처리하면 배열이 비었을 때 0이 같이 화면에 렌더링 됨
  */
  const checkListLength = (filtered: localToday[]) => {
    if (filtered.length) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  // 클릭한 필터에 맞게 필터링하는 함수
  const filterTodayList = () => {
    if (clickedCategory === 'ALL') {
      // 현재 filteredList가 localTodayList와 다른 경우
      if (filteredList !== localTodayList && localToday) {
        checkListLength(JSON.parse(localToday));
        setFilteredList(JSON.parse(localToday));
      }
    } else {
      const filtered = localTodayList.filter(
        (today) => today.category === clickedCategory,
      );
      checkListLength(filtered);
      setFilteredList(filtered);
    }
  };

  const handleIsCompleted = () => {
    filterTodayList();
  };

  // 새로운 todo가 추가되면 리스트 변경
  useEffect(() => {
    if (localToday) {
      setLocalTodayList(JSON.parse(localToday));
      filterTodayList();
    }
  }, [localToday]);

  // 선택된 category가 바뀌면 필터링 진행
  useEffect(() => {
    filterTodayList();
  }, [clickedCategory]);

  // 리셋하면 바로 반영되게
  useEffect(() => {
    setFilteredList([]);
  }, [isTodayRemoved]);

  // 처음에 create 될 때
  useEffect(() => {
    if (localToday) {
      setFilteredList(JSON.parse(localToday));
    }
  }, []);

  return (
    <div style={{ fontSize: '0.8rem' }} className="h-100">
      <div className="d-flex justify-content-between mt-3 mb-2">
        <SmallTitle title="Today" color="#49649E" />
        <div>
          <CommonFilterBar handleCategory={handleCategory} />
        </div>
      </div>
      <div
        className="sub-board h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <div className="px-2 h-100">
          {/* 작성한 todo가 보이는 곳 */}
          {!isEmpty && (
            <div className="container h-100 px-0 py-3">
              {filteredList.map((filtered: localToday, k: number) => {
                return (
                  <TodayListItems
                    listItem={filtered}
                    isCompleted={filtered.isCompleted}
                    setFilteredList={setFilteredList}
                    handleIsCompleted={handleIsCompleted}
                    key={k}
                  />
                );
              })}
            </div>
          )}
          {isEmpty && (
            <div className="py-3 px-2">
              <p className="text-center fw-bold">
                {clickedCategory}에서 할 일을 추가해주세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default todayList;
