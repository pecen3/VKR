import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


import ProductsList from '../Componets/Products/ProductsList';

import SearchAndSort from '../Componets/Products/SearchandSort';


const Products = () => {
 return (
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Мои товары</h1></div>
    
    <div className='p-2'>
      {/* <Search/>
      <Sort/> */}
      <SearchAndSort/>
    </div>

    <div className='p-2'>
      <ProductsList/>
    </div>
  </div>
  
 )
}

export default Products;