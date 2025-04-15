import React, { useState, useEffect } from 'react'; 
import axios from '../services/axios';

const Patrimonio = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const [newPatrimonio, setNewPatrimonio] = useState({ ni: '', descricao: '', localizacao: '' });
  const [editingPatrimonio, setEditingPatrimonio] = useState(null);

  const fetchPatrimonios = async () => {
    try {
      const response = await axios.get('/data/patrimonio/');
      setPatrimonios(response.data);
    } catch (error) {
      console.error('Error fetching patrimonios:', error);
    }
  };

  useEffect(() => {
    fetchPatrimonios();
  }, []);

  const handleCreatePatrimonio = async () => {
    try {
      await axios.post('/data/patrimonio/', newPatrimonio);
      fetchPatrimonios();
      setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
    } catch (error) {
      console.error('Error creating patrimonio:', error);
    }
  };

  const handleDeletePatrimonio = async (id) => {
    try {
      await axios.delete(`/data/patrimonio/${id}/`);
      fetchPatrimonios();
    } catch (error) {
      console.error('Error deleting patrimonio:', error);
    }
  };

  const handleEditPatrimonio = (patrimonio) => {
    setEditingPatrimonio(patrimonio);
    setNewPatrimonio(patrimonio);
  };

  const handleUpdatePatrimonio = async () => {
    try {
      await axios.put(`/data/patrimonio/${editingPatrimonio.id}/`, newPatrimonio);
      fetchPatrimonios();
      setEditingPatrimonio(null);
      setNewPatrimonio({ ni: '', descricao: '', localizacao: '' });
    } catch (error) {
      console.error('Error updating patrimonio:', error);
    }
  };

  const listChildren = () => {
    if (patrimonios.length > 0) {
      return patrimonios.map((patrimonio) => (
        <li
          key={patrimonio.id}
          className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200"
        >
          <div>
            <p className="font-semibold text-gray-800">{patrimonio.ni}</p>
            <p className="text-sm text-gray-600">{patrimonio.descricao}</p>
            <p className="text-xs text-gray-500">{patrimonio.localizacao}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleEditPatrimonio(patrimonio)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Editar
            </button>
            <button
              onClick={() => handleDeletePatrimonio(patrimonio.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Excluir
            </button>
          </div>
        </li>
      ));
    } else {
      return <p className="text-gray-500 mt-4">Nenhum patrimônio encontrado.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patrimônios</h2>
      <div className="bg-white p-6 rounded shadow-md mb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="NI"
            value={newPatrimonio.ni}
            onChange={(e) => setNewPatrimonio({ ...newPatrimonio, ni: e.target.value })}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newPatrimonio.descricao}
            onChange={(e) => setNewPatrimonio({ ...newPatrimonio, descricao: e.target.value })}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Localização"
            value={newPatrimonio.localizacao}
            onChange={(e) => setNewPatrimonio({ ...newPatrimonio, localizacao: e.target.value })}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          onClick={editingPatrimonio ? handleUpdatePatrimonio : handleCreatePatrimonio}
          className={`w-full px-6 py-3 text-white rounded transition ${
            editingPatrimonio ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {editingPatrimonio ? 'Atualizar Patrimônio' : 'Criar Patrimônio'}
        </button>
      </div>

      <ul>{listChildren()}</ul>
    </div>
  );
};

export default Patrimonio;
