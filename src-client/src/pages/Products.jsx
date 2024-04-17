import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Search from '../Componets/Products/Search';

import ProductsList from '../Componets/Products/ProductsList';


const Products = () => {
 return (
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Мои товары</h1></div>
    
    <div className='p-2'>
      <Search/>
    </div>
    <div className='p-2'>
      <ProductsList/>
    </div>
  </div>
  
 )
}

export default Products;