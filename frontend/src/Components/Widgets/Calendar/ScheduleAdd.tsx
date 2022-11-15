import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connectionfailed, datetimeTimeSettingTo0 } from './ScheduleDataType';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';
import Swal from 'sweetalert2';
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
  const handleSubmit = (event: any): void => {
    event.preventDefault();

    const URLNext = 'schedules';

    const backURL = process.env.REACT_APP_BACKURL;
    if (checkTokenValidate()) {
      if (inputs.title == null || inputs.title == '') {
      } else if (inputs.content == null || inputs.content == '') {
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
      <Modal.Header>
        <Modal.Title>New Schedule</Modal.Title>
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
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDate"
              onChange={handleChange}
              required
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
          <Button type="submit" variant="outline-primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
