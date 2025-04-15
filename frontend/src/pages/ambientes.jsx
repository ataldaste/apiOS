import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const Ambientes = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [newAmbiente, setNewAmbiente] = useState({ ni: '', nome: '' });
    const [editingAmbiente, setEditingAmbiente] = useState(null);

    const fetchAmbientes = async () => {
        try {
            const { data } = await axios.get('/data/ambiente/');
            setAmbientes(data);
        } catch (error) {
            console.error('Error fetching ambientes:', error);
        }
    };

    useEffect(() => {
        fetchAmbientes();
    }, []);

    const handleCreateAmbiente = async () => {
        try {
            await axios.post('/data/ambiente/', newAmbiente);
            fetchAmbientes();
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating ambiente:', error);
        }
    };

    const handleDeleteAmbiente = async (id) => {
        try {
            await axios.delete(`/data/ambiente/${id}/`);
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting ambiente:', error);
        }
    };

    const handleEditAmbiente = (ambiente) => {
        setEditingAmbiente(ambiente);
        setNewAmbiente(ambiente);
    };

    const handleUpdateAmbiente = async () => {
        try {
            await axios.put(`/data/ambiente/${editingAmbiente.id}/`, newAmbiente);
            fetchAmbientes();
            setEditingAmbiente(null);
            setNewAmbiente({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error updating ambiente:', error);
        }
    };

    const listChildren = () => {
        if (ambientes.length > 0) {
            return ambientes.map((ambiente) => (
                <li key={ambiente.id} className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200">
                    <span className="text-gray-800">{ambiente.ni} - {ambiente.nome}</span>
                    <div className="flex gap-2">
                        <button 
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            onClick={() => handleEditAmbiente(ambiente)}>
                            Editar
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => handleDeleteAmbiente(ambiente.id)}>
                            Excluir
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-gray-500 py-4">Nenhum ambiente encontrado.</p>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Ambientes</h2>
            
            <div className="mb-6 space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="NI"
                        value={newAmbiente.ni}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, ni: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newAmbiente.nome}
                        onChange={(e) => setNewAmbiente({ ...newAmbiente, nome: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                <button
                    onClick={editingAmbiente ? handleUpdateAmbiente : handleCreateAmbiente}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                >
                    {editingAmbiente ? 'Atualizar Ambiente' : 'Criar Ambiente'}
                </button>
            </div>

            <ul className="space-y-2">
                {listChildren()}
            </ul>
        </div>
    );
};

export default Ambientes;
