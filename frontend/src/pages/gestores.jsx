import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const Gestores = () => {
    const [gestores, setGestores] = useState([]);
    const [newGestor, setNewGestor] = useState({
        ni: '',
        nome: '',
        area: '',
        cargo: '',
    });
    const [editingGestor, setEditingGestor] = useState(null);

    const fetchGestores = async () => {
        try {
            const response = await axios.get('/data/gestor/');
            setGestores(response.data);
        } catch (error) {
            console.error('Error fetching gestores:', error);
        }
    };

    useEffect(() => {
        fetchGestores();
    }, []);

    const handleCreateGestor = async () => {
        try {
            await axios.post('/data/gestor/', newGestor);
            fetchGestores();
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error creating gestor:', error);
        }
    };

    const handleUpdateGestor = async () => {
        try {
            await axios.put(`/data/gestor/${editingGestor.id}/`, newGestor);
            fetchGestores();
            setEditingGestor(null);
            setNewGestor({ ni: '', nome: '', area: '', cargo: '' });
        } catch (error) {
            console.error('Error updating gestor:', error);
        }
    };

    const handleDeleteGestor = async (id) => {
        try {
            await axios.delete(`/data/gestor/${id}/`);
            fetchGestores();
        } catch (error) {
            console.error('Error deleting gestor:', error);
        }
    };

    const handleEditGestor = (gestor) => {
        setEditingGestor(gestor);
        setNewGestor(gestor);
    };

    const listChildren = () => {
        if (Array.isArray(gestores) && gestores.length > 0) {
            return gestores.map((gestor) => (
                <li key={gestor.id} className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200">
                    <span>
                        <strong>{gestor.nome}</strong> - {gestor.ni} - {gestor.area} - {gestor.cargo}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEditGestor(gestor)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteGestor(gestor.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-gray-500 py-4">Nenhum gestor encontrado.</p>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Gestores</h2>

            <div className="space-y-4 mb-6">
                {/* Campos de entrada */}
                <input
                    type="text"
                    placeholder="NI"
                    value={newGestor.ni}
                    onChange={(e) => setNewGestor({ ...newGestor, ni: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={newGestor.nome}
                    onChange={(e) => setNewGestor({ ...newGestor, nome: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Área"
                    value={newGestor.area}
                    onChange={(e) => setNewGestor({ ...newGestor, area: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Cargo"
                    value={newGestor.cargo}
                    onChange={(e) => setNewGestor({ ...newGestor, cargo: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Botão de criação ou edição */}
                <button
                    onClick={editingGestor ? handleUpdateGestor : handleCreateGestor}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                >
                    {editingGestor ? 'Atualizar Gestor' : 'Criar Gestor'}
                </button>
            </div>

            <ul className="space-y-2">
                {listChildren()}
            </ul>
        </div>
    );
};

export default Gestores;
