import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const Manutentor = () => {
    const [manutentores, setManutentores] = useState([]);
    const [gestores, setGestores] = useState([]);
    const [newManutentor, setNewManutentor] = useState({ ni: '', nome: '', area: '', gestor: '' });
    const [editingManutentor, setEditingManutentor] = useState(null);

    const fetchManutentores = async () => {
        try {
            const { data } = await axios.get('/data/manutentor/');
            setManutentores(data);
        } catch (error) {
            console.error('Error fetching manutentores:', error);
        }
    };

    const fetchGestores = async () => {
        try {
            const { data } = await axios.get('/data/gestor/');
            setGestores(data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchManutentores();
        fetchGestores();
    }, []);

    const handleCreateManutentor = async () => {
        try {
            await axios.post('/data/manutentor/', newManutentor);
            fetchManutentores();
            resetForm();
        } catch (error) {
            console.error('Error creating manutentor:', error);
        }
    };

    const handleUpdateManutentor = async () => {
        try {
            await axios.put(`/data/manutentor/${editingManutentor.id}/`, newManutentor);
            fetchManutentores();
            resetForm();
        } catch (error) {
            console.error('Error updating manutentor:', error);
        }
    };

    const handleDeleteManutentor = async (id) => {
        try {
            await axios.delete(`/data/manutentor/${id}/`);
            fetchManutentores();
        } catch (error) {
            console.error('Error deleting manutentor:', error);
        }
    };

    const handleEditManutentor = (manutentor) => {
        setEditingManutentor(manutentor);
        setNewManutentor(manutentor);
    };

    const resetForm = () => {
        setEditingManutentor(null);
        setNewManutentor({ ni: '', nome: '', area: '', gestor: '' });
    };

    const renderManutentoresList = () => (
        manutentores.length > 0
            ? manutentores.map(({ id, nome, area, gestor }) => (
                <li key={id} className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200">
                    <span>{nome} - {area} - Gestor: {gestor}</span>
                    <div className='flex gap-2'>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            onClick={() => handleEditManutentor({ id, nome, area, gestor })}
                        >
                            Editar
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => handleDeleteManutentor(id)}
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ))
            : <p className="text-gray-500 py-4">Nenhum manutentor encontrado.</p>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Manutentores</h2>

            <div className="mb-6 space-y-4">
                <input
                    type="text"
                    placeholder="NI"
                    value={newManutentor.ni}
                    onChange={(e) => setNewManutentor({ ...newManutentor, ni: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newManutentor.nome}
                    onChange={(e) => setNewManutentor({ ...newManutentor, nome: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newManutentor.area}
                    onChange={(e) => setNewManutentor({ ...newManutentor, area: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={newManutentor.gestor}
                    onChange={(e) => setNewManutentor({ ...newManutentor, gestor: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione um Gestor</option>
                    {gestores.map((gestor) => (
                        <option key={gestor.id} value={gestor.id}>{gestor.nome}</option>
                    ))}
                </select>
                <button
                    onClick={editingManutentor ? handleUpdateManutentor : handleCreateManutentor}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                >
                    {editingManutentor ? 'Atualizar Manutentor' : 'Criar Manutentor'}
                </button>
            </div>

            <ul className="space-y-2">
                {renderManutentoresList()}
            </ul>
        </div>
    );
};

export default Manutentor;
