import React from 'react';
import { screenType } from '../../../App';
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
      <div className="calendarCalendar">
        <div className="calendarTitle ">
          <div className="d-flex">
            <img src="img/calendarImg.png" className="calendarTitleIconImg" />
            <div className="calendartitleTitle">Calendar</div>
          </div>
        </div>

        <div className="calendarHead">
          <div className="calendarImports d-flex">
            <div className="calendarMonthYear">
              <div className="calendarYear">{thisYear}</div>
              <div className="calendarMonth">{thisMonthString}</div>
            </div>
            <div className="titleOfCalendar">{titleOfCalendar}</div>
          </div>
        </div>
        <div className="calendarMain">
          <CalendarMain width={width} height={height} />
        </div>
      </div>
      <div className="claendarControl"></div>
    </div>
  );
}
export default Calendar;
