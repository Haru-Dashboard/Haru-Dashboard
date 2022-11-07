import React, { useState, useEffect } from 'react';
import SelectDayBarItems from './SelectDayBarItems';

export type handleSelectedDayList = {
  handleSelectedDayList: (selectedList: Array<string>) => void;
};

const SelectDayBar = ({ handleSelectedDayList }: handleSelectedDayList) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [selectedDay, setSelectedDay] = useState<Array<string>>([]);

  const handleSelectedDay = (selected: string) => {
    // setSelectedDay(clicked);
    // console.log('handleSelectedDay= ', selected);

    // 있으면 넣고 없으면 빼기
    if (selectedDay.includes(selected)) {
      let idx = selectedDay.indexOf(selected);
      handleSelectedDayList(selectedDay.splice(idx, 1));
      console.log('빼기', selectedDay);
      // setSelectedDay(selectedDay);
    } else {
      selectedDay.push(selected);
      handleSelectedDayList(selectedDay);
      console.log('넣기', selectedDay);
    }
    // 다 넣고 뺐으면 위로 올리기
    setSelectedDay(selectedDay);
    // handleSelectedDayList(selectedDay);
  };

  //

  return (
    <div>
      <div className="d-flex justify-content-start">
        <p className="fw-bold px-3">매주 </p>
        {selectedDay.map((day: string) => {
          return <p>{day}&nbsp;</p>;
        })}
      </div>
      <div className="d-flex justify-content-between px-3 mb-2">
        {week.map((day: string) => {
          return (
            <SelectDayBarItems
              day={day}
              handleSelectedDay={handleSelectedDay}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectDayBar;
