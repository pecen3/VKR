import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ParserW from '../Componets/Parser/ParserW';



const Parser = () => {
 return (
  
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Парсер</h1></div>
    
    <div className='p-2'>
      <ParserW/>
    </div>
  </div>
  
 )
}

export default Parser;