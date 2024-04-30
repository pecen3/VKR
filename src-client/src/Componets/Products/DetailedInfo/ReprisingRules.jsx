import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Alert } from 'react-bootstrap';

// function ReprisingRules({rule_id, rule_description, rule_rule}) {
//   return (
// <>11</>
//   );
// }

// export default ReprisingRules;


const ReprisingRules = ({ rule_id, rule_description, rule_rule, productId, modalChage, setModalChage }) => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedRuleId, setSelectedRuleId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rules`);
        setRules(response.data);
        
        
        const currentRule = response.data.find(rule => rule.id === rule_id);
        setSelectedRule(currentRule);
        setSelectedRuleId(rule_id);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []); 

  const handleSelectRule = (ruleId) => {
    const rule = rules.find(rule => rule.id === ruleId);
    setSelectedRule(rule);
    setSelectedRuleId(ruleId);
    setSuccessMessage('');
  };

  const handleAcceptRule = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/rules/product?id=${productId}&ruleid=${selectedRuleId}`);
      console.log('Принято новое правило:', selectedRuleId);
      
      setSuccessMessage(`Успешно установлено правило: ${selectedRule.description}`);
      setModalChage(Math.random())
    } catch (error) {
      console.error('Error accepting rule:', error);
    }
  };
  const handleCancelSelection = () => {
    setSelectedRuleId(rule_id);
    const rule = rules.find(rule => rule.id === rule_id);
    setSelectedRule(rule);
    setSuccessMessage('');
    
  };

  return (
    <div className='mt-3'>
      <h5 className="mt-1 mb-2">Выбор стратегии</h5>
      <ListGroup className="scrollable" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {rules.map(rule => (
          <ListGroup.Item
            key={rule.id}
            action
            onClick={() => handleSelectRule(rule.id)}
            active={selectedRule && selectedRule.id === rule.id}
          >
            {rule.description}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedRule && (
        <div className="mt-3">
          <div>Подробнее:</div>
          <div><strong>Название:</strong> {selectedRule.description}</div>
          <div><strong>Правило:</strong> {selectedRule.rule}</div>
        </div>
      )}
      {!successMessage && selectedRule && selectedRuleId !== rule_id && (
        <div className="mt-4">
          <Button variant="success" onClick={handleAcceptRule}>Применить</Button>{' '}
          <Button variant="danger" onClick={handleCancelSelection}>Отменить</Button>
        </div>
        
      )}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    </div>
  );
};

export default ReprisingRules;