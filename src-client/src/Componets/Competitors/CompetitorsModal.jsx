import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CompetitorsModal = ({
  show,
  onClose,
  onSave,
  editingRule,
  newRule,
  setNewRule,
}) => {
  return (
    <Modal show={show} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{editingRule ? 'Редактировать магазин' : 'Добавить магазин'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="description">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={onSave}>
          {editingRule ? 'Сохранить' : 'Добавить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompetitorsModal;