from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="StyleForge ML Service",
    description="Python FastAPI service handling YOLOv8, CLIP embeddings, and background removal.",
    version="1.0.0"
)

class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/health", response_model=HealthResponse)
def health_check():
    """
    Basic health check endpoint to ensure the ML service is running.
    """
    return {"status": "ok", "message": "StyleForge ML Service is up and running."}

@app.get("/")
def read_root():
    return {"message": "Welcome to StyleForge ML API"}
