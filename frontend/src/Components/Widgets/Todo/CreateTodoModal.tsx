import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

const createTodoModal = ({ handleClose, show }: any) => {
  const [isToday, setIsToday] = useState(true)

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <button className='border border-0 bg-light'
            onClick={e => setIsToday(true)}>Today</button>
          <button className='border border-0 bg-light'
            onClick={e => setIsToday(false)}>Routine</button>
        </Modal.Header>
        <Modal.Body>
          {isToday && (
            // todo today
            <div>todo today...</div>
          )}
          {!isToday && (
            // todo routine
            <div>todo routine</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default createTodoModal;