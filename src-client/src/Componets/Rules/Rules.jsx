import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import PricingRulesTable from './PricingRulesTable';
import PricingRuleModal from './PricingRuleModal';

const Rules = () => {
  const [pricingRules, setPricingRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({
    description: '',
    rule: '',
  });
  const [editingRule, setEditingRule] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchPricingRules();
  }, []);

  const fetchPricingRules = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rules`);
      setPricingRules(response.data);
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
    setNewRule({
      description: rule.description,
      rule: rule.rule,
    });
  };

  const handleSaveRule = async () => {
    try {
      if (editingRule) {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/rules/${editingRule.id}`, newRule);
        console.log('Правило обновлено успешно');
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/rules`, newRule);
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
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/rules/${ruleId}`);
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
      description: '',
      rule: '',
    });
  };

  return (
    <Container>

      {deleteError && (
        <Alert variant="danger" onClose={() => setDeleteError(null)} dismissible>
          {deleteError}
        </Alert>
      )}
      <PricingRulesTable
        pricingRules={pricingRules}
        onEdit={handleEditRule}
        onDelete={handleDeleteRule}
      />
      <PricingRuleModal
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


export default Rules;