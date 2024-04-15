import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../Componets/Menu';

const MainLayout = () => {
  return (
    <div className="container-fluid">
    <div className='row flex-nowrap'>
    <Menu />
        <Outlet />
  </div>
  </div>
  );
};

export default MainLayout;