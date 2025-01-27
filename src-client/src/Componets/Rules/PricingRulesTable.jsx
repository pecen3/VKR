import React from 'react';
import { Table, Button, Stack } from 'react-bootstrap';

const PricingRulesTable = ({ pricingRules, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead >
        <tr className="align-middle text-center">

          <th>Описание</th>
          <th>Правило</th>
          <th>Применяется к товарам</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {pricingRules.map((rule) => (
          <tr key={rule.id}>

            <td>{rule.description}</td>
            <td>{rule.rule || 'Без правила'}</td>
            <td>{rule.product_count}</td>
            <td>
              <div className="">
                <Stack gap={1}>
                <Button variant="primary" onClick={() => onEdit(rule)} >
                  Редактировать
                </Button>
                {' '}
                {rule.product_count === '0' && (
                  <Button variant="danger" onClick={() => onDelete(rule.id)}>
                    Удалить
                  </Button>
                )}
                </Stack>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PricingRulesTable;