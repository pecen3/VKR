import React from 'react';
import { Table, Button } from 'react-bootstrap';

const CompetitorsTable = ({ pricingRules, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead >
        <tr className="align-middle text-center">

          <th>Название</th>
          <th>Кол-во товаров</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {pricingRules.map((rule) => (
          <tr key={rule.id}>
            <td>{rule.name}</td>
            <td>{rule.num_products}</td>
            <td>
              <div className="">
                <Button variant="primary" onClick={() => onEdit(rule)} className="g-2">
                  Редактировать
                </Button>
                {' '}
                {rule.num_products === '0' && (
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

export default CompetitorsTable;