import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import Form from 'react-bootstrap/Form';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

import { defaultURL } from '../../../API';
import { project } from '../../../Utils/Project';
import { Badge } from 'react-bootstrap';

type projectDetail = {
  handleClose: () => void;
  show: boolean;
  item: project;
};

const ProjectDetailModal = ({ handleClose, show, item }: projectDetail) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);
  const [rootWidth, setRootWidth] = useState(0);
  const accessToken = localStorage.getItem('accessToken');
  const URLNext = 'projects/' + item.id;

  // Tproject 수정하기
  const updateProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
  // Read project detail
  // useEffect(() => {
  //   fetch(defaultURL + URLNext, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setProject(data));
  // }, [show]);

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
                    {item.projectLinks.map((link) => {
                      return <a href={link.link}>{link.name}</a>;
                    })}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={(e) => setIsUpdate(true)}>
                    수정
                  </Button>
                  <Button variant="primary" onClick={deleteProject}>
                    삭제
                  </Button>
                </Modal.Footer>
              </div>
            )}
            {isUpdate && (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <div className="d-flex align-items-center">
                      <SmallTitle title="My project" color="black" />
                      <div className="ms-5 d-flex justify-content-between">
                        {item.projectLabels.map((label) => {
                          return (
                            <p
                              className="ms-1 mb-0"
                              style={{ fontSize: '0.8rem' }}>
                              {label.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <div
                      className="w-70 bg-secondary mx-auto mb-3"
                      style={{ height: '150px' }}>
                      <img src={item.imageInfo.imageUrl} alt="" />
                    </div>
                    <Form.Group>
                      <Form.Label>종료일</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startDate"
                        required
                      />
                    </Form.Group>
                    <div>content</div>
                    <div className="text-end">
                      {item.projectLinks.map((link) => {
                        return <a href={link.link}>{link.name}</a>;
                      })}
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={updateProject}>
                    저장
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
