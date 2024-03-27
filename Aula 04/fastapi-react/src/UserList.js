// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8001/usuarios');
      setUser(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-5">Lista de Usuários</h1>
        <div className="row">
          {user.map((user) => (
            <div className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"><strong>Usuário: </strong>{user.username}</h5>
                  <p className="card-text">              
                    <strong>Senha: </strong>********              
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="text-center">
        <a href="/cadastrarUsuario" class="btn btn-dark">Cadastrar Usuário</a>
      </div>
    </>
  );
};

export default UserList;