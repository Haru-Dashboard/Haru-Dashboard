import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { screenType } from '../../../Utils/Common';

export default function CalendarMain({ width, height }: screenType) {
  //공용변수
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const dateObj = new Date();
  const thisYear = dateObj.getFullYear();
  const thisMonth = dateObj.getMonth();

  const startDayOfThisMonth = new Date(thisYear, thisMonth, 1).getDay();
  const startDayOfNextMonth = new Date(thisYear, thisMonth + 1, 1).getDay();
  const dateOfLastMonth = new Date(thisYear, thisMonth, 0).getDate();
  const dateOfThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  //로컬변수
  const weekStartDay = [
    1,
    8 - startDayOfThisMonth,
    15 - startDayOfThisMonth,
    22 - startDayOfThisMonth,
    29 - startDayOfThisMonth,
  ];

  //제작안됨
  const checkHolidays = function (datecheck: number) {
    return false;
  };

  const startLastMonth = weekStartDay[0] === 1;

  const weeksDay = function (startDate: number) {
    let weekDates = numbers.slice(startDate - 1, startDate + 6);
    const weekDateThisMonth = weekDates.map((index) => (
      <Col
        className={
          'date-column ' +
          ((index + startDayOfThisMonth) % 7 == 1
            ? 'sunday'
            : (index + startDayOfThisMonth) % 7 == 0
            ? 'saturday'
            : checkHolidays(index)
            ? 'holiday'
            : 'nomarday')
        }>
        <div className="date-column-dates">{index}</div>
        <div className="date-colume-content"></div>
      </Col>
    ));
    return (
      <Row
        className="calendar-dates-row"
        style={{ height: (height * 13) / 100 }}>
        {weekDateThisMonth}
      </Row>
    );
  };

  const firstWeekDay = function (startDate: number) {
    const weekDatesPast = numbers.slice(
      dateOfLastMonth - startDayOfThisMonth,
      dateOfLastMonth,
    );
    const weekDatePastMonth = weekDatesPast.map((index) => (
      <Col
        className={
          'date-column pastmonth ' +
          ((index - dateOfLastMonth + startDayOfThisMonth - 1) % 7 == 0
            ? 'sunday'
            : checkHolidays(index)
            ? 'holiday'
            : '')
        }>
        <div className="date-column-dates">{index}</div>
        <div className="date-colume-content"></div>
      </Col>
    ));
    const weekDates = numbers.slice(0, 7 - startDayOfThisMonth);
    const weekDateThisMonth = weekDates.map((index) => (
      <Col
        className={
          'date-column ' +
          ((index + startDayOfThisMonth) % 7 == 1
            ? 'sunday'
            : (index + startDayOfThisMonth) % 7 == 0
            ? 'saturday'
            : checkHolidays(index)
            ? 'holiday'
            : 'nomarday')
        }>
        <div className="date-column-dates">{index}</div>
        <div className="date-colume-content"></div>
      </Col>
    ));
    return (
      <Row
        className="calendar-dates-row"
        style={{ height: (height * 13) / 100 }}>
        {weekDatePastMonth}
        {weekDateThisMonth}
      </Row>
    );
  };

  const lastWeekDay = function (startDate: number) {
    if (dateOfThisMonth >= startDate + 7) {
      const weekDatesOver = numbers.slice(startDate + 6, dateOfThisMonth);
      const weekDates = numbers.slice(dateOfThisMonth - 7, startDate + 6);
      const weekDateThisMonthOver = weekDatesOver.map((index) => (
        <Col
          className={
            'date-colum-dateover ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="date-column-dates-dateover">
            {index - 7}/{index}
          </div>
          <div className="date-colume-content"></div>
        </Col>
      ));
      const weekDateThisMonth = weekDates.map((index) => (
        <Col
          className={
            'date-column ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="date-column-dates">{index}</div>
          <div className="date-colume-content"></div>
        </Col>
      ));
      return (
        <Row
          className="calendar-dates-row"
          style={{ height: (height * 13) / 100 }}>
          {weekDateThisMonthOver}
          {weekDateThisMonth}
        </Row>
      );
    } else {
      let weekDates = numbers.slice(startDate - 1, dateOfThisMonth);
      const weekDateThisMonth = weekDates.map((index) => (
        <Col
          className={
            'date-column ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="date-column-dates">{index}</div>
          <div className="date-colume-content"></div>
        </Col>
      ));
      let weekDatesNext = numbers.slice(0, startDate - dateOfThisMonth + 6);
      const weekDateNextMonth = weekDatesNext.map((index) => (
        <Col
          className={
            'date-column ' +
            ((index + startDayOfNextMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfNextMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="date-column-dates">{index}</div>
          <div className="date-colume-content"></div>
        </Col>
      ));
      return (
        <Row
          className="calendar-dates-row"
          style={{ height: (height * 13) / 100 }}>
          {weekDateThisMonth}
          {weekDateNextMonth}
        </Row>
      );
    }
  };
  return (
    <div className="calendar-maincontainer">
      <div className="calendar-weekends">
        <Container>
          <Row>
            <Col className="calendar-Weekends-content sunday">Sun</Col>
            <Col className="calendar-Weekends-content">Mon</Col>
            <Col className="calendar-Weekends-content">Tue</Col>
            <Col className="calendar-Weekends-content">Wed</Col>
            <Col className="calendar-Weekends-content">Thu</Col>
            <Col className="calendar-Weekends-content">Fri</Col>
            <Col className="calendar-Weekends-content saturday">Sat</Col>
          </Row>
        </Container>
      </div>
      <div className="calendar-dates">
        <Container>
          {firstWeekDay(weekStartDay[0])}
          {weeksDay(weekStartDay[1])}
          {weeksDay(weekStartDay[2])}
          {weeksDay(weekStartDay[3])}
          {lastWeekDay(weekStartDay[4])}
        </Container>
      </div>
    </div>
  );
}
