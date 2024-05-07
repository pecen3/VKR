import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';

const MinPriceForm = ({productId, productInfo, modalChange, setModalChange}) => {
  const [minPrice, setMinPrice] = useState('');

  useEffect(() => {
    setMinPrice(productInfo.min_price)


  }, [modalChange]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/products/minprice/${productId}`, {
        min_price: parseInt(minPrice),
      });
      console.log('Минимальная цена обновлена успешно');
      setModalChange(Math.random())

    } catch (error) {
      console.error('Ошибка при обновлении минимальной цены:', error);

    }
  };

  return (
<Form onSubmit={handleSubmit}>
  <Row className="align-items-center">
  <div>Установка минимальной цены:</div>
  <div className='mt-2 text-secondary font-weight-light' style={{ fontSize: '11px' }}> Текущая минимальная цена: {productInfo.min_price}</div>
    <Col md={8}>
      <Form.Group controlId="minPrice">
        
        <Form.Control
          type="number"
          placeholder="Введите минимальную цену"

          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>
    </Col>
    <Col md={4} className="text-right">
      <Button variant="primary" type="submit">
        Изменить
      </Button>
      
    </Col>
  </Row>
</Form>
  );
};

const CurrentPriceForm = ({productId, productInfo, modalChange, setModalChange}) => {
  const [currentPrice, setCurrentPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    setCurrentPrice(productInfo.price);
  }, [modalChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, что новая цена не ниже минимальной
    if (parseInt(currentPrice) < productInfo.min_price) {
      setPriceError(`Новая цена (${currentPrice}) меньше минимальной цены (${productInfo.min_price})`);
      return;
    } else {
      setPriceError('');
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/products/price/${productId}`, {
        price: parseInt(currentPrice),
      });
      console.log('Цена обновлена успешно');
      setModalChange(Math.random());
    } catch (error) {
      console.error('Ошибка при обновлении цены:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
      <div>Установка своей цены:</div>
      <div className='mt-2 text-secondary font-weight-light' style={{ fontSize: '11px' }}> Текущая цена: {productInfo.price}</div>
        <Col>
          <Form.Group controlId="currentPrice">
            
            <Form.Control
              type="number"
              placeholder="Введите цену"

              onChange={(e) => setCurrentPrice(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="text-right">
          <Button variant="primary" type="submit">
            Изменить
          </Button>
        </Col>
        <div className="mt-2 text-danger font-weight-light" style={{ fontSize: '11px' }}>
          {priceError && <strong>{priceError}</strong>}
        </div>
        <div className='mt-2 text-danger font-weight-light' style={{ fontSize: '11px' }}> <strong>При установке своей цены для товара автоматичский репрайсинг выключится</strong></div>
      </Row>
    </Form>
  );
};

const PriceInputs = ({productId, productInfo, modalChange, setModalChange}) => {
  return (
    <div className="mt-5">
      <div className="mb-5 mt-2">
      <MinPriceForm productId={productId} productInfo={productInfo} modalChange={modalChange} setModalChange={setModalChange}/>
    </div>
    <div className="mb-5 mt-5" >
      <CurrentPriceForm productId={productId} productInfo={productInfo} modalChange={modalChange} setModalChange={setModalChange} />
      </div>
    </div>
  );
};

export default PriceInputs;