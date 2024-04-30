import React, { useState, useEffect } from 'react';
import { Button, Stack, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { formatRelative} from 'date-fns'
import { ru } from 'date-fns/locale/ru'

import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddCompetitorProduct from './AddCompetitorProduct';



// { productId, competitors }
const ProductCompetitors = ( {productId, modalChange, setModalChange}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);
  const [competitors, setCompetitors] = useState([]);


  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  const [selectedStore, setSelectedStore] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/detailcomp/${productId}`); // Замените BASE_URL на ваш URL
        setCompetitors(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCompetitor = (competitorId) => {
    setSelectedCompetitorId(competitorId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/competitors/deleteproduct/${selectedCompetitorId}`);
      setShowDeleteModal(false);
      setSelectedCompetitorId(null);
      setModalChange(Math.random()*1000)
      // Обновляем список конкурентов после удаления
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/detailcomp/${productId}`);
      
      setCompetitors(response.data);
    } catch (error) {
      console.error('Ошибка при удалении товара конкурента:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCompetitorId(null);
  };

  return (
    <div>
      <h5>Список товаров конкурентов</h5>
      <Stack className="scrollable" style={{ maxHeight: '200px', overflowY: 'auto' }}>
      {Object.keys(competitors).map(storeName => (
        competitors[storeName].map((product, index) => (
          <Stack direction='horizontal' gap={3} key={index}>
            <div className='p-2 '>
              <Stack>
                <div title={product.title}><strong>{(product.title.slice(0,40) + '...')}</strong></div>
                <div className='text-secondary font-weight-light' style={{ fontSize: '14px' }}><i class="bi bi-shop"></i> {product.store_name}</div>
              </Stack>
            </div>
            <div className='p-2 ms-auto text-center'>
              <Stack>
                <div>{product.price}</div>
                <div className='text-secondary font-weight-light' style={{ fontSize: '12px' }}>Обновлено {formatRelative(new Date(product.updated_at), new Date(), { locale: ru })}</div>
              </Stack>
            </div>
            <Button  variant="danger" onClick={() => (handleDeleteCompetitor(product.id))}><i class="bi bi-x-circle-fill"></i></Button>
          </Stack>
        ))
      ))}
    </Stack>

    <h5 className='my-3'>Добавление товара конкурента</h5>
      <AddCompetitorProduct productId={productId}/>
      <DeleteConfirmationModal 
        show={showDeleteModal} 
        handleClose={handleCloseDeleteModal} 
        handleDelete={handleConfirmDelete} 
        productId={selectedCompetitorId}
      />

    </div>
  );
};

export default ProductCompetitors;
