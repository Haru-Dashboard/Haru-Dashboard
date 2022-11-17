import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const BackgroundSettingModal = ({ show, handleClose }: any) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="h-100">
        <Modal.Header closeButton>
          <Modal.Title>
            <SmallTitle title="Background" color="black" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-100"></Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" size="sm">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BackgroundSettingModal;
