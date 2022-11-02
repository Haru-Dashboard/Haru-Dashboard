import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import TodayFilterBar from './FilterBar/TodayFilterBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

export type localToday = {
  category: string,
  content: string,
}

const todayList = () => {
  // clickedCategory는 필터링할 때 사용하기
  const [ clickedCategory, setClickedCategory ] = useState('')
  const [ localTodayList, setLocalTodayList ] = useState<localToday[]>([])
  const [ isCompleted, setIsCompleted ] = useState(false)

  const handleCategory = (clicked: string) =>{
    setClickedCategory(clicked)
  }

  useEffect(()=> {
    const localToday = localStorage.getItem('today')
    if (localToday) {
      setLocalTodayList(JSON.parse(localToday))
    }
  }, [])

  // localStorage에서 저장된 todo 가져오기

  return (
    <div style={{height: '55%', fontSize: '14px' }}>
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
      <div className='sub-board ms-1 pt-3 px-3 overflow-auto' style={{height: '80%'}}>
        {/* 작성한 todo가 보이는 곳 */}
        <div className='container p-0'>
          {localTodayList.map((localToday: localToday)=>{
            return (
              <div className='row ms-2 mt-2'>
                {/* TODO: 선택한 요소만 체크된 박스로 바꾸기, todo 저장 시에 isCompleted: false를 기본으로 체크되면 localStorage isCompleted: true로 바뀌게 */}
                <FontAwesomeIcon icon={faSquare} color="#FFFFFF" 
                  className='col-1 p-0'
                  onClick={e => setIsCompleted(true)}/>
                <p className='col-2 p-0 mx-1 my-0 overflow-hidden' style={{fontSize: '12px'}}>{localToday.category}</p>
                <p className='col-6 p-0 m-0'>{localToday.content}</p>
                {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
                <FontAwesomeIcon icon={faSquareMinus} color="#FA5252"
                  className='col-1 p-0'/>

              </div>
            )
          })}
        </div>
      </div>     
    </div>
  );
};

export default todayList;