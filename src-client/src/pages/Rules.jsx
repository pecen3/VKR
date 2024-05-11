

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

