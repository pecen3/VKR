import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ParserModal = ({
  show,
  onClose,
  onSave,
  editingRule,
  newParse,
  setNewParse,
}) => {
  return (
    <Modal show={show} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{editingRule ? 'Редактировать парсер сайта' : 'Создать парсер сайта'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="description">
            <Form.Label>Сайт</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите сайт"
              value={newParse.site}
              onChange={(e) => setNewParse({ ...newParse, site: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="rule">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите html title"
              value={newParse.html_title}
              onChange={(e) => setNewParse({ ...newParse, html_title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="rule">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите html price"
              value={newParse.html_price}
              onChange={(e) => setNewParse({ ...newParse, html_price: e.target.value })}
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

export default ParserModal;