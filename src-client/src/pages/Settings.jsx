import React from 'react';
import SettingsForm from '../Componets/Settings/SettingsForm';



const Settings = () => {
 return (
  <div className="d-grid gap-3">
    <div className='p-2'><h1 className="text-center">Настройки</h1></div>
    
    <div className='p-2'>
      <SettingsForm/>
    </div>
  </div>
 )
}

export default Settings;