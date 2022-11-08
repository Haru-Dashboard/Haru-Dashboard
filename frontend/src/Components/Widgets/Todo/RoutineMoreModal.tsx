import React, { useState } from 'react';
import SmallTitle from '../../Common/Title/SmallTitle';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectDayBar from './SelectDayBar';
import RoutineFilterBar from './FilterBar/RoutineFilterBar';
import { Form } from 'react-bootstrap';
import { week } from '../../../Utils/Todo';

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
  const [selectedDayList, setSelectedDayList] = useState<Array<week>>([]);
  const [writtenContent, setWrittenContent] = useState('');
  const [clickedCategory, setClickedCategory] = useState('전체');

  const onClickUpdate = () => {};
  const onClickDelete = () => {};
  const handleSelectedDayList = (selectedList: Array<week>) => {
    // console.log('createtodomodal routine= ', selectedList);

    setSelectedDayList(selectedList);
  };
  // filterBar 컴포넌트에서 넘어온 선택된 카테고리 state에 저장하기
  const handleCategory = (clicked: string) => {
    setClickedCategory(clicked);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <SmallTitle title="More" color="#49649E" />
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* 날짜 선택 부분 */}
            <SelectDayBar handleSelectedDayList={handleSelectedDayList} />
            <hr />
            <div className="d-flex justify-content-between">
              <RoutineFilterBar
                handleCategory={handleCategory}
                clicked={listItem.category}
              />
              <Form.Control
                type="text"
                placeholder="Routine 이름"
                onChange={(e) => setWrittenContent(e.target.value)}
                className="ms-5 w-100 border border-0"
                value={listItem.title}
              />
            </div>
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
