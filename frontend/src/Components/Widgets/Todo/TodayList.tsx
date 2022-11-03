import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import TodayFilterBar from './FilterBar/TodayFilterBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';

export type localToday = {
  id: number;
  category: string;
  content: string;
};

type isTodayRemoved = {
  isTodayRemoved: boolean;
};

const todayList = ({ isTodayRemoved }: isTodayRemoved) => {
  // clickedCategory는 필터링할 때 사용하기
  const [clickedCategory, setClickedCategory] = useState('전체');
  const [localTodayList, setLocalTodayList] = useState<localToday[]>([]);
  const [filteredList, setFilteredList] = useState<localToday[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // localStorage에서 저장된 todo 가져오기; localStorage가 갱신되면 바꾸기
  const localToday = localStorage.getItem('today');
  // const MySwal = withReactContent(Swal)

  // filter bar component에서 클릭된 카테고리 가져오는 함수
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };

  /* 
    list 길이 확인 함수
    이 함수 안쓰고 바로 filterList.length로 DOM에서 처리하면 배열이 비었을 때 0이 같이 화면에 렌더링 됨
  */
  const checkIsEmpty = (filtered: localToday[]) => {
    if (filtered.length) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  // 클릭한 필터에 맞게 필터링하는 함수
  const filterTodayList = () => {
    if (clickedCategory === '전체') {
      // console.log('전체');
      // 현재 filteredList가 localTodayList와 다른 경우
      if (filteredList !== localTodayList && localToday) {
        checkIsEmpty(JSON.parse(localToday));
        setFilteredList(JSON.parse(localToday));
      }
    } else {
      const filtered = localTodayList.filter(
        (today) => today.category === clickedCategory,
      );
      checkIsEmpty(filtered);
      setFilteredList(filtered);
    }
  };

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
      console.log(list);

      localStorage.setItem('today', JSON.stringify(list)); // ok
      setFilteredList(list);
    }
  };

  // 새로운 todo가 추가되면 리스트 변경
  useEffect(() => {
    console.log('localstorage changed'); // ok
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
    // console.log('removed todaylist', isTodayRemoved);
    setFilteredList([]);
  }, [isTodayRemoved]);

  return (
    <div style={{ height: '50%', fontSize: '0.8rem' }}>
      <div className="container">
        <div className="row justify-content-between my-2">
          <div className="col-3 ms-4">
            <SmallTitle title="Today" color="#49649E" />
          </div>
          <div className="col-4">
            <TodayFilterBar handleCategory={handleCategory} />
          </div>
        </div>
      </div>
      <div
        className="sub-board mx-3"
        style={{ height: '80%', overflowY: 'auto', overflowX: 'hidden' }}>
        {/* 작성한 todo가 보이는 곳 */}
        {!isEmpty && (
          <div className="container px-0 py-3">
            {filteredList.map((localToday: localToday, idx: number) => {
              return (
                <div className="row ms-2 mt-2">
                  {/* TODO: 선택한 요소만 체크된 박스로 바꾸기, todo 저장 시에 isCompleted: false를 기본으로 체크되면 localStorage isCompleted: true로 바뀌게 */}
                  <FontAwesomeIcon
                    icon={faSquare}
                    color="#FFFFFF"
                    className="col-1 p-0"
                    onClick={(e) => setIsCompleted(true)}
                  />
                  <p
                    className="col-2 p-0 mx-1 my-0 overflow-hidden"
                    style={{ fontSize: '12px' }}>
                    {localToday.category}
                  </p>
                  <p className="col-6 p-0 m-0">{localToday.content}</p>
                  {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    color="#FA5252"
                    onClick={(e) => onClickDelete(localToday.id)}
                    key={idx}
                    className="col-1 p-0"
                  />
                </div>
              );
            })}
          </div>
        )}
        {isEmpty && (
          <p className="text-center">
            {clickedCategory}에서 할 일을 추가해주세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default todayList;
