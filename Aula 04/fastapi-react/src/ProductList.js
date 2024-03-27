// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8002/produtos');
      setProducts(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Lista de Produtos</h1>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.nome}</h5>
                  <p className="card-text">
                    <strong>ID:</strong> {product.id}<br />
                    <strong>Preço:</strong> {product.preco}<br />
                    <strong>Quantidade:</strong> {product.quantidade}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="text-center">
        <a href="/adicionarProduto" class="btn btn-dark">Adicionar Produto</a>
      </div>
    </>
  );
};

export default ProductList;