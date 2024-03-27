import React, { useState } from 'react';

import axios from 'axios';

const OrderList = () => {
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.get(`http://127.0.0.1:8004/pedido/${userId}`);
    setOrders(result.data);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Listar de Pedidos</h1>

        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title mb-3">Informe o UserID: </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="number"
                  name="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Digite o ID do usuário"
                />
              </div>
              <button type="submit" className="btn btn-dark mt-3">Buscar Pedidos</button>
              <a href={`/adicionarPedido/?userId=${userId}`} className="btn btn-warning mt-3 mx-4">Adicionar Pedido</a>
            </form>
          </div>
        </div>

        

        {orders.length > 0 && (
          <div>
            <h2>Pedidos do Usuário {userId}</h2>
            <ul>
              {orders.map((order) => (
                <li>
                  <strong>ID do Produto:</strong> {order.produto_id}
                  <br />
                  <strong>Quantidade:</strong> {order.quantidade}                                  
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
