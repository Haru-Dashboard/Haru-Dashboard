import React, { useState, useEffect } from 'react';

const SelectDayBarItems = ({
  name,
  day,
  handleSelectedDay,
  isSelected,
  idx,
}: any) => {
  const [isClicked, setIsClicked] = useState(false);
  const [borderClass, setBorderClass] = useState('');
  const [textColor, setTextColor] = useState('');
  // const [selectedDay, setSelectedDay] = useState<Array<string>>([]);

  // routine function
  const onClickDay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number,
  ) => {
    // 클릭된 것인지 여부 저장
    setIsClicked(!isClicked);
    // 클릭된 것을 selectdaybar로 올리기
    handleSelectedDay(key);
    // console.log(selectedDay);
  };

  useEffect(() => {
    // 클릭된 요소에 border
    if (isClicked) {
      setBorderClass('border-secondary');
    } else {
      setBorderClass('border-white');
    }
  }, [isClicked]);

  useEffect(() => {
    // 요일에 따른 글자 색상
    if (day === '일') {
      setTextColor('text-danger');
    } else if (day === '토') {
      setTextColor('text-primary');
    } else {
      setTextColor('text-black');
    }

    // 수정 시에 이미 선택된 것
    setIsClicked(isSelected);
  }, []);

  return (
    <div>
      <button
        style={{ borderColor: '#49649E' }}
        className={`border border-3 ${borderClass} bg-white rounded-circle fw-bold ${textColor}`}
        id={day}
        onClick={(e) => onClickDay(e, idx)}>
        {day}
      </button>
    </div>
  );
};

export default SelectDayBarItems;
