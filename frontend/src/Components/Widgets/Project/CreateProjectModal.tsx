import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const CreateProjectModal = ({ handleClose, show }: any) => {
  // TODO: project 생성 fetch 함수
  const createProject = () => {
    return;
  };

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
            {/* content */}
            <div>
              {/* TODO: 이미지 파일 업로드 */}
              <Form.Control
                type="file"
                accept="image/*"
                className="my-2 border"
              />
              {/*  */}
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
              {/* TODO: 태그를 INPUT 창에 입력하면 P태그 부분에 태그 형식으로 뜨도록 */}
              <div>
                <p>작성한 태그가 뜨는 곳</p>
                <Form.Control
                  type="text"
                  placeholder="태그"
                  className="my-2 border"
                />
              </div>
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
              <div className="d-flex justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="링크명"
                  className="my-2 me-2 border w-50"
                />
                <Form.Control
                  type="url"
                  placeholder="링크 url"
                  className="my-2 border"
                />
              </div>
              <div className="d-flex justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="링크명"
                  className="my-2 me-2 border w-50"
                />
                <Form.Control
                  type="url"
                  placeholder="링크 url"
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
