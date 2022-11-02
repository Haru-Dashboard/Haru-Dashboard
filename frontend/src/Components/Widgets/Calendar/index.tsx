import React from 'react';
import { screenType } from '../../../Utils/Common';
import CalendarMain from './CalendarMain';
import './Calendar.css';

function Calendar({ width, height }: screenType) {
  const titleOfCalendar = 'Specials';

  const dateObj = new Date();
  const thisYear = dateObj.getUTCFullYear();
  const thisMonthString = dateObj
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();

  return (
    <div className="calendar board">
      <div className="calendar-back">
        <div className="calendar-title ">
          <div className="d-flex">
            <img
              src="img/calendarImg.png"
              className="calendar-title-icon-img"
            />
            <div className="calendar-title-titles">Calendar</div>
          </div>
        </div>

        <div className="calendar-head">
          <div className="calendar-head-flex">
            <div className="calendar-monthyear">
              <div className="calendar-year">{thisYear}</div>
              <div className="calendar-month">{thisMonthString}</div>
            </div>
            <div className="calendar-subtitle">{titleOfCalendar}</div>
          </div>
        </div>
        <div className="calendar-main">
          <CalendarMain width={width} height={height} />
        </div>
      </div>
      <div className="claendar-control"></div>
    </div>
  );
}
export default Calendar;
