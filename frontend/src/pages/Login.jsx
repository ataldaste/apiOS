import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/token/', { username, password });
      const token = response.data.access;
      localStorage.setItem('jwt_token', token);
      setAuthenticated(true);
      navigate('/ordemservico'); // redireciona para a home
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao logar:', errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-greeb-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Bem-vindo
        </h2>
        <p className="text-center text-sm text-gray-500">
          Faça login para acessar o sistema
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
