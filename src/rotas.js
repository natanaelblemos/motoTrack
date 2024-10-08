import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/Login';
import Home from './pages/Home';
import Cadastros from './pages/Cadastros';
/*import Corridas from './pages/Corridas';
import Abastecimento from './pages/Abastecimento';
import Rodagem from './pages/Rodagem';
import NotFound from './pages/NotFound';*/

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path='/mototrack' element={<LoginScreen />} />
        <Route path="/mototrack/home" element={<Home />} />
        <Route path="/mototrack/cadastro" element={<Cadastros />} />
      </Routes>
    </Router>
  );
}
