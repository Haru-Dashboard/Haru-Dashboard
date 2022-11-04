import React from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const TodoMoreModal = ({
  handleClose,
  show,
  listItem,
  setIsCompleted,
  isCompleted,
}: any) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <SmallTitle title="More" color="#49649E" />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <SmallTitle title="category" color="#49649E" />
            <p>{listItem.category}</p>
          </div>
          <div className="d-flex justify-content-between">
            <SmallTitle title="content" color="#49649E" />
            <p>{listItem.content}</p>
          </div>
          <div className="d-flex justify-content-between">
            <SmallTitle title="Done" color="#49649E" />
            <FontAwesomeIcon
              icon={isCompleted ? faSquareCheck : faSquare}
              color="black"
              className="col-1 p-0"
              onClick={(e) => setIsCompleted(!isCompleted)}
            />
          </div>
        </Modal.Body>{' '}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoMoreModal;
