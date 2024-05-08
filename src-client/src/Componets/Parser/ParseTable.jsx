import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ParseTable = ({ parse, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead >
        <tr className="align-middle text-center">
          <th>ID</th>
          <th>Сайт</th>
          <th>Title</th>
          <th>Price</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {parse.map((rule) => (
          <tr key={rule.id}>
            <td>{rule.id}</td>
            <td>{rule.site}</td>
            <td>{rule.html_title}</td>
            <td>{rule.html_price}</td>
            <td>
              <div className="">
                <Button variant="primary" onClick={() => onEdit(rule)} className="g-2">
                  Редактировать
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ParseTable;