import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ParserW from '../Componets/Parser/ParserW';
import CompetitorsW from '../Componets/Competitors/CompetitorsW';



const Competitors = () => {
 return (
  
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Магазины конкурентов</h1></div>
    
    <div className='p-2'>
      <CompetitorsW/>
    </div>
  </div>
  
 )
}

export default Competitors;