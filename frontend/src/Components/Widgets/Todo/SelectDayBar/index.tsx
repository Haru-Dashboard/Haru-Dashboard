import React, { useState, useEffect } from 'react';
import { week } from '../../../../Utils/Todo';
import SelectDayBarItems from './SelectDayBarItems';

export type selectDayBarType = {
  handleSelectedDayList: (selectedList: Array<week>) => void;
<<<<<<< HEAD
  availableDays?: Array<week>;
  availableDaysList?: Array<week>;
};

const SelectDayBar = ({
  handleSelectedDayList,
  availableDays,
  availableDaysList,
}: handleSelectedDayList) => {
=======
  clicked: string;
};

const SelectDayBar = ({ handleSelectedDayList }: selectDayBarType) => {
>>>>>>> origin/feat/29/routine
  const [weeks, setWeeks] = useState<Array<week>>([]);
  // const [selectedDayObject, setSelectedDayObject] = useState<Array<week>>([]);
  const [selectedDay, setselectedDay] = useState<Array<week>>([]);

  useEffect(() => {
    // console.log('availableDays==', availableDays);
    if (availableDays) {
      setWeeks(availableDays);
    } else {
      setWeeks([
        { id: 'sun', day: '일', isClicked: false, color: 'text-danger' },
        { id: 'mon', day: '월', isClicked: false, color: 'text-black' },
        { id: 'tue', day: '화', isClicked: false, color: 'text-black' },
        { id: 'wed', day: '수', isClicked: false, color: 'text-black' },
        { id: 'thu', day: '목', isClicked: false, color: 'text-black' },
        { id: 'fri', day: '금', isClicked: false, color: 'text-black' },
        { id: 'sat', day: '토', isClicked: false, color: 'text-primary' },
      ]);
    }

    if (availableDaysList) {
      setselectedDay(availableDaysList);
    }
  }, []);

  // 각 요일이 클릭될 때마다 실행되는 함수
  const handleSelectedDay = (key: number) => {
    const toggle = weeks[key].isClicked;
    weeks[key].isClicked = !toggle;

    const filteredDay = weeks.filter((item) => item.isClicked === true);
    // console.log(filteredDay);
    setselectedDay(filteredDay);
    handleSelectedDayList(weeks);
  };

  return (
    <div>
      <div>
        {selectedDay.length === 7 && <p className="fw-bold px-3">매일 반복</p>}
        {selectedDay.length !== 7 && (
          <div className="d-flex justify-content-start">
            <p className="fw-bold px-3">매주 </p>
            {selectedDay.map((item) => {
              return <p>{item.day}&nbsp;</p>;
            })}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between px-3 mb-2">
        {weeks.map((item: week, idx: number) => {
          return (
            <span key={idx}>
              <SelectDayBarItems
                idx={idx}
                day={item.day}
                isSelected={item.isClicked}
                handleSelectedDay={handleSelectedDay}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SelectDayBar;
