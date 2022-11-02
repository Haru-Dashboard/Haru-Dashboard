import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import TodayFilterBar from './FilterBar/TodayFilterBar';

export type localToday = {
  category: string,
  content: string,
}

const todayList = () => {
  // clickedCategory는 필터링할 때 사용하기
  const [ clickedCategory, setClickedCategory ] = useState('')
  const [ localTodayList, setLocalTodayList ] = useState<localToday[]>([])

  const handleCategory = (clicked: string) =>{
    setClickedCategory(clicked)
  }

  useEffect(()=> {
    const localToday = localStorage.getItem('today')
    if (localToday) {
      setLocalTodayList(JSON.parse(localToday))
    }
  })

  // localStorage에서 저장된 todo 가져오기

  return (
    <div style={{height: '55%'}}>
      <div className='container'>
        <div className="row justify-content-between my-2">
          <div className="col-3 ms-4">
            <SmallTitle title="Today" color="#49649E"/>
          </div>
          <div className="col-4">
            <TodayFilterBar handleCategory={handleCategory} />
          </div>
        </div>
      </div>
      <div className='sub-board mx-3 pt-3 px-3 overflow-auto' style={{height: '80%'}}>
        {/* 작성한 todo가 보이는 곳 */}
        <div>
          {localTodayList.map((localToday: localToday)=>{
            return (
              <div className='ms-2 mt-2 d-flex justify-content-between'>
                <p className='mb-1'>{localToday.category} {localToday.content}</p>
                {/* 각각 idx를 인식해서 해당 데이터만 지우기 */}
                <button>-</button>
              </div>
            )
          })}
        </div>
      </div>     
    </div>
  );
};

export default todayList;