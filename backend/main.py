from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# API routers
from api.pickup_api import router as pickup_router
from api.optimize_api import router as optimize_router

# App instance
app = FastAPI(
    title="Perishable Goods Logistics Optimizer",
    description="Food & Medicine Rescue Routing Engine",
    version="1.0.0"
)

# -----------------------------
# Middleware
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # frontend ke liye
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routers
# -----------------------------
app.include_router(
    pickup_router,
    prefix="/api",
    tags=["Pickups"]
)

app.include_router(
    optimize_router,
    prefix="/api",
    tags=["Routing"]
)

# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def root():
    return {
        "status": "Backend running",
        "service": "Food & Medicine Rescue",
        "version": "1.0.0"
    }

# -----------------------------
# Startup Event
# -----------------------------
@app.on_event("startup")
def startup_event():
    print("Backend started successfully")

# -----------------------------
# Shutdown Event
# -----------------------------
@app.on_event("shutdown")
def shutdown_event():
    print("Backend shutting down")
