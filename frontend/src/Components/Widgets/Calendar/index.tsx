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
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(
    new Date(
      new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 < 10 ? 0 : '') +
        (new Date().getMonth() + 1) +
        '-' +
        (new Date().getDate() < 10 ? 0 : '') +
        new Date().getDate() +
        'T' +
        (new Date().getHours() < 10 ? 0 : '') +
        +new Date().getHours() +
        ':00',
    ),
  );

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
  const [showAddModal2, setShowAddModal2] = useState(false);
  const handleAddClose2 = () => setShowAddModal2(false);
  const handleAddShow2 = () => setShowAddModal2(true);

  const [showManageModal, setShowManageModal] = useState(false);
  const handleManageClose = () => setShowManageModal(false);
  const handleManageShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowManageModal(true);
    const button = event.currentTarget;
    setSelectedNo(parseInt(button.value));
  };

  return (
    <div className="calendar-board cursor-default">
      <ScheduleAdd
        showModal={showAddModal}
        handleClose={handleAddClose}
        schedule={schedule}
        setSchedule={setSchedule}
        calendarSelectedDate={
          new Date(
            new Date().getFullYear() +
              '-' +
              (new Date().getMonth() + 1 < 10 ? 0 : '') +
              (new Date().getMonth() + 1) +
              '-' +
              (new Date().getDate() < 10 ? 0 : '') +
              new Date().getDate() +
              'T' +
              (new Date().getHours() < 10 ? 0 : '') +
              +new Date().getHours() +
              ':00',
          )
        }
      />
      <ScheduleAdd
        showModal={showAddModal2}
        handleClose={handleAddClose2}
        schedule={schedule}
        setSchedule={setSchedule}
        calendarSelectedDate={calendarSelectedDate}
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
            handleAddShow2={handleAddShow2}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
