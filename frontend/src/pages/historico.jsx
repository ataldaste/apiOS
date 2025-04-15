import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const Historico = () => {
    const [historicos, setHistoricos] = useState([]);
    const [newHistorico, setNewHistorico] = useState({ ordem: '', data_encerramento: '' });
    const [orders, setOrders] = useState([]); // Estado para armazenar ordens de serviço
    const [editingHistorico, setEditingHistorico] = useState(null);

    // Função para buscar históricos
    const fetchHistoricos = async () => {
        try {
            const response = await axios.get('/data/historico/');
            setHistoricos(response.data);
        } catch (error) {
            console.error('Error fetching historicos:', error);
        }
    };

    // Função para buscar ordens de serviço
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/data/ordem-servico/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchHistoricos();
        fetchOrders(); // Buscar ordens de serviço
    }, []);

    // Função para criar um novo histórico
    const handleCreateHistorico = async () => {
        try {
            await axios.post('/data/historico/', newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error creating historico:', error);
        }
    };

    // Função para atualizar um histórico
    const handleUpdateHistorico = async () => {
        try {
            await axios.put(`/data/historico/${editingHistorico.id}/`, newHistorico);
            fetchHistoricos(); // Atualizar lista de históricos
            setEditingHistorico(null); // Resetar o estado de edição
            setNewHistorico({ ordem: '', data_encerramento: '' }); // Resetar o formulário
        } catch (error) {
            console.error('Error updating historico:', error);
        }
    };

    // Função para excluir um histórico
    const handleDeleteHistorico = async (id) => {
        try {
            await axios.delete(`/data/historico/${id}/`);
            fetchHistoricos(); // Atualizar lista de históricos
        } catch (error) {
            console.error('Error deleting historico:', error);
        }
    };

    // Função para editar um histórico
    const handleEditHistorico = (historico) => {
        setEditingHistorico(historico);
        setNewHistorico(historico);
    };

    // Função para listar os históricos
    const listChildren = () => {
        if (historicos.length > 0) {
            return historicos.map((historico) => (
                <li key={historico.id} className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                    <span>
                        <strong>Ordem:</strong> {historico.ordem?.descricao} - <strong>Data de Encerramento:</strong> {historico.data_encerramento}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEditHistorico(historico)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteHistorico(historico.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Deletar
                        </button>
                    </div>
                </li>
            ));
        } else {
            return <p className="text-gray-500 py-4">Nenhum histórico encontrado.</p>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Históricos</h2>

            <div className="space-y-4 mb-6">
                {/* Select dropdown para ordens de serviço */}
                <select
                    value={newHistorico.ordem}
                    onChange={(e) => setNewHistorico({ ...newHistorico, ordem: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione Ordem</option>
                    {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                            {order.descricao}
                        </option>
                    ))}
                </select>

                {/* Campo para Data de Encerramento */}
                <input
                    type="datetime-local"
                    placeholder="Data de Encerramento"
                    value={newHistorico.data_encerramento}
                    onChange={(e) => setNewHistorico({ ...newHistorico, data_encerramento: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Botão de criação ou atualização */}
                <button
                    onClick={editingHistorico ? handleUpdateHistorico : handleCreateHistorico}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                >
                    {editingHistorico ? 'Atualizar Histórico' : 'Criar Histórico'}
                </button>
            </div>

            {/* Lista de históricos */}
            <ul>
                {listChildren()}
            </ul>
        </div>
    );
};

export default Historico;
