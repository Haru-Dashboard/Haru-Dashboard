import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectionfailed } from './ScheduleDataType';
import { tokenExists, getAccessToken } from '../../../API/Authentication';
import Swal from 'sweetalert2';

export default function ScheduleManage(props: any) {
  const { showModal, handleClose, setSchedule, schedule, scheduleNo } = props;
  const sampledatetime = new Date(
    new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate() +
      'T' +
      +(new Date().getHours() + 2) +
      ':00',
  )
    .toISOString()
    .replace(/\..*/, '');
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
    if (tokenExists()) {
      fetch(backURL + URLNext, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
        },
      })
        .then((response) => response.json())
        .then((datas) => {
          setSchedule(schedule.filter((sch: any) => sch.id !== datas.id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            showConfirmButton: false,
            timer: 1000,
          });
          handleClose();
        });
    } else {
      connectionfailed();
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
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputs.title == '' || inputs.title == null) {
      setInputs((values) => ({ ...values, title: schedule[scheduleNo].title }));
      inputs.title = schedule[scheduleNo].title;
    }
    if (inputs.startDate == null || inputs.startDate == sampledatetime) {
      setInputs((values) => ({
        ...values,
        startDate: schedule[scheduleNo].startDate
          .replace('.', '-')
          .replace('.', '-')
          .replace(' ', 'T'),
      }));
      inputs.startDate = schedule[scheduleNo].startDate
        .replace('.', '-')
        .replace('.', '-')
        .replace(' ', 'T');
    }
    if (inputs.endDate == null || inputs.endDate == sampledatetime) {
      inputs.endDate = schedule[scheduleNo].endDate
        .replace('.', '-')
        .replace('.', '-')
        .replace(' ', 'T');
    }
    if (inputs.content == '' || inputs.content == null) {
      setInputs((values) => ({
        ...values,
        content: schedule[scheduleNo].content,
      }));
      inputs.content = schedule[scheduleNo].content;
    }
    if (inputs.id == -1 || inputs.id == null) {
      setInputs((values) => ({ ...values, id: inputs.id }));
      inputs.id = schedule[scheduleNo].id;
    }
    const URLNext = 'schedules/' + schedule[scheduleNo].id;
    const backURL = process.env.REACT_APP_BACKURL;

    if (tokenExists()) {
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
          setSchedule((val: any) => [...val, { ...inputs, id: tmp }]);
          Swal.fire({
            icon: 'success',
            title: 'Saved',
            showConfirmButton: false,
            timer: 1000,
          });
          handleClose();
        });
    } else {
      connectionfailed();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Calendar</Modal.Title>
      </Modal.Header>
      {showModal ? (
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={
                  schedule[scheduleNo] != null ? schedule[scheduleNo].title : ''
                }
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                className="cursor-pointer"
                onChange={handleChange}
                defaultValue={schedule[scheduleNo].startDate
                  .replace('.', '-')
                  .replace('.', '-')
                  .replace(' ', 'T')}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                className="cursor-pointer"
                onChange={handleChange}
                defaultValue={schedule[scheduleNo].endDate
                  .replace('.', '-')
                  .replace('.', '-')
                  .replace(' ', 'T')}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                name="content"
                defaultValue={schedule[scheduleNo].content}
                placeholder="Details"
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={removeSchedule}
              variant="outline-primary"
              size="sm">
              Delete
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="outline-primary"
              size="sm">
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      ) : (
        <div />
      )}
    </Modal>
  );
}
