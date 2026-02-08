from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.pickup_api import router as pickup_router

app = FastAPI(
    title="Perishable Goods Logistics Optimizer",
    description="Backend for Food & Medicine Rescue Network",
    version="1.0.0"
)

# 🔓 CORS (Frontend ke liye open)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # hackathon mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 Pickup APIs register
app.include_router(pickup_router)


# 🟢 Root endpoint
@app.get("/")
def root():
    return {
        "message": "Perishable Goods Logistics Optimizer Backend is running",
        "available_endpoints": [
            "/pickup  (POST)",
            "/pickups (GET)",
            "/docs"
        ]
    }


# 🟢 Health check
@app.get("/health")
def health():
    return {
        "status": "OK",
        "storage": "CSV",
        "data_file": "backend/data/pickups.csv"
    }
