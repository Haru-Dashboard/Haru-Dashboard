import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import CommonFilterBar from './FilterBar/CommonFilterBar';
import { routine } from '../../../Utils/Todo';
import { getRoutineList } from '../../../API/Todo';
// import RoutineFilterBar from './FilterBar/RoutineFilterBar';

const routineList = () => {
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [isEmpty, setIsEmpty] = useState(false);
  const [wholeList, setWholeList] = useState<Array<routine>>([]);
  const [filteredList, setFilteredList] = useState<Array<routine>>([]);

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

  // routine 리스트 가져오기 fetch 함수
  useEffect(() => {
    // .then 처리 때문에 여기에다가 fetch 함수를 써야 할 수도 있다.
    getRoutineList;
    filterTodayList;
  }, []);

  return (
    <div style={{ fontSize: '0.8rem' }} className="h-100">
      <div className="d-flex justify-content-between my-2">
        <div className="ms-4">
          <SmallTitle title="Routine" color="#5BB7F0" />
        </div>
        <div>
          <CommonFilterBar handleCategory={handleCategory} />
        </div>
      </div>
      <div className="sub-board mx-3 p-3" style={{ height: '80%' }}>
        <p>{clickedCategory}</p>
      </div>
    </div>
  );
};

export default routineList;
