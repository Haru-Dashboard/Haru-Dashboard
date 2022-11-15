import React, { useState, useEffect } from 'react';
import CalendarMain from './CalendarMain';
import './Calendar.css';
import CalendarDetail from './CalendarDetail';
import BigTitle from '../../Common/Title/BigTitle';
import { tokenExists, getAccessToken } from '../../../API/Authentication';
import BtnPlus from '../../Common/Button/BtnPlus';
import ScheduleAdd from './ScheduleAdd';
import ScheduleManage from './ScheduleManage';
function Calendar() {
  const [schedule, setSchedule] = useState([
    {
      title: '',
      content: '',
      startDate: new Date(),
      endDate: new Date(),
      id: -1,
    },
  ]);
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(new Date());

  const [selectedNo, setSelectedNo] = useState(0);
  useEffect(() => {
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = `schedules?year=${new Date().getUTCFullYear()}&month=${
      new Date().getMonth() + 1
    }`;
    if (tokenExists()) {
      setSchedule(schedule.filter((sch: any) => sch.id !== -1));
      fetch(backURL + URLNext, {
        method: 'GET',
        headers: { Authorization: getAccessToken() },
      })
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
        });
    } else {
      setSchedule(schedule.filter((sch: any) => sch.id !== -1));
    }
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const [showManageModal, setShowManageModal] = useState(false);
  const handleManageClose = () => setShowManageModal(false);
  const handleManageShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowManageModal(true);
    const button = event.currentTarget;
    setSelectedNo(parseInt(button.value));
  };

  const monthNext = () => {
    const newDate = calendarSelectedDate;
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + 1);
    setCalendarSelectedDate(newDate);
  };

  const monthBeofre = () => {
    const newDate = calendarSelectedDate;
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - 1);
    setCalendarSelectedDate(newDate);
  };
  return (
    <div className="calendar-board cursor-default">
      <ScheduleAdd
        showModal={showAddModal}
        handleClose={handleAddClose}
        schedule={schedule}
        setSchedule={setSchedule}
      />
      <ScheduleManage
        showModal={showManageModal}
        handleClose={handleManageClose}
        schedule={schedule}
        setSchedule={setSchedule}
        scheduleNo={selectedNo}
      />
      <div className="d-flex justify-content-between align-items-center">
        <BigTitle title="Calendar" />
        <BtnPlus onClick={handleAddShow} />
      </div>
      <div className="w-100 h-100 d-flex">
        {/*        <Button onClick={monthBeofre}>Preview</Button>*/}
        <div className="calendar-main">
          <CalendarMain
            schedule={schedule}
            setCalendarSelectedDate={setCalendarSelectedDate}
            calendarSelectedDate={calendarSelectedDate}
          />
        </div>
        {/*<Button onClick={monthNext}>Next</Button>*/}
        <div className="calendar-detail">
          <CalendarDetail
            schedule={schedule}
            calendarSelectedDate={calendarSelectedDate}
            handleManageShow={handleManageShow}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
