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
import { defaultURL } from '../../../API';
import { Cookies } from 'react-cookie';

const RoutineMoreModal = ({
  handleClose,
  show,
  listItem,
  setIsCompleted,
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
  const [clickedCategory, setClickedCategory] = useState('전체');
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
    let accessToken = new Cookies().get('accessToken');
    if (accessToken !== undefined) {
      accessToken = 'Bearer ' + accessToken;
      fetch(defaultURL + url, {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          //
        });
    }
    location.reload();
  };
  const onClickDelete = () => {
    const url = `todos/${listItem.todoId}`;
    let accessToken = new Cookies().get('accessToken');
    if (accessToken !== undefined) {
      accessToken = 'Bearer ' + accessToken;
      fetch(defaultURL + url, {
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //
        });
    }
    location.reload();
  };

  useEffect(() => {
    const filtered = availableDays.filter((item: week) => item.isClicked);
    setavailableDaysList(filtered);
  }, []);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <SmallTitle title="More" color="#49649E" />
        </Modal.Header>
        {!isUpdate && (
          <div>
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
              <Button variant="secondary" onClick={(e) => setIsUpdate(true)}>
                수정
              </Button>
              <Button variant="secondary" onClick={onClickDelete}>
                삭제
              </Button>
            </Modal.Footer>
          </div>
        )}
        {isUpdate && (
          <div>
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
                    placeholder={
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
                onClick={(e) => setIsUpdate(false)}>
                돌아가기
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={onClickUpdate}>
                저장
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoutineMoreModal;
