import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const CreateProjectModal = ({ handleClose, show }: any) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="pb-1" closeButton>
          <SmallTitle title="In Progress" color="black" />
          {/* <button className='border border-0 bg-light'
        onClick={e => setIsToday(true)}>Today</button>
      <button className='border border-0 bg-light'
        onClick={e => setIsToday(false)}>Routine</button> */}
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* TODO: 이미지 파일 업로드 */}
            {/* content */}
            <div>
              <Form.Control
                type="text"
                placeholder="제목"
                className="my-2 border"
              />
              <Form.Control
                as="textarea"
                rows={3}
                className="my-2"
                style={{ resize: 'none' }}
                placeholder="내용을 입력하세요"
              />
              <Form.Control
                type="text"
                placeholder="태그"
                className="my-2 border"
              />
              <div className="d-flex justify-content-between">
                <Form.Control
                  type="date"
                  placeholder="시작 날짜"
                  className="my-2 border"
                />
                <p className="mb-0 py-3">~</p>
                <Form.Control
                  type="date"
                  placeholder="시작 날짜"
                  className="my-2 border"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* 
        onClick 
        1. localStorage에 저장
        2. TodayList에 emit해서 추가; state에 추가해서 새로고침하면 state는 날아가고 localStorage 것만 로드되도록 ; filterBar 로직 참고
        3. 모달 닫기
       */}
          <Button variant="outline-primary" size="sm">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
