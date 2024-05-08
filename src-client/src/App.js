

import 'bootstrap/dist/css/bootstrap.css';

import Menu from './Componets/Menu';
import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Rules from './pages/Rules';
import Parser from './pages/Parser';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/rules' element={<Rules/>}/>
        <Route path='/parser' element={<Parser/>}/>

    </Route>
    </Routes>
  );
}

export default App;
