import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TodoAlertModal = ({ handleClose, show }: any) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>오늘도 수고하셨습니다!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoAlertModal;
