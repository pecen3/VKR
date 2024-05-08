import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import ParseTable from './ParseTable';
import ParserModal from './PaserModal';

const ParserW = () => {
  const [parse, setParse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newParse, setNewParse] = useState({
    site: '',
    html_title: '',
    html_price: '',
  });
  const [editingRule, setEditingRule] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchParse();
  }, []);

  const fetchParse = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/parse/`);
      setParse(response.data);
    } catch (error) {
      console.error('Ошибка при получении правил ценообразования:', error);
    }
  };

  const handleCreateRule = () => {
    setShowModal(true);
    setEditingRule(null);
  };

  const handleEditRule = (rule) => {
    setShowModal(true);
    setEditingRule(rule);
    setNewParse({
      site: rule.site,
      html_title: rule.html_title,
      html_price: rule.html_price
    });
  };

  const handleSaveRule = async () => {
    try {
      if (editingRule) {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/parse/${editingRule.id}`, newParse);
        console.log('Правило обновлено успешно');
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/parse`, newParse);
        console.log('Новое правило создано успешно');
      }
      setShowModal(false);
      fetchParse();
    } catch (error) {
      console.error('Ошибка при сохранении правила:', error);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/rules/${ruleId}`);
      console.log('Правило удалено успешно');
      fetchParse();
    } catch (error) {
      if (error.response && error.response.data.error) {
        setDeleteError(error.response.data.error);
      } else {
        console.error('Ошибка при удалении правила:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewParse({
      site: '',
      html_title: '',
      html_price: '',
    });
  };

  return (
    <Container>

      {deleteError && (
        <Alert variant="danger" onClose={() => setDeleteError(null)} dismissible>
          {deleteError}
        </Alert>
      )}
      <ParseTable
        parse={parse}
        onEdit={handleEditRule}
        onDelete={handleDeleteRule}
      />
      <ParserModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveRule}
        editingRule={editingRule}
        newParse={newParse}
        setNewParse={setNewParse}
      />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={handleCreateRule}>
          Добавить сайт
        </Button>
      </div>
    </Container>
  );
};


export default ParserW;