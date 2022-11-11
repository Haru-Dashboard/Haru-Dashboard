import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  timeStringConverToBootstrapTime,
  datetimeTimeSettingTo0,
} from './ScheduleDataType';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

export default function SCheduleManage(props: any) {
  const { showModal, handleClose, setSchedule, schedule, scheduleNo } = props;
  const sampledatetime = datetimeTimeSettingTo0(new Date());
  const [inputs, setInputs] = useState({
    title: '',
    startDate: sampledatetime,
    endDate: sampledatetime,
    content: '',
    color: -1,
    id: -1,
  });
  const removeSchedule = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = 'schedules/' + schedule[scheduleNo].id;
    if (checkTokenValidate()) {
      fetch(backURL + URLNext, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
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
      }
    }
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
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
    const URLNext = 'schedules/' + schedule[scheduleNo].id;
    const backURL = process.env.REACT_APP_BACKURL;
    if (checkTokenValidate()) {
      fetch(backURL + URLNext, {
        method: 'PATCH',
        headers: {
          Authorization: getAccessToken(),
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
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>일정관리</Modal.Title>
      </Modal.Header>
      {showModal ? (
        <Form onSubmit={handleSubmit}>
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
              <Form.Label>시작일</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                className="cursor-pointer"
                onChange={handleChange}
                defaultValue={timeStringConverToBootstrapTime(
                  schedule[scheduleNo].startDate,
                )}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>종료일</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                className="cursor-pointer"
                onChange={handleChange}
                defaultValue={timeStringConverToBootstrapTime(
                  schedule[scheduleNo].endDate,
                )}
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
              삭제
            </Button>
            <Button type="submit" variant="primary">
              수정
            </Button>
          </Modal.Footer>
        </Form>
      ) : (
        <div />
      )}
    </Modal>
  );
}
