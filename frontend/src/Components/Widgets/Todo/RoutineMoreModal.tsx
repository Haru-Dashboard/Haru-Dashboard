import React, { useEffect, useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectDayBar from './SelectDayBar';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';
import { week } from '../../../Utils/Todo';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { defaultURL } from '../../../API';
import Swal from 'sweetalert2';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const RoutineMoreModal = ({
  handleClose,
  show,
  listItem,
  setIsCompleted,
  handleUpdateEmit,
  isCompleted,
}: any) => {
  const availableDays: Array<week> = [
    { id: 'sun', day: '일', isClicked: listItem.sun, color: 'text-danger' },
    { id: 'mon', day: '월', isClicked: listItem.mon, color: 'text-black' },
    { id: 'tue', day: '화', isClicked: listItem.tue, color: 'text-black' },
    { id: 'wed', day: '수', isClicked: listItem.wed, color: 'text-black' },
    { id: 'thu', day: '목', isClicked: listItem.thu, color: 'text-black' },
    { id: 'fri', day: '금', isClicked: listItem.fri, color: 'text-black' },
    { id: 'sat', day: '토', isClicked: listItem.sat, color: 'text-primary' },
  ];

  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedDayList, setSelectedDayList] = useState<Array<week>>([]);
  const [clickedCategory, setClickedCategory] = useState<string>();
  const [writtenContent, setWrittenContent] = useState('');
  const [availableDaysList, setavailableDaysList] = useState<Array<week>>([]);

  // selectedDayBar에서 선택된 날짜 리스트를 받아오기 위한 함수
  const handleSelectedDayList = (selectedList: Array<week>) => {
    setSelectedDayList(selectedList);
  };

  // filterBar 컴포넌트에서 넘어온 선택된 카테고리 state에 저장하기
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };
  const onClickUpdate = () => {
    const url = `todos/${listItem.todoId}`;
    const data = {
      category: clickedCategory,
      title: writtenContent,
      sun: selectedDayList[0].isClicked,
      mon: selectedDayList[1].isClicked,
      tue: selectedDayList[2].isClicked,
      wed: selectedDayList[3].isClicked,
      thu: selectedDayList[4].isClicked,
      fri: selectedDayList[5].isClicked,
      sat: selectedDayList[6].isClicked,
    };

    if (checkTokenValidate()) {
      fetch(defaultURL + url, {
        method: 'PATCH',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          handleUpdateEmit(true);
          handleClose();
        });
    }
  };

  const onClickDelete = () => {
    const url = `todos/${listItem.todoId}`;
    if (checkTokenValidate()) {
      fetch(defaultURL + url, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          handleUpdateEmit(true);
          Swal.fire({
            text: '삭제되었습니다',
            icon: 'success',
            showConfirmButton: true,
            timer: 1000,
          }).then(() => handleClose());
        });
    }
  };

  useEffect(() => {
    const filtered = availableDays.filter((item: week) => item.isClicked);
    setavailableDaysList(filtered);
    handleSelectedDayList(availableDays);
    setClickedCategory(listItem.category);
    setWrittenContent(listItem.content);
  }, []);

  useEffect(() => {
    setIsUpdate(false);
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        {!isUpdate && (
          <div>
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
              <Button
                variant="outline-primary"
                size="sm"
                onClick={(e) => setIsUpdate(true)}>
                EDIT
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={onClickDelete}>
                DELETE
              </Button>
            </Modal.Footer>
          </div>
        )}
        {isUpdate && (
          <div>
            <Modal.Header closeButton>
              <FontAwesomeIcon
                icon={faArrowLeft}
                color="#49649E"
                className="me-3 hover"
                onClick={(e) => setIsUpdate(false)}
              />
              <SmallTitle title="More" color="#49649E" />
            </Modal.Header>
            <Modal.Body>
              <div>
                {/* 날짜 선택 부분 */}
                <SelectDayBar
                  handleSelectedDayList={handleSelectedDayList}
                  availableDays={availableDays}
                  availableDaysList={availableDaysList}
                />
                <hr />
                <div className="d-flex justify-content-between">
                  <RoutineFilterBar
                    handleCategory={handleCategory}
                    clicked={listItem.category}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Routine 이름을 입력해주세요"
                    defaultValue={
                      listItem.title ? listItem.title : 'Routine 이름'
                    }
                    onChange={(e) => setWrittenContent(e.target.value)}
                    className="ms-5 w-100 border border-0"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onClickUpdate}>
                SAVE
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoutineMoreModal;
