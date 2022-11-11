import React from 'react';
import { isDateBetweenTwoDates } from './ScheduleDataType';

type calendarDetailPorps = {
  selectedDate: Date;
  schedule: {
    id: number;
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
  }[];
  handleManageShow: any;
};
//detail에서 보여줄 스케쥴들(5개)
export default function CalendarDetail({
  schedule,
  selectedDate,
  handleManageShow,
}: calendarDetailPorps) {
  const calendarDetails =
    schedule != null && schedule.length > 0
      ? schedule.map((index, tmpKey) =>
          isDateBetweenTwoDates(
            new Date(index.startDate),
            new Date(index.endDate),
            selectedDate,
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
    <div className="calendar-detail-board">
      <div className="calendar-detail-date">
        {new Date().getMonth() + 1}.{new Date().getDate()}
      </div>
      {calendarDetails}
    </div>
  );
}
