from fastapi import FastAPI, HTTPException
import httpx
#Utilizado para fazer regex.
import re
from pydantic import BaseModel, ValidationError
from typing import List

app = FastAPI()

#Dicionário, diferente de lista que é definida por [].
#Cache como memória temporária para reduzir recursos.
cep_cache = {} 

class Item(BaseModel):
    cep: str
    logradouro: str
    complemento: str
    bairro: str
    localidade: str
    uf: str
    ibge: str
    gia: str
    ddd: str
    siafi: str


def validar_cep(cep: str) -> bool:
    return re.fullmatch(r"\d{5}-?\d{3}", cep) is not None

async def consultar_cep_externo(cep: str) -> dict:
    url = f"https://viacep.com.br/ws/{cep}/json/"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=404, detail="CEP não encontrado")

#Definição de endpoint exposto na web a partir da anotação.
@app.get("/cep/{cep}")
async def buscar_cep(cep: str):
    cep = cep.replace("-", "")
    
    if not validar_cep(cep):
        raise HTTPException(status_code=400, detail="Formato de CEP inválido")

    #Verifica cache, se não tiver cadastrado faz a solicitação viacep e armazena no dicionario.    
    if cep in cep_cache:
        return {"data": cep_cache[cep], "cache": True}
    
    dados_cep = await consultar_cep_externo(cep)

    with open("cache.txt", "a") as file:
        file.write(f"{dados_cep}\n")
    
    return {"data": dados_cep, "cache": False}

@app.get("/cache/{cep}")
async def consultar_cache(cep: str):
    cep = cep.replace("-", "")
    
    if cep in cep_cache:
        return {"data": cep_cache[cep]}
    else:
        raise HTTPException(status_code=404, detail="CEP não encontrado no cache")

@app.get("/cache")
async def consultar_todo_cache() -> List[Item]:
    items = []
    try:
        with open("cache.txt", "r") as file:
            for line in file:
                item_data = eval(line)  # Avalia a string JSON para criar um dicionário
                item = Item(**item_data)  # Cria um objeto Item com base no dicionário
                items.append(item)  # Adiciona o objeto Item à lista
    except FileNotFoundError:
        return []
            
    return items
  
