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
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        {/* TODO: title styling */}
        <Modal.Title>Bookmark</Modal.Title>
      </Modal.Header>
      <Form onSubmit={addBookmark}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
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
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BookmarkModal;
