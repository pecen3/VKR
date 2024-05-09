import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';

const SettingsForm = () => {
  const [userInfo, setUserInfo] = useState({
    login: '',
    company_id: '',
    api_key: '',
    sync_period: 0,
    reprice_period: 0,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/sync`);
        setUserInfo({
          login: response.data[0].login,
          company_id: response.data[0].company_id,
          api_key: response.data[0].api_key,
          sync_period: response.data[0].sync_period,
          reprice_period: response.data[0].reprice_period,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSyncPeriodChange = (event) => {
    setUserInfo({ ...userInfo, sync_period: event.target.value });
  };

  const handleRepricePeriodChange = (event) => {
    setUserInfo({ ...userInfo, reprice_period: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/sync/sync-period`, {
        login: userInfo.login,
        sync_period: userInfo.sync_period,
      });
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/sync/reprice-period`, {
        login: userInfo.login,
        reprice_period: userInfo.reprice_period,
      });
      console.log('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const downloadDatabaseDump = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/sync/database-dump`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      saveAs(blob, 'database_dump.sql');
    } catch (error) {
      console.error('Error downloading database dump:', error);
    }
  };

  return (
    <Container className="my-5">
    <Row>
      <Col>
        <Stack className="mb-4">
          <div className="fw-bold">ID компании</div>
          <div>{userInfo.company_id}</div>
        </Stack>
        <Stack className="mb-4">
          <div className="fw-bold">API ключ</div>
          <div>{userInfo.api_key}</div>
        </Stack>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Период синхронизации с ЯМ</Form.Label>
            <Form.Control
              as="select"
              value={userInfo.sync_period}
              onChange={handleSyncPeriodChange}
              style={{ width: 'auto' }}
            >
              <option value={12}>12 часа</option>
              <option value={24}>24 часа</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Период репрайсинга</Form.Label>
            <Form.Control
              as="select"
              value={userInfo.reprice_period}
              onChange={handleRepricePeriodChange}
              style={{ width: 'auto' }}
            >
              <option value={12}>12 часа</option>
              <option value={24}>24 часа</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="me-3">
            Сохранить
          </Button>
          <Button variant="secondary" onClick={downloadDatabaseDump}>
            Скачать копию базы данных
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default SettingsForm;