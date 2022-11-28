import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectionfailed } from './ScheduleDataType';
import { tokenExists, getAccessToken } from '../../../API/Authentication';
import Swal from 'sweetalert2';
export default function ScheduleAdd(props: any) {
  const {
    showModal,
    handleClose,
    setSchedule,
    schedule,
    calendarSelectedDate,
  } = props;
  const sampleStartTime =
    calendarSelectedDate.getFullYear() +
    '-' +
    (calendarSelectedDate.getMonth() + 1 < 10 ? 0 : '') +
    (calendarSelectedDate.getMonth() + 1) +
    '-' +
    (calendarSelectedDate.getDate() < 10 ? 0 : '') +
    calendarSelectedDate.getDate() +
    'T' +
    (calendarSelectedDate.getHours() < 10 ? 0 : '') +
    +calendarSelectedDate.getHours() +
    ':00';
  const sampleEndTime =
    calendarSelectedDate.getFullYear() +
    '-' +
    (calendarSelectedDate.getMonth() + 1 < 10 ? 0 : '') +
    (calendarSelectedDate.getMonth() + 1) +
    '-' +
    (calendarSelectedDate.getDate() < 10 ? 0 : '') +
    calendarSelectedDate.getDate() +
    'T' +
    (calendarSelectedDate.getHours() < 10 ? 0 : '') +
    +(calendarSelectedDate.getHours() + 2) +
    ':00';

  const [inputs, setInputs] = useState({
    title: '',
    startDate: sampleStartTime,
    endDate: sampleEndTime,
    content: '',
    color: -1,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: any): void => {
    event.preventDefault();

    const URLNext = 'schedules';

    const backURL = process.env.REACT_APP_BACKURL;
    if (tokenExists()) {
      if (inputs.title == null || inputs.title == '') {
      } else if (inputs.content == null || inputs.content == '') {
      } else {
        if (inputs.startDate == null) {
          setInputs((values) => ({ ...values, startDate: sampleStartTime }));
          inputs.startDate = sampleStartTime;
        }
        if (inputs.endDate == null) {
          setInputs((values) => ({ ...values, endDate: sampleEndTime }));
          inputs.endDate = sampleEndTime;
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
            setSchedule([...schedule, { ...inputs, id: data.id }]);
            Swal.fire({
              icon: 'success',
              title: 'Saved',
              showConfirmButton: false,
              timer: 1000,
            });
            handleClose();
          });
      }
    } else {
      connectionfailed();
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Calendar</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Titles</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Titles"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startDate"
              onChange={handleChange}
              defaultValue={sampleStartTime}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
              defaultValue={sampleEndTime}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              name="content"
              placeholder="Details"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="outline-primary" size="sm">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
