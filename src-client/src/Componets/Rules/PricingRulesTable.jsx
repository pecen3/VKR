import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PricingRulesTable = ({ pricingRules, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Описание</th>
          <th>Правило</th>
          <th>Применяется к товарам</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {pricingRules.map((rule) => (
          <tr key={rule.id}>
            <td>{rule.id}</td>
            <td>{rule.description}</td>
            <td>{rule.rule || 'Без правила'}</td>
            <td>{rule.product_count}</td>
            <td>
              <div className="">
                <Button variant="primary" onClick={() => onEdit(rule)} className="g-2">
                  Редактировать
                </Button>
                {' '}
                {rule.product_count === '0' && (
                  <Button variant="danger" onClick={() => onDelete(rule.id)}>
                    Удалить
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PricingRulesTable;