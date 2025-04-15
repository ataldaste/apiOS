import React, { useState, useEffect } from 'react'; 
import axios from '../services/axios';

const Responsaveis = () => {
    const [responsaveis, setResponsaveis] = useState([]);
    const [newResponsavel, setNewResponsavel] = useState({ ni: '', nome: '' });
    const [editingResponsavel, setEditingResponsavel] = useState(null);

    // Fetching responsaveis
    const fetchResponsaveis = async () => {
        try {
            const { data } = await axios.get('/data/responsavel/');
            setResponsaveis(data);
        } catch (error) {
            console.error('Error fetching responsaveis:', error);
        }
    };

    useEffect(() => {
        fetchResponsaveis();
    }, []);

    // Handle Create Responsavel
    const handleCreateResponsavel = async () => {
        try {
            await axios.post('/data/responsavel/', newResponsavel);
            fetchResponsaveis();
            setNewResponsavel({ ni: '', nome: '' });
        } catch (error) {
            console.error('Error creating responsavel:', error);
        }
    };

    // Handle Update Responsavel
    const handleUpdateResponsavel = async () => {
        try {
            await axios.put(`/data/responsavel/${editingResponsavel.id}/`, newResponsavel);
            fetchResponsaveis();
            resetForm();
        } catch (error) {
            console.error('Error updating responsavel:', error);
        }
    };

    // Handle Delete Responsavel
    const handleDeleteResponsavel = async (id) => {
        try {
            await axios.delete(`/data/responsavel/${id}/`);
            fetchResponsaveis();
        } catch (error) {
            console.error('Error deleting responsavel:', error);
        }
    };

    // Handle Edit Responsavel
    const handleEditResponsavel = (responsavel) => {
        setEditingResponsavel(responsavel);
        setNewResponsavel(responsavel);
    };

    // Reset Form after create/update
    const resetForm = () => {
        setEditingResponsavel(null);
        setNewResponsavel({ ni: '', nome: '' });
    };

    // Render responsaveis list
    const renderResponsaveisList = () => (
        responsaveis.length > 0
            ? responsaveis.map(({ id, nome, ni }) => (
                <li key={id} className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200">
                    <span>{nome} - {ni}</span>
                    <div className='flex gap-4'>
                        <button 
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            onClick={() => handleEditResponsavel({ id, nome, ni })}>
                            Editar
                        </button>
                        <button 
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => handleDeleteResponsavel(id)}>
                            Deletar
                        </button>
                    </div>
                </li>
            ))
            : <p className="text-gray-500 py-4">Nenhum responsável encontrado.</p>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Responsáveis</h2>
            
            <div className="mb-6 space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="NI"
                        value={newResponsavel.ni}
                        onChange={(e) => setNewResponsavel({ ...newResponsavel, ni: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newResponsavel.nome}
                        onChange={(e) => setNewResponsavel({ ...newResponsavel, nome: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={editingResponsavel ? handleUpdateResponsavel : handleCreateResponsavel}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                >
                    {editingResponsavel ? 'Atualizar Responsável' : 'Criar Responsável'}
                </button>
            </div>

            <ul className="space-y-2">
                {renderResponsaveisList()}
            </ul>
        </div>
    );
};

export default Responsaveis;
