import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TimeInsertT } from './ScheduleDataType';

export default function SCheduleManage(props: any) {
  const { showModal, handleClose, setSchedule, schedule, scheduleNo } = props;
  const today = new Date();
  const sampledatetime = new Date(
    today.getFullYear() +
      '-' +
      ((today.getMonth() + 1) / 10 >= 1 ? '' : '0') +
      (today.getMonth() + 1) +
      '-' +
      (today.getDate() / 10 >= 1 ? '' : '0') +
      today.getDate() +
      'T00:00',
  );
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
        .then((datas) => {
          setSchedule(schedule.filter((sch: any) => sch.id !== datas.id));
          //
          //
          //
          handleClose();
        });
    } else {
      //
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name == 'startDate' || name == 'endDate') {
      if (name == 'startDate' && value == null) {
        value = schedule[scheduleNo].startDate;
      } else if (name == 'endDate' && value == null) {
        value = schedule[scheduleNo].endDate;
      }
    }
    if (value == '' || value == 'null') {
      if (name == 'title') {
        value = schedule[scheduleNo].title;
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
    if (inputs.title == '' || inputs.title == null) {
      setInputs((values) => ({ ...values, title: inputs.title }));
      inputs.title = schedule[scheduleNo].title;
    }
    if (inputs.startDate == null || inputs.startDate == sampledatetime) {
      setInputs((values) => ({ ...values, startDate: inputs.startDate }));
      inputs.startDate = schedule[scheduleNo].startDate;
    }
    if (inputs.endDate == null || inputs.endDate == sampledatetime) {
      setInputs((values) => ({ ...values, endDate: inputs.endDate }));
      inputs.endDate = schedule[scheduleNo].endDate;
    }
    if (inputs.content == '' || inputs.content == null) {
      setInputs((values) => ({ ...values, content: inputs.content }));
      inputs.content = schedule[scheduleNo].content;
    }
    if (inputs.color == null || inputs.color == -1) {
      setInputs((values) => ({ ...values, color: inputs.color }));
      inputs.color = schedule[scheduleNo].color;
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
        .then((datas) => {
          const tmp = datas.id;
          setSchedule(schedule.filter((sch: any) => sch.id !== tmp));
          setInputs((val) => ({ ...val, id: tmp }));
          setSchedule((val: any) => [...val, inputs]);
          handleClose();
        });
    } else {
      //
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>일정관리</Modal.Title>
      </Modal.Header>
      {showModal ? (
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="제목"
                defaultValue={
                  schedule[scheduleNo] != null ? schedule[scheduleNo].title : ''
                }
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>색상</Form.Label>
              <Form.Select
                name="color"
                onChange={handleSelect}
                defaultValue={schedule[scheduleNo].color}>
                <option value={0}>빨강</option>
                <option value={1}>파랑</option>
                <option value={2}>노랑</option>
                <option value={3}>검정</option>
                <option value={4}>초록</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>시작일</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                onChange={handleChange}
                defaultValue={TimeInsertT(schedule[scheduleNo].startDate)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>종료일</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                onChange={handleChange}
                defaultValue={TimeInsertT(schedule[scheduleNo].endDate)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>세부일정</Form.Label>
              <Form.Control
                type="text"
                name="content"
                defaultValue={schedule[scheduleNo].content}
                placeholder="세부일정"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={removeSchedule} variant="primary">
              일정제거
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleSubmit} variant="primary">
              완료
            </Button>
          </Modal.Footer>
        </Form>
      ) : (
        <div />
      )}
    </Modal>
  );
}
