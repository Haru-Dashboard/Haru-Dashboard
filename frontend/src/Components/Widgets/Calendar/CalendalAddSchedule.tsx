import React, { useState } from 'react';

export default function CalendalAddSchedule(props: any) {
  const { open, close, setSchedule, schedule } = props;
  ///schedules/{scheduleId}
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
    color: 0,
  });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name + ':' + value);
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(inputs);

    let accessToken = localStorage.getItem('accessToken');
    const URLNext = `schedules`;

    console.log(inputs);
    const backURL = process.env.REACT_APP_BACKURL;
    if (accessToken !== null) {
      if (inputs.title == null || inputs.title == '') {
        alert('타이틀이 없습니다.');
      } else if (inputs.content == null || inputs.content == '') {
        alert('내용이 없습니다.');
      } else {
        if (inputs.startDate == null) {
          setInputs((values) => ({ ...values, startDate: sampledatetime }));
        } else if (inputs.endDate == null) {
          setInputs((values) => ({ ...values, endDate: sampledatetime }));
        } else if (inputs.color == null) {
          setInputs((values) => ({ ...values, color: 0 }));
        }
        accessToken = 'Bearer ' + accessToken;
        fetch(backURL + URLNext, {
          method: 'POST',
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setSchedule([...schedule, inputs]);
            close();
          });
      }
    }
  };

  const closeAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault;
    setInputs({
      title: '',
      startDate: sampledatetime,
      endDate: sampledatetime,
      content: '',
      color: 0,
    });

    close();
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
                onChange={handleChange}
                placeholder="제목"
              />
              <div className="schedule-inline">
                <div className="schedule-date-text">종류</div>
                <select
                  name="color"
                  className="schedule-select"
                  onChange={handleSelect}
                  defaultValue={0}>
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
                  required
                />
              </div>
              <input
                type="text"
                name="content"
                className="shcdule-inputs schedule-details"
                onChange={handleChange}
                placeholder="세부일정"
              />
            </main>
            <footer>
              <button className="submit" onClick={handleSubmit}>
                일정 추가
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
