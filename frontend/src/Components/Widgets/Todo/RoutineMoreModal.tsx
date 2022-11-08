import React, { useEffect } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';

const RoutineMoreModal = ({
  handleClose,
  show,
  listItem,
  setIsCompleted,
  isCompleted,
}: any) => {
  const availableDays = [
    { day: '일', isClicked: listItem.sun },
    { day: '월', isClicked: listItem.mon },
    { day: '화', isClicked: listItem.tue },
    { day: '수', isClicked: listItem.wed },
    { day: '목', isClicked: listItem.thu },
    { day: '금', isClicked: listItem.fri },
    { day: '토', isClicked: listItem.sat },
  ];
  const onClickUpdate = () => {};
  const onClickDelete = () => {};

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <SmallTitle title="More" color="#49649E" />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between mb-5">
            {availableDays.map((item, idx: number) => {
              return (
                <button
                  style={{ borderColor: '#49649E' }}
                  className={`border border-3 bg-white rounded-circle fw-bold 
                    ${item.isClicked ? 'border-secondary' : 'border-white'}`}
                  key={idx}>
                  {item.day}
                </button>
              );
            })}
          </div>
          <div className="d-flex justify-content-between">
            <SmallTitle title="category" color="#49649E" />
            <p>{listItem.category}</p>
          </div>
          <div className="d-flex justify-content-between">
            <SmallTitle title="content" color="#49649E" />
            <p>{listItem.title}</p>
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
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClickUpdate}>
            수정
          </Button>
          <Button variant="secondary" onClick={onClickDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoutineMoreModal;
