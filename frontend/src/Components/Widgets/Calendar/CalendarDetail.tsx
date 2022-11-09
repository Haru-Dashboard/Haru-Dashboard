import React, { useEffect, useState } from 'react';
import { ScheduleDataType } from './ScheduleDataType';
import BtnPlus from '../../Common/Button/BtnPlus';
import { DateBetween } from './ScheduleDataType';
import ScheduleAdd from './ScheduleAdd';
import SCheduleManage from './SCheduleManage';

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
  const [selectedButton, setSelectedButton] = useState(0);

  const [showManageModal, setShowManageModal] = useState(false);
  const handleManageClose = () => setShowManageModal(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleManageShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowManageModal(true);
    const button: HTMLButtonElement = event.currentTarget;
    setSelectedButton(parseInt(button.value));
  };
  const calendarDetails =
    schedule != null && schedule.length > 0
      ? schedule.map((index, tmpKey) =>
          DateBetween(
            new Date(index.startDate),
            selectedDate,
            new Date(index.endDate),
          ) ? (
            <div className="calendar-schedule-detail" key={tmpKey}>
              <button
                className="full100 calendar-schedule-detail-button"
                key={tmpKey}
                value={tmpKey}
                onClick={handleManageShow}>
                <div className="calendar-schedule-detail-startdate">
                  {(new Date(index.startDate).getHours() / 10 < 1 ? '0' : '') +
                    new Date(index.startDate).getHours() +
                    ':' +
                    (new Date(index.startDate).getMinutes() / 10 < 1
                      ? '0'
                      : '') +
                    new Date(index.startDate).getMinutes()}
                </div>
                <div className="calendar-schedule-detail-title">
                  {index.title}
                </div>
              </button>
            </div>
          ) : (
            ''
          ),
        )
      : '';

  return (
    <div className="calendar-detail-back">
      <div className="calendar-addschedule ">
        <div className="calendar-addschedule-actual">
          <BtnPlus onClick={handleAddShow} />
        </div>
      </div>
      <div className="calendar-detail-head">
        {/*<button onClick={openDetailCalendar} className="calendar-detail-title">
          세부 일정 보기
        </button>*/}
      </div>
      <div className="calendar-detail-main">{calendarDetails}</div>
      <ScheduleAdd
        showModal={showAddModal}
        handleClose={handleAddClose}
        setSchedule={setSchedule}
        schedule={schedule}
      />
      <SCheduleManage
        showModal={showManageModal}
        handleClose={handleManageClose}
        setSchedule={setSchedule}
        scheduleNo={selectedButton}
        schedule={schedule}
      />
    </div>
  );
}
