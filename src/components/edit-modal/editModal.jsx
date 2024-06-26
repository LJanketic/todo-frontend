import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTodoContext } from '../context/TodoContext';

function EditTodoModal({ show, handleClose, selectedTodo }) {
  const { updateTodo } = useTodoContext();
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDone(selectedTodo.done);
    }
  }, [selectedTodo]);

  useEffect(() => {
    const isTodoChanged =
      selectedTodo && (text !== selectedTodo.text || done !== selectedTodo.done);
    setIsDirty(isTodoChanged);
  }, [selectedTodo, text, done]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDoneChange = (e) => {
    setDone(e.target.checked);
  };

  const handleUpdate = () => {
    const updatedTodo = { ...selectedTodo, text, done };
    updateTodo(updatedTodo);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control type="text" value={text} onChange={handleTextChange} />
          </Form.Group>
          <Form.Group controlId="formDone">
            <Form.Label>Done</Form.Label>
            <Form.Check type="checkbox" checked={done} onChange={handleDoneChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={!isDirty}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

EditTodoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedTodo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default EditTodoModal;
