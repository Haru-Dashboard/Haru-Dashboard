import React, { useEffect, useState } from 'react';
import { ScheduleDataType } from './ScheduleDataType';
import BtnPlus from '../../Common/Button/BtnPlus';
import CalendalAddSchedule from './CalendalAddSchedule';
import CalendarBigsize from './CalendarBigsize';
import ManageSchedule from './ManageSchedule';
import { DateBetween } from './ScheduleDataType';

const dateObj = new Date();
type calendarDetailPorps = {
  selectedDate: Date;
  schedule: {
    id: number;
    color: number;
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
  }[];
  setSchedule: any;
};

//detail에서 보여줄 스케쥴들(5개)
export default function CalendarDetail({
  schedule,
  selectedDate,
  setSchedule,
}: calendarDetailPorps) {
  //죄송합니다 이부분 수정해야합니다

  //
  const [detailCalendar, setDetailCalendarOpen] = useState(false);

  const openDetailCalendar = () => {
    setDetailCalendarOpen(true);
  };
  const closeDetailCalendar = () => {
    setDetailCalendarOpen(false);
  };
  const [addCalendar, setADDCalendarOpen] = useState(false);

  const openAddCalendar = () => {
    setADDCalendarOpen(true);
  };
  const closeAddCalendar = () => {
    setADDCalendarOpen(false);
  };
  const [manageSchedule, setManageSchedule] = useState(false);

  const [selectedButton, setSelectedButton] = useState(0);
  const openManageSchedule = (event: React.MouseEvent<HTMLButtonElement>) => {
    setManageSchedule(true);
    const button: HTMLButtonElement = event.currentTarget;
    setSelectedButton(parseInt(button.value));
  };
  const closeManageSchedule = () => {
    setManageSchedule(false);
  };
  const calendarDetails = schedule.map((index, tmpKey) =>
    DateBetween(
      new Date(index.startDate),
      selectedDate,
      new Date(index.endDate),
    ) ? (
      <div className="calendar-schedule-detail" key={tmpKey}>
        <ManageSchedule
          open={manageSchedule}
          close={closeManageSchedule}
          scheduleNo={selectedButton}
          schedule={schedule}
          setSchedule={setSchedule}
        />
        <button
          className="full100 calendar-schedule-detail-button"
          key={tmpKey}
          value={tmpKey}
          onClick={openManageSchedule}>
          <div className="calendar-schedule-detail-startdate">
            {(new Date(index.startDate).getHours() / 10 < 1 ? '0' : '') +
              new Date(index.startDate).getHours() +
              ':' +
              (new Date(index.startDate).getMinutes() / 10 < 1 ? '0' : '') +
              new Date(index.startDate).getMinutes()}
          </div>
          <div className="calendar-schedule-detail-title">{index.title}</div>
        </button>
      </div>
    ) : (
      ''
    ),
  );
  return (
    <div className="calendar-detail-back">
      {
        <CalendarBigsize
          open={detailCalendar}
          close={closeDetailCalendar}
          setSchedule={setSchedule}
          schedule={schedule}
        />
      }
      <div className="calendar-addschedule ">
        <div className="calendar-addschedule-actual">
          <BtnPlus onClick={openAddCalendar} />
          <CalendalAddSchedule
            open={addCalendar}
            close={closeAddCalendar}
            setSchedule={setSchedule}
            schedule={schedule}
            header="Modal heading"
          />
        </div>
      </div>
      <div className="calendar-detail-head">
        {/*<button onClick={openDetailCalendar} className="calendar-detail-title">
          세부 일정 보기
        </button>*/}
      </div>
      <div className="calendar-detail-main">{calendarDetails}</div>
    </div>
  );
}
