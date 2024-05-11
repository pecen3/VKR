import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику для отправки формы
    console.log('Username:', username);
    console.log('Password:', password);
    // После успешной отправки формы, переходим на страницу /products
    navigate('/products');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Вход в систему</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label style={{ marginTop: '1rem' }}>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ marginTop: '1rem' }}>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '1rem' }}>
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;