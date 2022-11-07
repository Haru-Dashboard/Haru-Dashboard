import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

const CreateProjectModal = ({ handleClose, show }: any) => {
  const [file, setFile] = useState<File>();

  // TODO: project 생성 fetch 함수
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) return;

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    setFile(files);
  };
  const createProject: React.FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    // formData.append(
    //   'form',
    //   new Blob([JSON.stringify(e.target.form)], { type: 'application/json' }),
    // );
    // formData.append('file', e.target.files[0]);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="pb-1" closeButton>
          <SmallTitle title="In Progress" color="black" />
        </Modal.Header>
        <Form onSubmit={createProject} encType="multipart/form-data">
          <Modal.Body>
            {/* content */}
            {/* TODO: 이미지 파일 업로드 */}
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                className="my-2 border"
                onChange={handleFile}
              />
            </Form.Group>
            {/*  */}
            <Form.Group></Form.Group>
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

            <p>작성한 태그가 뜨는 곳</p>
            <Form.Control
              type="text"
              placeholder="태그 추가하기"
              className="my-2 border"
            />

            <Form.Group className="d-flex justify-content-between">
              <Form.Control
                type="date"
                placeholder="시작일"
                className="my-2 border"
              />
              <p className="mb-0 p-3">~</p>
              <Form.Control
                type="date"
                placeholder="종료일"
                className="my-2 border"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
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
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
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
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* 
        onClick 
        1. localStorage에 저장
        2. TodayList에 emit해서 추가; state에 추가해서 새로고침하면 state는 날아가고 localStorage 것만 로드되도록 ; filterBar 로직 참고
        3. 모달 닫기
       */}
            <Button type="submit" variant="outline-primary" size="sm">
              SAVE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
