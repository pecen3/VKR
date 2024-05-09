import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap';
import CompetitorsModal from './CompetitorsModal';
import CompetitorsTable from './CompetitorsTable';

const CompetitorsW = () => {
  const [pricingRules, setPricingRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
  });
  const [editingRule, setEditingRule] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchPricingRules();
  }, []);

  const fetchPricingRules = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/competitors`);
      setPricingRules(response.data);
    } catch (error) {
      console.error('Ошибка при получении конкурентов:', error);
    }
  };

  const handleCreateRule = () => {
    setShowModal(true);
    setEditingRule(null);
  };

  const handleEditRule = (rule) => {
    setShowModal(true);
    setEditingRule(rule);
    setNewRule({
      name: rule.name,

    });
  };

  const handleSaveRule = async () => {
    try {
      if (editingRule) {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/competitors/${editingRule.id}`, newRule);
        console.log('Правило обновлено успешно');
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/competitors/`, newRule);
        console.log('Новое правило создано успешно');
      }
      setShowModal(false);
      fetchPricingRules();
    } catch (error) {
      console.error('Ошибка при сохранении правила:', error);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/competitors/${ruleId}`);
      console.log('Правило удалено успешно');
      fetchPricingRules();
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
    setNewRule({
      name: '',
    });
  };

  return (
    <Container>

      {deleteError && (
        <Alert variant="danger" onClose={() => setDeleteError(null)} dismissible>
          {deleteError}
        </Alert>
      )}
      <CompetitorsTable
        pricingRules={pricingRules}
        onEdit={handleEditRule}
        onDelete={handleDeleteRule}
      />
      <CompetitorsModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveRule}
        editingRule={editingRule}
        newRule={newRule}
        setNewRule={setNewRule}
      />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={handleCreateRule}>
          Создать правило
        </Button>
      </div>
    </Container>
  );
};


export default CompetitorsW;