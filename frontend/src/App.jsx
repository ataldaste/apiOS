import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import OrdemServ from './pages/ordemserv';
import Ambientes from './pages/ambientes';
import Logout from './pages/Logout';
import Manutentor from './pages/manutentor';
import Patrimonio from './pages/patrimonio';
import Gestores from './pages/gestores';
import Responsaveis from './pages/Responsaveis';
import Historico from './pages/historico';
import Register from './pages/Register';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('jwt_token'));

  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-center md:text-left leading-tight mb-4 md:mb-0">
              Gerenciador de<br />Ordens de Serviço
            </h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Link to="/register" className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Register</Link>
              <Link to="/login" className="text-sm px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Login</Link>
              {authenticated && (
                <>
                  <Link to="/ordemservico" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Ordem de Serviço</Link>
                  <Link to="/manutentor" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Manutentores</Link>
                  <Link to="/patrimonios" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Patrimônios</Link>
                  <Link to="/ambientes" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Ambientes</Link>
                  <Link to="/gestores" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Gestores</Link>
                  <Link to="/responsaveis" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Responsáveis</Link>
                  <Link to="/historico" className="text-sm px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition">Histórico</Link>
                  <Link to="/logout" className="text-sm px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">Logout</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ordemservico" element={<OrdemServ />} />
            <Route path="/ambientes" element={<Ambientes/>} />
            <Route path="/manutentor" element={<Manutentor />} />
            <Route path="/patrimonios" element={<Patrimonio />} />
            <Route path="/gestores" element={<Gestores />} />
            <Route path="/responsaveis" element={<Responsaveis/>} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
