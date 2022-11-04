import React from 'react';
import { ScheduleDataType } from './ScheduleDataType';

function addNewSchedule() {
  //모달팝업
}

//
//
//
//선택된 날자를 변경해줌. 해줘야함.
export function SelectDate(month: number, date: number) {
  //Calendar main에서 달력 날자 클릭시
  //여기서
  //선택된 날자 바꾸주고
  //바뀐 날자에 따라 시간순 출력
  //5개를 보여줌.
}
const dateObj = new Date();
let selectedDate = dateObj.getDate();
//detail에서 보여줄 스케쥴들(5개)
let selectedScheduleInSelectedDate = [
  {
    color: -1,
    title: '',
    content: '',
    date: new Date(),
  },
];
selectedScheduleInSelectedDate = selectedScheduleInSelectedDate.splice(0, 5);
export default function CalendarDetail({ schedule }: ScheduleDataType) {
  const dates = new Date();

  for (let i = 0, count = 0; i < schedule.length && count < 5; i++) {
    //
    const startDate = new Date(schedule[i].startDate);
    const endDate = new Date(schedule[i].endDate);
    if (startDate < dates && dates < endDate) {
      selectedScheduleInSelectedDate[count] = {
        color: schedule[i].color,
        title: schedule[i].title,
        content: schedule[i].content,
        date: dates,
      };
    }
  }
  const calendarDetails = selectedScheduleInSelectedDate.map(
    (index, tmpKey) => (
      <div className="calendar-schedule-detail" key={tmpKey}>
        <div>
          <div className="calendar-schedule-detail-startdate">
            {index.date.getFullYear() +
              '.' +
              ((index.date.getMonth() + 1) / 10 < 1 ? '0' : '') +
              index.date.getMonth() +
              '.' +
              ((index.date.getDate() + 1) / 10 < 1 ? '0' : ' ') +
              index.date.getDate()}
          </div>
          <div className="calendar-schedule-detail-title">{index.title}</div>
        </div>
      </div>
    ),
  );
  return (
    <div>
      <div className="calendar-detail-head">
        <button onClick={addNewSchedule} className="calendar-detail-title">
          일정 추가
        </button>
      </div>
      <div className="calendar-detail-main">{calendarDetails}</div>
    </div>
  );
}
