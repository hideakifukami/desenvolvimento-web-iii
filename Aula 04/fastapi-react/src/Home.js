import React from 'react';

const Home = () => {
  return (    
    <div class="container my-5">
        <div class="row">
        <div class="col-md-6 mb-3">
            <div class="card">
            <div class="card-header">
                Usuários
            </div>
            <div class="card-body">
                <h5 class="card-title">Gerenciar usuários</h5>
                <p class="card-text">Cadastre e visualize usuários.</p>
                <a href="/usuarios" class="btn btn-dark">Acessar</a>
            </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="card">
            <div class="card-header">
                Pedidos
            </div>
            <div class="card-body">
                <h5 class="card-title">Gerenciar pedidos</h5>
                <p class="card-text">Cadastre e visualize pedidos.</p>
                <a href="/pedidos" class="btn btn-dark">Acessar</a>
            </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="card">
            <div class="card-header">
                Produtos
            </div>
            <div class="card-body">
                <h5 class="card-title">Gerenciar produtos</h5>
                <p class="card-text">Cadastre e visualize produtos.</p>
                <a href="/produtos" class="btn btn-dark">Acessar</a>
            </div>
            </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="card">
            <div class="card-header">
                Carrinho
            </div>
            <div class="card-body">
                <h5 class="card-title">Gerenciar carrinho</h5>
                <p class="card-text">Adicione e vizualise o carrinho.</p>
                <a href="/carrinho" class="btn btn-dark">Acessar</a>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Home;

