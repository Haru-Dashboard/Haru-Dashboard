import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {
  timeDateConverToBootstrapTime,
  datetimeTimeSettingTo0,
} from './ScheduleDataType';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

export default function ScheduleAdd(props: any) {
  const { showModal, handleClose, setSchedule, schedule } = props;
  const sampledatetime = datetimeTimeSettingTo0(new Date());
  const [inputs, setInputs] = useState({
    title: '',
    startDate: sampledatetime,
    endDate: sampledatetime,
    content: '',
    color: -1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('T');

    const URLNext = 'schedules';

    const backURL = process.env.REACT_APP_BACKURL;
    if (checkTokenValidate()) {
      if (inputs.title == null || inputs.title == '') {
        alert('타이틀이 없습니다.');
      } else if (inputs.content == null || inputs.content == '') {
        alert('내용이 없습니다.');
      } else {
        if (inputs.startDate == null) {
          setInputs((values) => ({ ...values, startDate: sampledatetime }));
          inputs.startDate = sampledatetime;
        }
        if (inputs.endDate == null) {
          setInputs((values) => ({ ...values, endDate: sampledatetime }));
          inputs.endDate = sampledatetime;
        }
        fetch(backURL + URLNext, {
          method: 'POST',
          headers: {
            Authorization: getAccessToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then((response) => response.json())
          .then((data) => {
            setSchedule([...schedule, inputs]);
            handleClose();
          });
      }
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>일정추가</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="제목"
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
              defaultValue={timeDateConverToBootstrapTime(new Date())}
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
              defaultValue={timeDateConverToBootstrapTime(new Date())}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>세부일정</Form.Label>
            <Form.Control
              type="text"
              name="content"
              placeholder="세부일정"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            저장
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
