import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8001/usuarios', {
      username: username,
      password: password,
    });
    setUsername('');
    setPassword('');
    window.location.href = '../usuarios';
  };  

  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-5">Cadastrar Usuários</h1>
      <div className="row justify-content-center  mx-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cadastrar Usuário</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Passoword:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="btn btn-dark mt-3">Cadastrar Usuário</button>
                <a href='/usuarios' className="btn btn-danger mt-3 mx-4">Cancelar</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;