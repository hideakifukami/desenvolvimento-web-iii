import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddOrder = () => {
  const { userId } = useParams();
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://127.0.0.1:8004/pedido/${userId}`, {
      produtoId: parseInt(produtoId),
      quantidade: parseInt(quantidade)
    });
    setProdutoId('');
    setQuantidade('');
    window.location.href = '../pedidos';
  };  

  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-5">Adicionar Pedido</h1>
      <div className="row justify-content-center  mx-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Adicionar Pedido</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>ID Produto:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={produtoId}
                    onChange={(e) => setProdutoId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Quantidade:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="btn btn-dark mt-3">Adicionar ao Pedido</button>
                <a href='/pedidos' className="btn btn-danger mt-3 mx-4">Cancelar</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;