import React, { useState, useEffect } from 'react';
import CalendarMain from './CalendarMain';
import './Calendar.css';
import CalendarDetail from './CalendarDetail';
import { Authentication } from '../../../API/Authentication';
import BigTitle from '../../Common/Title/BigTitle';
function Calendar() {
  const titleOfCalendar = 'Specials';

  const dateObj = new Date();
  const thisYear = dateObj.getUTCFullYear();
  const thisMonth = dateObj.getMonth();
  const thisMonthString = dateObj
    .toLocaleString('en-US', { month: 'short' })
    .toUpperCase();
  //토큰 임시 테스트
  const [schedule, setSchedule] = useState([
    {
      color: 0,
      title: '',
      content: '',
      startDate: new Date(),
      endDate: new Date(),
      id: 0,
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const backURL = process.env.REACT_APP_BACKURL;

  useEffect(() => {
    Authentication();
    let accessToken = localStorage.getItem('accessToken');
    const URLNext = `schedules?year=${thisYear}&month=${thisMonth}`;

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
        <div
          style={{ height: '10%' }}
          className="d-flex justify-content-between align-items-center ms-5 me-3 mt-2">
          <BigTitle title="Calendar" />
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
          <CalendarMain schedule={schedule} setSelectedDate={setSelectedDate} />
        </div>
      </div>
      <div className="calendar-detail">
        <CalendarDetail
          schedule={schedule}
          selectedDate={selectedDate}
          setSchedule={setSchedule}
        />
      </div>
    </div>
  );
}
export default Calendar;
