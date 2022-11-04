import React, { useState, useEffect } from 'react';
import { screenType } from '../../../Utils/Common';
import CalendarMain from './CalendarMain';
import './Calendar.css';
import CalendarDetail from './CalendarDetail';

function Calendar({ width, height }: screenType) {
  const titleOfCalendar = 'Specials';

  const dateObj = new Date();
  const thisYear = dateObj.getUTCFullYear();
  const thisMonth = dateObj.getMonth();
  const thisMonthString = dateObj
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  //토큰 임시 테스트

  const backURL = process.env.REACT_APP_BACKURL;
  const emails = process.env.REACT_APP_BACK_TMP_EMAIL;
  useEffect(() => {
    const URLNext = 'users/login';
    fetch(backURL + URLNext, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emails }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
      });
  }, []);

  const [schedule, setSchedule] = useState([
    { color: 0, title: '', content: '', startDate: '', endDate: '' },
  ]);

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    const URLNext = 'schedules?year=' + thisYear + '&month=' + thisMonth;

    if (accessToken !== null) {
      accessToken = 'Bearer ' + accessToken;
      fetch(backURL + URLNext, {
        method: 'GET',
        headers: { Authorization: accessToken },
      })
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
        });
    } else {
      //
    }
  }, []);

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
          <CalendarMain schedule={schedule} />
        </div>
      </div>
      <div className="calendar-detail">
        <CalendarDetail schedule={schedule} />
      </div>
    </div>
  );
}
export default Calendar;
