import json
import os
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel

app = FastAPI()

# Modelo de Usuário
class Usuario(BaseModel):
    username: str
    password: str

# Função de leitura dos usuários
def ler_usuarios_do_arquivo():
    try:
        with open(os.path.join("cache", "usuarios.txt"), "r") as file:
            usuarios = [json.loads(line) for line in file]
    except FileNotFoundError:
        usuarios = []
    return usuarios

# Função leitura de usuario simples
def ler_usuarios_simplificados_do_arquivo():
    try:
        with open(os.path.join("cache", "usuarios_simplificado.txt"), "r") as file:
            usuarios = [json.loads(line) for line in file]
    except FileNotFoundError:
        usuarios = []
    return usuarios

# Função para salvar novo usuário
def salvar_usuario_no_arquivo(novo_usuario: Usuario):
    usuarios = ler_usuarios_do_arquivo()
    for usuario in usuarios:
        if usuario["username"] == novo_usuario.username:
            raise HTTPException(status_code=400, detail=f"Já existe um usuario cadastrado como {novo_usuario.username}")

    with open(os.path.join("cache", "usuarios.txt"), "a") as file:
        file.write(json.dumps(novo_usuario.model_dump()) + "\n")

    with open(os.path.join("cache", "usuarios_simplificado.txt"), "a") as file:
        username = novo_usuario.model_dump().__getitem__("username")
        file.write(f'{{"username": "{username}"}}\n')
    
# GET listar usuarios
@app.get("/usuarios")
async def listar_usuarios():
    usuarios = ler_usuarios_simplificados_do_arquivo()
    return usuarios

# POST novo usuario
@app.post("/usuarios")
async def novo_usuario(novo_usuario: Usuario = Body(...)):
    salvar_usuario_no_arquivo(novo_usuario)
    return {"message": "Novo usuário cadastrado com sucesso"}

# POST login
@app.post("/login")
async def login(usuario_login: Usuario = Body(...)):
    usuarios = ler_usuarios_do_arquivo()
    for usuario in usuarios:
        if (usuario["username"] == usuario_login.username) and (usuario["password"] == usuario_login.password):
            return {"status": "sucesso", "mensagem": "Usuário autenticado"}
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
