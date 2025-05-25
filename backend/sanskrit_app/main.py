from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sanskrit_app.api.routes import router
import logging

# Initialize FastAPI app
app = FastAPI()

# Configure CORS middleware to allow all origins (adjust in production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your API router (which must define /process)
app.include_router(router)

# Optional: Add a simple root endpoint for health check
@app.get("/")
async def root():
    return {"message": "Sanskrit OCR backend is running."}

# Global exception logging middleware (optional, helps debugging)
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
