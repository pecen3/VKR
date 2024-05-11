import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import tableFormatImage from './tableformat.png';

const RegForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [file, setFile] = useState(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Логика для отправки формы логина
    console.log('Username:', username);
    console.log('Password:', password);
    setIsApiKeyValid(false);
    setIsFileUploaded(false);
  };

  const handleCheckApiKey = (e) => {
    e.preventDefault();
    // Логика для проверки API ключа
    console.log('API Key:', apiKey);
    setIsApiKeyValid(true);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    // Логика для загрузки файла
    setFile(e.target.files[0]);
    setIsFileUploaded(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Логика для завершения регистрации
    console.log('Registration complete!');
    navigate('/login');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Регистрация</h2>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{ marginTop: '1rem' }}>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-4" style={{ marginTop: '1rem' }}>
              Отправить
            </Button>
          </Form>

          <Form onSubmit={handleCheckApiKey}>
            <Form.Group controlId="formBasicApiKey">
              <Form.Label>API ключ вашего магазина Яндекс Маркет</Form.Label>
              <Form.Control
                type="text"
                placeholder="Вставьте API ключ"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mb-4"
              disabled={!isApiKeyValid}
              style={{ marginTop: '1rem' }}
            >
              Проверить
            </Button>
          </Form>

          <Form onSubmit={handleUploadFile}>
            <Form.Group controlId="formBasicFile">
              <Form.Label>Загрузить таблицу с конкурентами</Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="file-format-tooltip">
                         <div style={{ width: '800px' }}>
        <img src={tableFormatImage} alt="Table format" style={{ maxWidth: '100%' }} />
      </div>
                  </Tooltip>
                }
              >
                <Form.Control
                  type="file"
                  onChange={handleUploadFile}
                />
              </OverlayTrigger>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mb-4"
              disabled={!isApiKeyValid}
              style={{ marginTop: '1rem' }}
            >
              Загрузить
            </Button>
          </Form>
          <Button
            variant="success"
            onClick={handleRegister}
            disabled={!isApiKeyValid || !isFileUploaded}
          >
            Завершить регистрацию
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegForm;