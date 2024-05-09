

import 'bootstrap/dist/css/bootstrap.css';

import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Rules from './pages/Rules';
import Parser from './pages/Parser';
import Competitors from './pages/Competitors';

function App() {
  return (
    <Routes>

      <Route path='/' element={<MainLayout/>}>
      <Route path='/' element={<Products/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/rules' element={<Rules/>}/>
        <Route path='/parser' element={<Parser/>}/>
        <Route path='/competitors' element={<Competitors/>}/>
    </Route>
    </Routes>
  );
}

export default App;
