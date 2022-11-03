import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

type bookmarkModalProps = {
  showModal: boolean;
  handleClose: () => void;
  addBookmark: React.FormEventHandler;
};

const BookmarkModal = ({
  showModal,
  handleClose,
  addBookmark,
}: bookmarkModalProps) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered>
      <Modal.Header>
        <Modal.Title>북마크 추가</Modal.Title>
      </Modal.Header>
      <Form onSubmit={addBookmark}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Google"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="url"
              name="url"
              pattern="https://.*"
              placeholder="https://google.com"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button type="submit" variant="primary">
            완료
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BookmarkModal;
