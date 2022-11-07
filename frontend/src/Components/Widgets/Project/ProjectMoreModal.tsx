import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SmallTitle from '../../Common/Title/SmallTitle';

const ProjectMoreModal = ({ handleClose, show }: any) => {
  // TODO: project 수정하기
  const updateProject = () => {};

  // TODO: 프로젝트 삭제하기
  const deleteProject = () => {};

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
          <div
            className="w-70 bg-secondary mx-auto mb-3"
            style={{ height: '150px' }}>
            image
          </div>
          <div>dates</div>
          <div>content</div>
          <div className="text-end">links</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={updateProject}>
            수정
          </Button>
          <Button variant="primary" onClick={deleteProject}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectMoreModal;
