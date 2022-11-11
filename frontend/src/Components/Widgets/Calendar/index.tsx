import React, { useState, useEffect } from 'react';
import CalendarMain from './CalendarMain';
import './Calendar.css';
import CalendarDetail from './CalendarDetail';
import BigTitle from '../../Common/Title/BigTitle';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';
import BtnPlus from '../../Common/Button/BtnPlus';
import ScheduleAdd from './ScheduleAdd';
import SCheduleManage from './SCheduleManage';
function Calendar() {
  const dateObj = new Date();
  const thisYear = dateObj.getUTCFullYear();
  const thisMonth = dateObj.getMonth();
  const [schedule, setSchedule] = useState([
    {
      title: '',
      content: '',
      startDate: new Date(),
      endDate: new Date(),
      id: -1,
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = `schedules?year=${thisYear}&month=${thisMonth}`;
    if (checkTokenValidate()) {
      fetch(backURL + URLNext, {
        method: 'GET',
        headers: { Authorization: getAccessToken() },
      })
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
        });
    } else {
      //
    }
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const [selectedNo, setSelectedNo] = useState(0);

  const [showManageModal, setShowManageModal] = useState(false);
  const handleManageClose = () => setShowManageModal(false);
  const handleManageShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowManageModal(true);
    const button = event.currentTarget;
    setSelectedNo(parseInt(button.value));
  };
  return (
    <div className="calendar-board">
      <ScheduleAdd
        showModal={showAddModal}
        handleClose={handleAddClose}
        setSchedule={setSchedule}
        schedule={schedule}
      />
      <SCheduleManage
        handleManageShow={handleManageShow}
        showModal={showManageModal}
        handleClose={handleManageClose}
        setSchedule={setSchedule}
        schedule={schedule}
        scheduleNo={selectedNo}
      />
      <div className="d-flex justify-content-between align-items-center">
        <BigTitle title="Calendar" />
        <BtnPlus onClick={handleAddShow} />
      </div>
      <div className="w-100 h-100 d-flex">
        <div className="calendar-main">
          <CalendarMain schedule={schedule} setSelectedDate={setSelectedDate} />
        </div>
        <div className="calendar-detail">
          <CalendarDetail
            schedule={schedule}
            selectedDate={selectedDate}
            handleManageShow={handleManageShow}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
