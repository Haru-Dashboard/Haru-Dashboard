import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { screenType } from '../../../App';

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
          'dateColum ' +
          ((index + startDayOfThisMonth) % 7 == 1
            ? 'sunday'
            : (index + startDayOfThisMonth) % 7 == 0
            ? 'saturday'
            : checkHolidays(index)
            ? 'holiday'
            : 'nomarday')
        }>
        <div className="dateColumnDates">{index}</div>
        <div className="dateColumeMain"></div>
      </Col>
    ));
    return (
      <Row className="calendarDatesRow" style={{ height: (height * 13) / 100 }}>
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
          'dateColum pastMonth ' +
          ((index - dateOfLastMonth + startDayOfThisMonth - 1) % 7 == 0
            ? 'sunday'
            : checkHolidays(index)
            ? 'holiday'
            : '')
        }>
        <div className="dateColumnDates">{index}</div>
        <div className="dateColumeMain"></div>
      </Col>
    ));
    const weekDates = numbers.slice(0, 7 - startDayOfThisMonth);
    const weekDateThisMonth = weekDates.map((index) => (
      <Col
        className={
          'dateColum ' +
          ((index + startDayOfThisMonth) % 7 == 1
            ? 'sunday'
            : (index + startDayOfThisMonth) % 7 == 0
            ? 'saturday'
            : checkHolidays(index)
            ? 'holiday'
            : 'nomarday')
        }>
        <div className="dateColumnDates">{index}</div>
        <div className="dateColumeMain"></div>
      </Col>
    ));
    return (
      <Row className="calendarDatesRow" style={{ height: (height * 13) / 100 }}>
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
            'dateColumOver ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="dateColumnDatesOver">
            {index - 7}/{index}
          </div>
          <div className="dateColumeMain"></div>
        </Col>
      ));
      const weekDateThisMonth = weekDates.map((index) => (
        <Col
          className={
            'dateColum ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="dateColumnDates">{index}</div>
          <div className="dateColumeMain"></div>
        </Col>
      ));
      return (
        <Row
          className="calendarDatesRow"
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
            'dateColum ' +
            ((index + startDayOfThisMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfThisMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="dateColumnDates">{index}</div>
          <div className="dateColumeMain"></div>
        </Col>
      ));
      let weekDatesNext = numbers.slice(0, startDate - dateOfThisMonth + 6);
      const weekDateNextMonth = weekDatesNext.map((index) => (
        <Col
          className={
            'dateColum ' +
            ((index + startDayOfNextMonth) % 7 == 1
              ? 'sunday'
              : (index + startDayOfNextMonth) % 7 == 0
              ? 'saturday'
              : checkHolidays(index)
              ? 'holiday'
              : 'nomarday')
          }>
          <div className="dateColumnDates">{index}</div>
          <div className="dateColumeMain"></div>
        </Col>
      ));
      return (
        <Row
          className="calendarDatesRow"
          style={{ height: (height * 13) / 100 }}>
          {weekDateThisMonth}
          {weekDateNextMonth}
        </Row>
      );
    }
  };
  return (
    <div className="calendarMainContainer">
      <div className="calendarWeekends">
        <Container>
          <Row>
            <Col className="calendarWeekendsInner sunday">Sun</Col>
            <Col className="calendarWeekendsInner">Mon</Col>
            <Col className="calendarWeekendsInner">Tue</Col>
            <Col className="calendarWeekendsInner">Wed</Col>
            <Col className="calendarWeekendsInner">Thu</Col>
            <Col className="calendarWeekendsInner">Fri</Col>
            <Col className="calendarWeekendsInner saturday">Sat</Col>
          </Row>
        </Container>
      </div>
      <div className="calendarDates">
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
