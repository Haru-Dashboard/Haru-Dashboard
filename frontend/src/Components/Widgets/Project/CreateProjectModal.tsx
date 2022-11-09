import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import BtnPlus from '../../Common/Button/BtnPlus';

const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
type link = {
  name: string;
  url: string;
};
type form = {
  title: string;
  content: string;
  labels: Array<string>;
  links: Array<link>;
  startDate: Date;
  endDate: Date;
};

const CreateProjectModal = ({ handleClose, show }: any) => {
  const [file, setFile] = useState<File>();
  const [form, setForm] = useState<form>();

  // TODO: project 생성 fetch 함수
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) return;

    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    setFile(files);
  };

  const [inputs, setInputs] = useState<form>({
    title: '',
    content: '',
    labels: [],
    links: [{ name: '', url: '' }],
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const addLabel = (event: any) => {
    event.preventDefault();
    setInputs({ ...inputs, labels: [...inputs.labels, event.target.value] });
    event.target.value = '';
  };

  const enterLabel = (event: any) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    addLabel(event);
  };

  const addLink = (event: any) => {
    const newLink: link = {
      name: '',
      url: '',
    };
    setInputs({ ...inputs, links: [...inputs.links, newLink] });
  };

  const createProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      'form',
      new Blob([JSON.stringify(inputs)], { type: 'application/json' }),
    );
    if (file !== undefined) formData.append('file', file);

    const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
    if (accessToken !== null) {
      const url = process.env.REACT_APP_BACKURL;
      await fetch(url + `projects`, {
        method: 'POST',
        headers: {
          Authorization: accessToken,
        },
        body: formData,
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="pb-1" closeButton>
          <SmallTitle title="In Progress" color="black" />
        </Modal.Header>
        <Form encType="multipart/form-data">
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
              name="title"
              className="my-2 border"
              onChange={handleInputChange}
            />
            <Form.Control
              as="textarea"
              rows={3}
              className="my-2"
              style={{ resize: 'none' }}
              placeholder="내용을 입력하세요"
              name="content"
              onChange={handleInputChange}
            />
            {/* TODO: 태그를 INPUT 창에 입력하면 P태그 부분에 태그 형식으로 뜨도록 */}

            <p>작성한 태그가 뜨는 곳</p>
            {inputs.labels.map((label, idx) => (
              <span className="px-2" key={idx}>
                {label}
              </span>
            ))}
            <span></span>
            <Form.Control
              type="text"
              placeholder="태그 추가하기"
              className="my-2 border"
              name="labels"
              onKeyUp={enterLabel}
            />

            <Form.Group className="d-flex justify-content-between">
              <Form.Control
                type="date"
                placeholder="시작일"
                className="my-2 border"
                name="startDate"
                onChange={handleInputChange}
              />
              <p className="mb-0 p-3">~</p>
              <Form.Control
                type="date"
                placeholder="종료일"
                className="my-2 border"
                name="endDate"
                onChange={handleInputChange}
              />
            </Form.Group>
            {inputs.links.map((_, idx) => (
              <Form.Group className="d-flex justify-content-between" key={idx}>
                <Form.Control
                  type="text"
                  placeholder="링크명"
                  className="my-2 me-2 border w-50"
                  name={`links[${idx}].name`}
                  onChange={handleInputChange}
                />
                <Form.Control
                  type="url"
                  placeholder="링크 url"
                  className="my-2 border"
                  name={`links[${idx}].url`}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
            <BtnPlus onClick={addLink} />
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button onClick={createProject} variant="outline-primary" size="sm">
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
