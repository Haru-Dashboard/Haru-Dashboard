import React, { useEffect, useState } from 'react';

export default function ManageSchedule(props: any) {
  const { open, close, scheduleNo, schedule } = props;
  const today = new Date();
  const sampledatetime =
    today.getFullYear() +
    '-' +
    ((today.getMonth() + 1) / 10 >= 1 ? '' : '0') +
    (today.getMonth() + 1) +
    '-' +
    (today.getDate() / 10 >= 1 ? '' : '0') +
    today.getDate() +
    'T00:00';
  const [inputs, setInputs] = useState({
    title: '',
    startDate: sampledatetime,
    endDate: sampledatetime,
    content: '',
    color: -1,
  });
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const removeSchedule = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const backURL = process.env.REACT_APP_BACKURL;
    let accessToken = localStorage.getItem('accessToken');
    const URLNext = 'schedules/' + schedule[scheduleNo].id;
    if (accessToken !== null) {
      accessToken = 'Bearer ' + accessToken;
      fetch(backURL + URLNext, {
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          close();
          window.location.reload();
        });
    } else {
      //
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value = event.target.value;
    if (value == '') {
      if (name == 'title') {
        value = schedule[scheduleNo].title;
      } else if (name == 'startDate') {
        value = schedule[scheduleNo].startDate;
      } else if (name == 'endDate') {
        value = schedule[scheduleNo].endDate;
      } else if (name == 'content') {
        value = schedule[scheduleNo].content;
      } else {
        value = schedule[scheduleNo].color;
      }
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(schedule[scheduleNo].title);
    console.log(schedule[scheduleNo].startDate);
    console.log(schedule[scheduleNo].endDate);
    console.log(schedule[scheduleNo].content);
    console.log(schedule[scheduleNo].color);
    console.log(schedule[scheduleNo].title);
    if (inputs.title == '' || inputs.title == null) {
      inputs.title = schedule[scheduleNo].title;
    }
    if (
      inputs.startDate == '' ||
      inputs.startDate == null ||
      inputs.startDate == sampledatetime
    ) {
      setInputs((values) => ({
        ...values,
        startDate: schedule[scheduleNo].startDate,
      }));
      inputs.startDate = schedule[scheduleNo].startDate;
    }
    if (
      inputs.endDate == '' ||
      inputs.endDate == null ||
      inputs.endDate == sampledatetime
    ) {
      setInputs((values) => ({
        ...values,
        content: schedule[scheduleNo].content,
      }));
      inputs.endDate = schedule[scheduleNo].endDate;
    }
    if (inputs.content == '' || inputs.content == null) {
      setInputs((values) => ({
        ...values,
        content: schedule[scheduleNo].content,
      }));
      inputs.content = schedule[scheduleNo].content;
    }
    if (inputs.color == null || inputs.color == -1) {
      setInputs((values) => ({ ...values, color: schedule[scheduleNo].color }));
    }
    let accessToken = localStorage.getItem('accessToken');
    const URLNext = 'schedules/' + schedule[scheduleNo].id;
    const backURL = process.env.REACT_APP_BACKURL;
    if (accessToken !== null) {
      accessToken = 'Bearer ' + accessToken;
      fetch(backURL + URLNext, {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((data) => {
          close();
          window.location.reload();
        });
    } else {
      //
    }
  };

  return (
    <div className={open ? 'openModal modal schedule-card' : 'modal '}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close} type="button">
              &times;
            </button>
          </header>
          <form className="calendar-form">
            <main>
              <input
                type="text"
                name="title"
                className="shcdule-inputs input-title"
                defaultValue={schedule[scheduleNo].title}
                onChange={handleChange}
                placeholder="제목"
              />
              <div className="schedule-inline">
                <div className="schedule-date-text">종류</div>
                <select
                  name="color"
                  className="schedule-select"
                  onChange={handleSelect}
                  defaultValue={schedule[scheduleNo].color}>
                  <option value={0}>기본</option>
                  <option value={1}>공부</option>
                  <option value={2}>작업</option>
                  <option value={3}>미팅</option>
                  <option value={4}>배포</option>
                </select>
              </div>

              <div className="schedule-inline">
                <div className="schedule-date-text">시작일</div>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="schedule-date-input"
                  onChange={handleChange}
                  defaultValue={schedule[scheduleNo].startDate}
                  required
                />
              </div>
              <div className="schedule-inline">
                <div className="schedule-date-text">종료일</div>
                <input
                  type="datetime-local"
                  className="schedule-date-input"
                  name="endDate"
                  onChange={handleChange}
                  defaultValue={schedule[scheduleNo].endDate}
                  required
                />
              </div>
              <input
                type="text"
                name="content"
                className="shcdule-inputs schedule-details"
                defaultValue={schedule[scheduleNo].content}
                onChange={handleChange}
                placeholder="세부일정"
              />
            </main>
            <footer>
              <button type="button" className="submit" onClick={removeSchedule}>
                일정 제거
              </button>
              <button className="submit" onClick={handleSubmit}>
                일정 수정
              </button>
              <button type="button" className="close" onClick={close}>
                close
              </button>
            </footer>
          </form>
        </section>
      ) : null}
    </div>
  );
}
