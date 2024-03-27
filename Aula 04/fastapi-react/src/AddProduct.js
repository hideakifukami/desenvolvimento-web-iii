// src/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8002/produtos', {
      id: parseInt(id),
      nome: nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade)
    });
    setId('');
    setNome('');
    setPreco('');
    setQuantidade('');
    window.location.href = '../produtos';
  };  

  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-5">Cadastrar Produtos</h1>
      <div className="row justify-content-center  mx-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cadastrar Produto</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nome:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Preço:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
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
                <button type="submit" className="btn btn-dark mt-3">Cadastrar</button>
                <a href='/produtos' className="btn btn-danger mt-3 mx-4">Cancelar</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;