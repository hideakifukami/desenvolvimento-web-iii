import json
import os
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
# Modelo de Produto
class Produto(BaseModel):
    id: int
    nome: str
    preco: float
    quantidade: int

# Função de leitura dos produtos
def ler_produtos_do_arquivo():
    try:
        with open(os.path.join("cache", "produtos.txt", "r")) as file:
            produtos = [json.loads(line) for line in file]
    except FileNotFoundError:
        produtos = []
    return produtos

# Função para salvar produto no arquivo
def salvar_produto_no_arquivo(novo_produto: Produto):
    produtos = ler_produtos_do_arquivo()
    for produto in produtos:
        if produto["id"] == novo_produto.id:
            raise HTTPException(status_code=400, detail=f"Já existe um produto com o ID {novo_produto.id}")

    with open(os.path.join("cache", "produtos.txt", "a")) as file:
        file.write(json.dumps(novo_produto.model_dump()) + "\n")

# GET listar produtos
@app.get("/produtos")
async def listar_produtos():
    produtos = ler_produtos_do_arquivo()
    return produtos

# POST salvar produto
@app.post("/produtos")
async def salvar_produto(novo_produto: Produto = Body(...)):
    salvar_produto_no_arquivo(novo_produto)
    return {"message": "Produto salvo com sucesso"}
