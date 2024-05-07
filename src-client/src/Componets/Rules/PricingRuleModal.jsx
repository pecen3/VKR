import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PricingRuleModal = ({
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
        <Modal.Title>{editingRule ? 'Редактировать правило' : 'Создать правило'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите описание"
              value={newRule.description}
              onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="rule">
            <Form.Label>Правило</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите правило"
              value={newRule.rule}
              onChange={(e) => setNewRule({ ...newRule, rule: e.target.value })}
            />
          </Form.Group>
          {!editingRule && (
            <div className="mt-3">
              <h5>Инструкция по созданию правила:</h5>
              <p>
                <strong>cost</strong> - себестоимость вашего товара<br />
                <strong>retail</strong> - розничная цена вашего товара<br />
                <strong>min</strong> - минимальная цена конкурентов<br />
                <strong>avg</strong> - средняя цена конкурентов<br />
                <strong>max</strong> - максимальная цена конкурентов
              </p>
              <p>
                <strong>min + min * 0.05</strong> - Следование за минимальной ценой с наценкой 5%<br />
                <strong>(min &gt; cost + cost * 0.05) ? min : cost + cost * 0.05</strong> - Если мин. цена конкурентов больше закупочной с маржой 5%, поставить минимальную, иначе закупочную с наценкой 5%
              </p>
            </div>
          )}
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

export default PricingRuleModal;