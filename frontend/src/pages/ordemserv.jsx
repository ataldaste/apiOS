import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const OrdemServ = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    descricao: '',
    status: 'iniciada',
    prioridade: 'media',
    ambiente: '',
    manutentor: '',
  });
  const [ambientes, setAmbientes] = useState([]);
  const [manutentores, setManutentores] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/data/ordem-servico/');
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchAmbientes = async () => {
    try {
      const response = await axios.get('/data/ambiente/');
      setAmbientes(response.data);
    } catch (error) {
      console.error('Error fetching ambientes:', error);
    }
  };

  const fetchManutentores = async () => {
    try {
      const response = await axios.get('/data/manutentor/');
      setManutentores(response.data);
    } catch (error) {
      console.error('Error fetching manutentores:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchAmbientes();
    fetchManutentores();
  }, []);

  const handleCreateOrder = async () => {
    try {
      await axios.post('/data/ordem-servico/', newOrder);
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/data/ordem-servico/${editingOrder.id}/`, newOrder);
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`/data/ordem-servico/${id}/`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({
      descricao: order.descricao,
      status: order.status,
      prioridade: order.prioridade,
      ambiente: order.ambiente,
      manutentor: order.manutentor,
    });
  };

  const resetForm = () => {
    setEditingOrder(null);
    setNewOrder({
      descricao: '',
      status: 'iniciada',
      prioridade: 'media',
      ambiente: '',
      manutentor: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Ordens de Serviço</h2>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Descrição"
          value={newOrder.descricao}
          onChange={(e) => setNewOrder({ ...newOrder, descricao: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="iniciada">Iniciada</option>
          <option value="em andamento">Em Andamento</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <select
          value={newOrder.prioridade}
          onChange={(e) => setNewOrder({ ...newOrder, prioridade: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <select
          value={newOrder.ambiente}
          onChange={(e) => setNewOrder({ ...newOrder, ambiente: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Ambiente</option>
          {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>{ambiente.nome}</option>
          ))}
        </select>

        <select
          value={newOrder.manutentor}
          onChange={(e) => setNewOrder({ ...newOrder, manutentor: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o Manutentor</option>
          {manutentores.map((manutentor) => (
            <option key={manutentor.id} value={manutentor.id}>{manutentor.nome}</option>
          ))}
        </select>

        <button
          onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        >
          {editingOrder ? 'Atualizar Ordem' : 'Criar Ordem'}
        </button>
      </div>

      <ul className="space-y-2">
        {orders.length > 0 ? orders.map((order) => (
          <li
            key={order.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow mb-4 border border-gray-200"
          >
            <span>{order.descricao} - {order.status} - {order.prioridade}</span>
            <div className='flex gap-2'>
              <button
                onClick={() => handleEditOrder(order)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Deletar
              </button>
            </div>
          </li>
        )) : (
          <p className="text-gray-500 py-4">Nenhuma ordem de serviço encontrada.</p>
        )}
      </ul>
    </div>
  );
};

export default OrdemServ;