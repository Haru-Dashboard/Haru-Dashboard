import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';
import Form from 'react-bootstrap/Form';

const ProjectDetailModal = ({ handleClose, show, item }: any) => {
  // TODO: project 수정하기

  const updateProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // TODO: 프로젝트 삭제하기
  const deleteProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const backURL = process.env.REACT_APP_BACKURL;
    const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
    const URLNext = 'projects/' + item.id;
    if (accessToken !== null) {
      fetch(backURL + URLNext, {
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
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
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex">
              <SmallTitle title="My project" color="black" />
              <p className="ms-5 mb-0">tags</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {item !== null ? (
            <Form>
              <div
                className="w-70 bg-secondary mx-auto mb-3"
                style={{ height: '150px' }}>
                image
              </div>
              <Form.Group>
                <Form.Label>종료일</Form.Label>
                <Form.Control type="datetime-local" name="startDate" required />
              </Form.Group>
              <div>content</div>
              <div className="text-end">links</div>
            </Form>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateProject}>
            수정
          </Button>
          <Button variant="primary" onClick={deleteProject}>
            삭제
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            종료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectDetailModal;
