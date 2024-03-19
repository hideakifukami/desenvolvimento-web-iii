import os
from fastapi import FastAPI, HTTPException, Body
import json
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

# Modelo de ItemCarrinho
class ItemCarrinho(BaseModel):
    produto_id: int
    quantidade: int
    
# Ler carrinho por usuario_id
def ler_carrinho_do_arquivo(user_id: int):
    try:
        with open(os.path.join("cache", f"carrinho_{user_id}.txt", "r")) as file:
            carrinho = [json.loads(line) for line in file]
    except FileNotFoundError:
        carrinho = []
    return carrinho


# Salvar carrinho no arquivo
def salvar_item_no_arquivo(user_id: int, item_carrinho: ItemCarrinho):
    itens = ler_carrinho_do_arquivo(user_id)

    with open(os.path.join("cache", f"carrinho_{user_id}.txt", "a")) as file:
        file.write(json.dumps(item_carrinho.model_dump()) + "\n")

# Rota GET de carrinho por usuario
@app.get("/carrinho/{user_id}")
async def listar_itens_carrinho(user_id: int):
    carrinho = ler_carrinho_do_arquivo(user_id)
    return carrinho


# Rota POST para adicionar item ao carrinho
@app.post("/carrinho/{user_id}")
async def add_item_carrinho(user_id: int, item_carrinho: ItemCarrinho = Body(...)):
    salvar_item_no_arquivo(user_id, item_carrinho)
    return {"message": "Item adicionado com sucesso"}