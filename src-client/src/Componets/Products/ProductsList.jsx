import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import Product from './Product';




const ProductsList = () => {
  const [productsId, setProductsId] = useState([])

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const baseUrl = process.env.REACT_APP_BASE_URL;

        
        const response = await axios.get(`${baseUrl}/products`);

        setProductsId(response.data);
        // console.log(productsId)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
//  return (
//   <div >
//     <div className='container '>
//     <div className='row g-3'>
//   {productsId.map(productId => <Product id={productId.id}/>)}
//   {productsId.map(productId => <Product id={productId.id}/>)}
    
    
//     </div>
//     </div>
//   </div>
  
//  )

 return (
  <div >
    <div className='fluid'>
    <div className='row g-3'>
  {/* {productsId.map(productId => <Product id={productId.id}/>)} */}
  {/* {productsId.map(productId => <Product id={productId.id}/>)} */}
    
    
    </div >
    <Table striped borderless hover responsive='xl' >
      <thead>
        <tr className="align-middle text-center">
          <th>Фото</th>
          <th >Ифнормация</th>
          <th >Текущая цена</th>
          <th >Минимальная цена/<br/>себистоимость</th>
          <th >Рекомендованная <br/>цена</th>
          <th >Конкурентная позиция </th>
          <th >Стратегия <br/>репрайсинга </th>
        </tr>
      </thead>
      <tbody>
      {productsId.map(productId => <Product id={productId.id}/>)}
  
      </tbody>
    </Table>
    </div>
  </div>
  
 )
}

export default ProductsList;