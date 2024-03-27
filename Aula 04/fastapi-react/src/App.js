import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import Header from './Header';
import Home from './Home';
import UserList from './UserList';
import AddUser from './AddUser';
import OrderList from './OrderList';
import AddOrder from './AddOrder';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/cadastrarUsuario" element={<AddUser />} />
          <Route path="/pedidos" element={<OrderList />} />
          <Route path="/adicionarPedido/:userId" element={<AddOrder />} /> 
          <Route path="/produtos" element={<ProductList />} />
          <Route path="/adicionarProduto" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
