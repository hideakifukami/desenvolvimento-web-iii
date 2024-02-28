from typing import Union

from fastapi import FastAPI, HTTPException, Request 
from starlette.datastructures import Headers, QueryParams
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles 

app = FastAPI()
app.mount("/web", StaticFiles(directory="public"), name="web")

@app.get("/web")
async def root():
    return FileResponse("public/index.html")

@app.get("/info")
async def request_info(request: Request):
    headers = request.headers
    query_params = request.query_params
    #dict chama o dicionário para formatar os dados em JSON
    headers_dict = dict(headers)
    query_params_dict = dict(query_params)
    
    return {
        "headers": headers_dict,
        "query_params": query_params_dict
    }

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}