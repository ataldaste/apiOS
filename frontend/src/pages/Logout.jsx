import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwt_token');
    setAuthenticated(false);
    navigate('/login');
  }, [navigate, setAuthenticated]);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200">
      <div className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Logout</h2>
        <p className="text-gray-600">Você foi desconectado com sucesso.</p>
      </div>
    </div>
  );
};

export default Logout;
