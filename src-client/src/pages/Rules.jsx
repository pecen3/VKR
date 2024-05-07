// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { Container, Row, Col, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

// const Rules = () => {
//   const [pricingRules, setPricingRules] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newRule, setNewRule] = useState({
//     description: '',
//     rule: '',
//   });
//   const [editingRule, setEditingRule] = useState(null);
//   const [deleteError, setDeleteError] = useState(null);
//   const fetchPricingRules = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/rules`);
//       setPricingRules(response.data);
//     } catch (error) {
//       console.error('Ошибка при получении правил ценообразования:', error);
//     }
//   };
//   useEffect(() => {

//     fetchPricingRules();
//   }, []);

//   const handleCreateRule = () => {
//     setShowModal(true);
//     setEditingRule(null);
//   };

//   const handleEditRule = (rule) => {
//     setShowModal(true);
//     setEditingRule(rule);
//     setNewRule({
//       description: rule.description,
//       rule: rule.rule,
//     });
//   };

//   const handleSaveRule = async () => {
//     try {
//       if (editingRule) {
//         // Логика обновления существующего правила
//         await axios.patch(`${process.env.REACT_APP_BASE_URL}/rules/${editingRule.id}`, newRule);
//         console.log('Правило обновлено успешно');
//       } else {
//         // Логика создания нового правила
//         await axios.post(`${process.env.REACT_APP_BASE_URL}/rules`, newRule);
//         console.log('Новое правило создано успешно');
//       }
//       setShowModal(false);
//       fetchPricingRules();
//     } catch (error) {
//       console.error('Ошибка при сохранении правила:', error);
//     }
//   };

//   const handleDeleteRule = async (ruleId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_BASE_URL}/rules/${ruleId}`);
//       console.log('Правило удалено успешно');
//       fetchPricingRules();
//     } catch (error) {
//       if (error.response && error.response.data.error) {
//         setDeleteError(error.response.data.error);
//       } else {
//         console.error('Ошибка при удалении правила:', error);
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setNewRule({
//       description: '',
//       rule: '',
//     });
//   };

//   return (
//     <Container>
//       <h1>Правила ценообразования</h1>
//       <Button variant="primary" onClick={handleCreateRule}>
//         Создать правило
//       </Button>
//       {deleteError && (
//         <Alert variant="danger" onClose={() => setDeleteError(null)} dismissible>
//           {deleteError}
//         </Alert>
//       )}
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Описание</th>
//             <th>Правило</th>
//             <th>Применяется к товарам</th>
//             <th>Действия</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pricingRules.map((rule) => (
//             <tr key={rule.id}>
//               <td>{rule.id}</td>
//               <td>{rule.description}</td>
//               <td>{rule.rule || 'Без правила'}</td>
//               <td>{rule.product_count}</td>
//               <td>
//                 <Button variant="primary" onClick={() => handleEditRule(rule)}>
//                   Редактировать
//                 </Button>
//                 {"      "}
//                 {rule.product_count === '0' && (
//                   <Button variant="danger" onClick={() => handleDeleteRule(rule.id)}>
//                     Удалить
//                   </Button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingRule ? 'Редактировать правило' : 'Создать правило'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="description">
//               <Form.Label>Описание</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Введите описание"
//                 value={newRule.description}
//                 onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="rule">
//               <Form.Label>Правило</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Введите правило"
//                 value={newRule.rule}
//                 onChange={(e) => setNewRule({ ...newRule, rule: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Отменить
//           </Button>
//           <Button variant="primary" onClick={handleSaveRule}>
//             Сохранить
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

import React from 'react';
import Rules from '../Componets/Rules/Rules';



const RulesPage = () => {
 return (
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Правила ценообразования</h1></div>
    
    <div className='p-2'>
      <Rules/>
    </div>
  </div>
 )
}

export default RulesPage;

