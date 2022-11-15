import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import Form from 'react-bootstrap/Form';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';
import BtnPlus from '../../Common/Button/BtnPlus';
import { defaultURL } from '../../../API';
import { project, link, inputs } from '../../../Utils/Project';
import { Badge } from 'react-bootstrap';
import { getFaviconSrc } from '../../../Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';

type projectDetail = {
  handleClose: () => void;
  show: boolean;
  item: project;
};

const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;

const ProjectDetailModal = ({ handleClose, show, item }: projectDetail) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);
  const accessToken = localStorage.getItem('accessToken');
  const URLNext = 'projects/' + item.id;
  const [file, setFile] = useState<File>();
  const [inputs, setInputs] = useState<inputs>({
    title: '',
    content: '',
    labels: [],
    links: [{ name: '', url: '' }],
    startDate: new Date(),
    endDate: new Date(),
  });

  // 수정으로 모달이 바뀌었을 때
  useEffect(() => {
    console.log(item);

    const stringLabel: Array<string> = [];
    const stringLink: Array<link> = [];

    item.projectLabels.map((label) => {
      stringLabel.push(label.name);
    });

    item.projectLinks.map((link) => {
      stringLink.push({
        name: link.name,
        url: link.url,
      });
    });
    // console.log(stringLink);

    setInputs({ ...inputs, labels: stringLabel, links: stringLink });
  }, [isUpdate]);

  useEffect(() => {
    setIsUpdate(false);
  }, [show]);

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
  const addLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    console.log('addlabel');

    if (e.key !== 'Enter') return;
    if (inputs.labels.length < 5) {
      setInputs({
        ...inputs,
        labels: inputs.labels.concat(value),
      });
    } else {
      alert('태그는 5개까지 추가 가능합니다.');
    }

    e.currentTarget.value = '';
    // console.log(inputs.labels);
  };

  const deleteLabel = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    e.preventDefault();
    // if (e.key === 'Enter') return;
    console.log('onclicklabel', idx, inputs.labels[idx]);

    const currentLabels = inputs.labels;
    currentLabels.splice(idx, 1);
    console.log(currentLabels);

    setInputs({
      ...inputs,
      labels: currentLabels,
    });
  };

  // Handle inputs when target is link
  const addLink = (event: any) => {
    event.preventDefault();
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
    if (inputs.links.length < 3) {
      setInputs({ ...inputs, links: [...inputs.links, newLink] });
    } else {
      alert('링크는 3개까지 추가 가능합니다.');
    }
  };

  const deleteLink = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    idx: number,
  ) => {
    e.preventDefault();
    // if (e.key === 'Enter') return;
    console.log('onclicklabel', idx, inputs.labels[idx]);

    const currentLink = inputs.links;
    if (currentLink.length === 1) {
      alert('링크는 1개 이상 입력해주세요');
    } else {
      currentLink.splice(idx, 1);
    }
    // console.log(currentLink);
    setInputs({
      ...inputs,
      links: currentLink,
    });
  };

  const updateProject: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // console.log(inputs, JSON.stringify(inputs));

    // TODO: append inputs after checking inputs
    formData.append(
      'form',
      new Blob([JSON.stringify(inputs)], { type: 'application/json' }),
    );
    if (file !== undefined) formData.append('file', file);
    console.log(formData);

    if (getAccessToken()) {
      // console.log(getAccessToken());

      await fetch(defaultURL + URLNext, {
        method: 'PATCH',
        headers: {
          Authorization: getAccessToken(),
        },
        body: formData,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  // 프로젝트 삭제하기
  const deleteProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = 'projects/' + item.id;
    if (checkTokenValidate()) {
      fetch(backURL + URLNext, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          handleClose();
        });
    } else {
      //
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="h-100">
        {item && (
          <div className="h-100">
            {!isUpdate && (
              <div className="h-100" id="rootDiv">
                <Modal.Header closeButton>
                  <Modal.Title>
                    <SmallTitle title="My project" color="black" />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-100">
                  {/* Todo: max-width나 max-height 설정해서 어느 정도 이상 안커지도록 하기 */}
                  <div
                    className="text-center w-80 h-30 mx-auto"
                    style={{
                      backgroundColor: '#e7e7e7',
                    }}>
                    <img
                      src={item.imageInfo.imageUrl}
                      alt={item.imageInfo.originName}
                      className="w-70"
                      id="pjtImg"
                    />
                  </div>
                  <div className="mt-4 d-flex justify-content-between">
                    <SmallTitle title="Title" color="#49649E" />
                    <p>{item.title}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <SmallTitle title="Labels" color="#49649E" />
                    <div className="d-flex justify-content-between">
                      {item.projectLabels.map((label, idx) => {
                        return (
                          <Badge
                            pill
                            key={idx}
                            bg="warning"
                            className="py-1 my-2 mx-1">
                            {label.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  {/* 프로젝트 기간 */}
                  <div>
                    <div className="d-flex justify-content-between">
                      <SmallTitle title="Date" color="#49649E" />
                      <div className="d-flex justify-content-between">
                        <p>{item.startDate}</p>
                        <p className="mx-2">~</p>
                        <p>{item.endDate}</p>
                      </div>
                    </div>
                    {/* <p>완료까지 {}</p> */}
                  </div>
                  <div>
                    <SmallTitle title="Content" color="#49649E" />
                    <p>{item.content}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <SmallTitle title="Links" color="#49649E" />
                    <div className="d-flex justify-content-end">
                      {item.projectLinks.map((link, idx) => {
                        return (
                          <a href={link.url} key={idx} className="me-2">
                            <img
                              width="24"
                              height="24"
                              src={getFaviconSrc(link.url)}
                              alt={link.name}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={(e) => setIsUpdate(true)}>
                    EDIT
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={deleteProject}>
                    DELETE
                  </Button>
                </Modal.Footer>
              </div>
            )}
            {isUpdate && (
              <div>
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
                      defaultValue={item.title}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="my-2"
                      style={{ resize: 'none' }}
                      placeholder="내용을 입력하세요"
                      name="content"
                      defaultValue={item.content}
                      onChange={handleInputChange}
                    />
                    {/* TODO: 태그를 INPUT 창에 입력하면 P태그 부분에 태그 형식으로 뜨도록 */}
                    <div className="d-flex justify-content-start">
                      {inputs.labels.map((label, idx) => (
                        <div className="d-flex justify-content-start">
                          <span className="px-2" key={idx}>
                            {label}
                          </span>
                          <span onClick={(e) => deleteLabel(e, idx)}>X</span>
                        </div>
                      ))}
                    </div>
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
                        defaultValue={item.startDate}
                        onChange={handleInputChange}
                      />
                      <p className="mb-0 p-3">~</p>
                      <Form.Control
                        type="date"
                        placeholder="종료일"
                        className="my-2 border"
                        name="endDate"
                        defaultValue={item.endDate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    {inputs.links.map((link, idx) => (
                      <Form.Group
                        className="d-flex justify-content-between align-items-center"
                        key={idx}>
                        <Form.Control
                          type="text"
                          placeholder="Google"
                          className="my-2 me-2 border w-50"
                          defaultValue={link.name}
                          name={`link-name-${idx}`}
                          onChange={addLink}
                        />
                        <Form.Control
                          required
                          pattern="https://.*"
                          placeholder="https://google.com"
                          type="url"
                          className="my-2 border"
                          name={`link-url-${idx}`}
                          defaultValue={link.url}
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
                </Form>
                <Modal.Footer>
                  <Button
                    onClick={updateProject}
                    variant="outline-primary"
                    size="sm">
                    SAVE
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={deleteProject}
                    size="sm">
                    DELETE
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectDetailModal;
