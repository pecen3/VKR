import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Product from './Product';



const ProductsList = () => {
 return (
  <div >
    <div className='container'>
    <div className='row g-3'>
    <Product/>
    <Product/>
    <Product/>
    </div>
    </div>
  </div>
  
 )
}

export default ProductsList;