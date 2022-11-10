import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
type link = {
  name: string;
  url: string;
};
type inputs = {
  title: string;
  content: string;
  labels: string[];
  links: link[];
  startDate: Date;
  endDate: Date;
};

const ProjectCreationModal = ({ handleClose, show }: any) => {
  const [file, setFile] = useState<File>();
  const [inputs, setInputs] = useState<inputs>({
    title: '',
    content: '',
    labels: [],
    links: [{ name: '', url: '' }],
    startDate: new Date(),
    endDate: new Date(),
  });

  // TODO: project 생성 fetch 함수
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const userFile = (target.files as FileList)[0];
    if (userFile === undefined) return;

    if (userFile.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }

    setFile(userFile);
  };

  // Handle inputs when target is not label or link
  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle inputs when target is label
  const addLabel = (event: any) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    setInputs({ ...inputs, labels: [...inputs.labels, event.target.value] });
    event.target.value = '';
  };

  // Handle inputs when target is link
  const addLink = (event: any) => {
    const value: string = event.target.value;
    const key: 'name' | 'url' = event.target.name.split('-')[1];
    const id = Number(event.target.name.split('-')[2]);
    const newLinks = inputs.links.map((link, idx) =>
      idx !== id ? link : { ...link, ...{ [key]: value } },
    );
    setInputs({
      ...inputs,
      links: newLinks,
    });
  };

  const addNewLink = (event: any) => {
    const newLink: link = {
      name: '',
      url: '',
    };
    setInputs({ ...inputs, links: [...inputs.links, newLink] });
  };

  const createProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // TODO: append inputs after checking inputs
    formData.append(
      'form',
      new Blob([JSON.stringify(inputs)], { type: 'application/json' }),
    );
    if (file !== undefined) formData.append('file', file);

    if (checkTokenValidate()) {
      const url = process.env.REACT_APP_BACKURL;
      await fetch(url + `projects`, {
        method: 'POST',
        headers: {
          Authorization: getAccessToken(),
        },
        body: formData,
      }).then(
        () => {
          setFile(undefined);
          setInputs({
            title: '',
            content: '',
            labels: [],
            links: [{ name: '', url: '' }],
            startDate: new Date(),
            endDate: new Date(),
          });
        },
        // close Modal?
      );
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
            <Form.Group>
              <Form.Control
                type="file"
                accept="image/*"
                className="my-2 border"
                onChange={handleFile}
              />
            </Form.Group>
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
            <Form.Control
              type="text"
              placeholder="태그 추가하기"
              className="my-2 border"
              name="labels"
              onKeyUp={addLabel}
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
            {inputs.links.map((link, idx) => (
              <Form.Group className="d-flex justify-content-between" key={idx}>
                <Form.Control
                  type="text"
                  placeholder="링크명"
                  className="my-2 me-2 border w-50"
                  name={`link-name-${idx}`}
                  onChange={addLink}
                />
                <Form.Control
                  type="url"
                  placeholder="링크 url"
                  className="my-2 border"
                  name={`link-url-${idx}`}
                  onChange={addLink}
                />
              </Form.Group>
            ))}
            <BtnPlus onClick={addNewLink} />
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

export default ProjectCreationModal;
