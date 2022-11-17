import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { tokenExists, getAccessToken } from '../../../API/Authentication';
import { projectLink } from '../../../Utils/Project';
import Swal from 'sweetalert2';
const FILE_SIZE_MAX_LIMIT = 1 * 1024 * 1024;

type inputs = {
  title: string;
  content: string;
  labels: string[];
  links: projectLink[];
  startDate: Date;
  endDate: Date;
};

const CreateProjectModal = ({ handleClose, show, handleSaved }: any) => {
  const [file, setFile] = useState<File>();
  const [inputs, setInputs] = useState<inputs>({
    title: '',
    content: '',
    labels: [],
    links: [{ name: '', url: '' }],
    startDate: new Date(),
    endDate: new Date(),
  });
  const todayDate = new Date().toISOString().slice(0, 10);

  // project 생성 fetch 함수
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const userFile = (target.files as FileList)[0];

    if (userFile === undefined) return;

    if (userFile.size > FILE_SIZE_MAX_LIMIT) {
      target.value = '';
      Swal.fire({
        text: '업로드 가능한 최대 용량은 1MB입니다',
        icon: 'error',
        showConfirmButton: true,
        timer: 1000,
      });
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
    if (inputs.labels.length < 5) {
      setInputs({ ...inputs, labels: [...inputs.labels, event.target.value] });
    } else {
      Swal.fire({
        icon: 'info',
        text: '태그는 5개까지 추가할 수 있습니다',
        showConfirmButton: true,
        timer: 1000,
      });
    }
    event.target.value = '';
  };

  const deleteLabel = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    e.preventDefault();
    const currentLabels = inputs.labels;
    currentLabels.splice(idx, 1);
    setInputs({
      ...inputs,
      labels: currentLabels,
    });
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
    const newLink: projectLink = {
      name: '',
      url: '',
    };
    if (inputs.links.length < 3) {
      setInputs({ ...inputs, links: [...inputs.links, newLink] });
    } else {
      Swal.fire({
        icon: 'info',
        text: '링크는 3개까지 추가할 수 있습니다',
        showConfirmButton: true,
        timer: 1000,
      });
    }
  };
  const deleteLink = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    idx: number,
  ) => {
    e.preventDefault();
    const currentLink = inputs.links;
    if (currentLink.length === 1) {
      Swal.fire({
        text: '링크는 1개 이상 입력해주세요',
        icon: 'info',
        showConfirmButton: true,
        timer: 1000,
      });
    } else {
      currentLink.splice(idx, 1);
    }
    setInputs({
      ...inputs,
      links: currentLink,
    });
  };

  const createProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // TODO: append inputs after checking inputs
    formData.append(
      'form',
      new Blob([JSON.stringify(inputs)], { type: 'application/json' }),
    );
    if (file === undefined) {
      Swal.fire({
        text: '이미지를 선택해주세요',
        icon: 'error',
        showConfirmButton: true,
        timer: 1000,
      });
    } else {
      formData.append('file', file);
      if (tokenExists()) {
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
            handleSaved(true);
            handleClose();
          },
          // close Modal?
        );
      }
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
                required
                type="file"
                accept="image/*"
                className="my-2 border"
                onChange={handleFile}
              />
            </Form.Group>
            <Form.Control
              required
              autoFocus
              type="text"
              placeholder="제목"
              name="title"
              className="my-2 border"
              onChange={handleInputChange}
            />
            <Form.Control
              required
              as="textarea"
              rows={3}
              className="my-2"
              style={{ resize: 'none' }}
              placeholder="내용을 입력하세요"
              name="content"
              onChange={handleInputChange}
            />
            {/* TODO: 태그를 INPUT 창에 입력하면 P태그 부분에 태그 형식으로 뜨도록 */}
            <div className="d-flex justify-content-start">
              {inputs.labels.map((label, idx) => (
                <div key={idx}>
                  <span className="px-2">{label}</span>
                  <span onClick={(e) => deleteLabel(e, idx)}>X</span>
                </div>
              ))}
            </div>
            <Form.Control
              type="text"
              maxLength={7}
              placeholder="태그 추가하기"
              className="my-2 border"
              name="labels"
              onKeyUp={addLabel}
            />

            <Form.Group className="d-flex justify-content-between">
              <Form.Control
                required
                type="date"
                placeholder="시작일"
                className="my-2 border"
                name="startDate"
                defaultValue={todayDate}
                onChange={handleInputChange}
              />
              <p className="mb-0 p-3">~</p>
              <Form.Control
                required
                type="date"
                placeholder="종료일"
                className="my-2 border"
                name="endDate"
                defaultValue={todayDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            {inputs.links.map((link, idx) => (
              <Form.Group
                className="d-flex justify-content-between align-items-center"
                key={idx}>
                <Form.Control
                  required
                  type="text"
                  placeholder="New Link"
                  className="my-2 me-2 border w-50"
                  name={`link-name-${idx}`}
                  onChange={addLink}
                />
                <Form.Control
                  required
                  type="url"
                  pattern="https://.*"
                  placeholder="https://google.com"
                  className="my-2 border"
                  name={`link-url-${idx}`}
                  onChange={addLink}
                />
                <FontAwesomeIcon
                  icon={faSquareMinus}
                  color="#FA5252"
                  className="col-1 p-0"
                  onClick={(e) => deleteLink(e, idx)}
                />
              </Form.Group>
            ))}
            <BtnPlus onClick={addNewLink} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" size="sm" onClick={createProject}>
              SAVE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
