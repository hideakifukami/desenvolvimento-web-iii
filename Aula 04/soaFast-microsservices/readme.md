1º
python -m venv fastapi_env

2º
Windows: fastapi_env\Scripts\activate
macOS/Linux: source fastapi_env/bin/activate

3º
pip install -r requirements.txt

4º
uvicorn login_service:app --reload --port 8001
uvicorn produtos_service:app --reload --port 8002
uvicorn carrinho_service:app --reload --port 8003
uvicorn pedido_service:app --reload --port 8004

