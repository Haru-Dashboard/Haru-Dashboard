import React from 'react';
export default function CalendarMain({
  schedule,
  setCalendarSelectedDate,
  calendarSelectedDate,
}: any) {
  //공용변수
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const dateObj = calendarSelectedDate;
  const thisYear = dateObj.getFullYear();
  const thisMonth = dateObj.getMonth();

  function ClickedCalendar(month: number, date: number) {
    const newDate1 = new Date();
    newDate1.setMonth(calendarSelectedDate.getMonth() + month);
    newDate1.setDate(date);
    setCalendarSelectedDate(newDate1);
  }
  function pastMonth() {
    let newMonth = new Date(calendarSelectedDate);
    newMonth.setDate(1);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCalendarSelectedDate(newMonth);
  }
  function nextMonth() {
    let newMonth = new Date(calendarSelectedDate);
    newMonth.setDate(1);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCalendarSelectedDate(newMonth);
  }
  const startDayOfThisMonth = new Date(thisYear, thisMonth, 1).getDay();
  const startDayOfNextMonth = new Date(thisYear, thisMonth + 1, 1).getDay();
  const dateOfLastMonth = new Date(thisYear, thisMonth, 0).getDate();
  const dateOfThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  //로컬변수
  const weekStartDay = [
    1 - startDayOfNextMonth,
    8 - startDayOfThisMonth,
    15 - startDayOfThisMonth,
    22 - startDayOfThisMonth,
    29 - startDayOfThisMonth,
    36 - startDayOfThisMonth,
  ];

  //제작안됨
  const checkHolidays = function (datecheck: number) {
    return false;
  };

  const weeksDay = function (startDate: number) {
    const weekDates = numbers.slice(startDate - 1, startDate + 6);
    const weekDateThisMonth = weekDates.map((index) => (
      <div
        onClick={() => ClickedCalendar(0, index)}
        key={index}
        className={
          calendarSelectedDate.getMonth() == new Date().getMonth() &&
          index == new Date().getDate()
            ? 'date-column-today' + ' date-column'
            : 'date-column'
        }>
        <div
          className={
            'date-column-dates ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          {index}
        </div>
        <div className="date-column-content">
          {GetCalendarContents(thisMonth, index)}
        </div>
      </div>
    ));
    return <div className="calendar-dates-row">{weekDateThisMonth}</div>;
  };
  const firstWeekDay = function (startDate: number) {
    const weekDatesPast = numbers.slice(
      dateOfLastMonth - startDayOfThisMonth,
      dateOfLastMonth,
    );
    const weekDatePastMonth = weekDatesPast.map((index) => (
      <div
        onClick={() => ClickedCalendar(-1, index)}
        key={index}
        className="date-column pastmonth ">
        <div
          className={
            'date-column-dates ' +
            (checkHolidays(index) ? 'holiday' : 'pastmonth')
          }>
          {index}
        </div>
        <div className="date-column-content ">
          {GetCalendarContents(thisMonth - 1, index)}
        </div>
      </div>
    ));
    const weekDates = numbers.slice(0, 7 - startDayOfThisMonth);
    const weekDateThisMonth = weekDates.map((index) => (
      <div
        onClick={() => ClickedCalendar(0, index)}
        key={index}
        className={
          calendarSelectedDate.getMonth() == new Date().getMonth() &&
          index == new Date().getDate()
            ? 'date-column-today' + ' date-column'
            : 'date-column'
        }>
        <div
          className={
            'date-column-dates ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          {index}
        </div>
        <div className="date-column-content">
          {GetCalendarContents(thisMonth, index)}
        </div>
      </div>
    ));
    return (
      <div className="calendar-dates-row">
        {weekDatePastMonth}
        {weekDateThisMonth}
      </div>
    );
  };

  const lastWeekDay = function (startDate: number) {
    const weekDates = numbers.slice(startDate - 1, dateOfThisMonth);
    const weekDateThisMonth = weekDates.map((index) => (
      <div
        onClick={() => ClickedCalendar(0, index)}
        key={index}
        className={
          calendarSelectedDate.getMonth() == new Date().getMonth() &&
          index == new Date().getDate()
            ? 'date-column-today' + ' date-column'
            : 'date-column'
        }>
        <div
          className={
            'date-column-dates ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          {index}
        </div>
        <div className="date-column-content">
          {GetCalendarContents(thisMonth, index)}
        </div>
      </div>
    ));
    const weekDatesNext = numbers.slice(0, startDate - dateOfThisMonth + 6);
    const weekDateNextMonth = weekDatesNext.map((index) => (
      <div
        onClick={() => ClickedCalendar(1, index)}
        key={index}
        className="date-column">
        <div
          className={
            'date-column-dates ' +
            (checkHolidays(index) ? 'holiday' : 'nextmonth')
          }>
          {index}
        </div>
        <div className="date-column-content">
          {GetCalendarContents(thisMonth + 1, index)}
        </div>
      </div>
    ));
    return (
      <div className="calendar-dates-row">
        {weekDateThisMonth}
        {weekDateNextMonth}
      </div>
    );
  };

  //
  //A function that checks the date and schedules it.
  //날자체크해서 일정짜는 함수.
  function GetCalendarContents(dateMonth: number, dateNo: number) {
    let count = 0;
    for (let i = 0; i < schedule.length; i++) {
      const startDate = new Date(schedule[i].startDate);
      const endDate = new Date(schedule[i].endDate);
      const startDateCheck =
        startDate.getMonth() < dateMonth ||
        (startDate.getMonth() == dateMonth && startDate.getDate() <= dateNo);
      const endDateCheck =
        endDate.getMonth() > dateMonth ||
        (endDate.getMonth() == dateMonth && endDate.getDate() >= dateNo);
      if (startDateCheck && endDateCheck) {
        count++;
      }
    }
    return count ? (
      <div className="date-column-count bg-info text-light">{count}</div>
    ) : (
      ''
    );
  }

  return (
    <div className="calendar-maincontainer">
      <div className="month-change">
        <span className="month-change-pn" onClick={pastMonth}>
          {'<'}
        </span>{' '}
        <span className="month-change-ym">
          {calendarSelectedDate.getFullYear() +
            '.' +
            (calendarSelectedDate.getMonth() + 1 < 10 ? 0 : '') +
            (calendarSelectedDate.getMonth() + 1)}{' '}
        </span>
        <span className="month-change-pn" onClick={nextMonth}>
          {'>'}
        </span>
      </div>
      <div className="calendar-weekends">
        <div className="calendar-Weekends-content sunday">Sun</div>
        <div className="calendar-Weekends-content">Mon</div>
        <div className="calendar-Weekends-content">Tue</div>
        <div className="calendar-Weekends-content">Wed</div>
        <div className="calendar-Weekends-content">Thu</div>
        <div className="calendar-Weekends-content">Fri</div>
        <div className="calendar-Weekends-content saturday">Sat</div>
      </div>
      {weekStartDay[5] <= dateOfThisMonth ? (
        <div className="calendar-dates cursor-pointer">
          <div className="calendar-dates-week6">
            {firstWeekDay(weekStartDay[0])}
          </div>
          <div className="calendar-dates-week6">
            {weeksDay(weekStartDay[1])}
          </div>
          <div className="calendar-dates-week6">
            {weeksDay(weekStartDay[2])}
          </div>
          <div className="calendar-dates-week6">
            {weeksDay(weekStartDay[3])}
          </div>
          <div className="calendar-dates-week6">
            {weeksDay(weekStartDay[4])}
          </div>
          <div className="calendar-dates-week6">
            {lastWeekDay(weekStartDay[5])}
          </div>
        </div>
      ) : weekStartDay[4] <= dateOfThisMonth ? (
        <div className="calendar-dates cursor-pointer">
          <div className="calendar-dates-week5">
            {firstWeekDay(weekStartDay[0])}
          </div>
          <div className="calendar-dates-week5">
            {weeksDay(weekStartDay[1])}
          </div>
          <div className="calendar-dates-week5">
            {weeksDay(weekStartDay[2])}
          </div>
          <div className="calendar-dates-week5">
            {weeksDay(weekStartDay[3])}
          </div>
          <div className="calendar-dates-week5">
            {lastWeekDay(weekStartDay[4])}
          </div>
        </div>
      ) : (
        <div className="calendar-dates cursor-pointer">
          <div className="calendar-dates-week4">
            {weeksDay(weekStartDay[0])}
          </div>
          <div className="calendar-dates-week4">
            {weeksDay(weekStartDay[1])}
          </div>
          <div className="calendar-dates-week4">
            {weeksDay(weekStartDay[2])}
          </div>
          <div className="calendar-dates-week4">
            {weeksDay(weekStartDay[3])}
          </div>
        </div>
      )}
    </div>
  );
}
