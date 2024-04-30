import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCompetitorProduct = ({ productId, modalChange, setModalChange }) => {
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/competitors/`);
        setStores(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Form>
        <Row>
          <Col >
            <Form.Group controlId="newCompetitorUrl">
              <Form.Control
                type="text"
                placeholder="Cсылка на товар"
                value={newCompetitorUrl}
                onChange={(e) => setNewCompetitorUrl(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="selectStore">
              <Form.Control
                as="select"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                <option value="" disabled hidden>
                  Выберите магазин
                </option>
                {stores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Button variant="primary" onClick={() => (console.log(12))}>Добавить конкурента</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddCompetitorProduct;
