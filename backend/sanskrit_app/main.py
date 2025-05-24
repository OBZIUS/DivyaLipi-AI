from fastapi import FastAPI
from sanskrit_app.api.routes import router

app = FastAPI()
app.include_router(router)
