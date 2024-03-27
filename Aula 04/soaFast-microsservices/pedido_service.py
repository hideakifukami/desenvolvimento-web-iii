import os
from fastapi import FastAPI, HTTPException, Body
import json
from fastapi.responses import JSONResponse
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

class ItemPedido(BaseModel):
    produto_id: int
    quantidade: int
    
# Ler pedido por usuario_id
def ler_pedido_do_arquivo(user_id: int):
    try:
        with open(os.path.join("cache", f"pedido_{user_id}.txt"), "r") as file:
            pedido = [json.loads(line) for line in file]
    except FileNotFoundError:
        pedido = []
    return pedido


# Salvar pedido no arquivo
def salvar_item_no_arquivo(user_id: int, item_pedido: ItemPedido):
    itens = ler_pedido_do_arquivo(user_id)

    with open(os.path.join("cache", f"pedido_{user_id}.txt"), "a") as file:
        file.write(json.dumps(item_pedido.model_dump()) + "\n")

# Rota GET de pedido por usuario
@app.get("/pedido/{user_id}")
async def listar_itens_pedido(user_id: int):
    pedido = ler_pedido_do_arquivo(user_id)
    return pedido


# Rota POST para adicionar item ao pedido
@app.post("/pedido/{user_id}")
async def add_item_pedido(user_id: int, item_pedido: ItemPedido = Body(...)):
    salvar_item_no_arquivo(user_id, item_pedido)
    return {"message": "Item adicionado ao pedido"}