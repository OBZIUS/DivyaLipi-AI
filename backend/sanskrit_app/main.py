from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sanskrit_app.api.routes import router
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

origins = [
    "https://divya-lipi-ai.vercel.app",  
    "http://localhost:8888"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Sanskrit OCR backend is running."}

@app.middleware("http")
async def log_exceptions(request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logging.error(f"Unhandled error: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"},
        )
