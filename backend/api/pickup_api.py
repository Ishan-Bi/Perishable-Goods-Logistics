from fastapi import APIRouter
from models.pickup import Pickup
from storage.memory import store

router = APIRouter()

@router.post("/pickup")
def create_pickup(pickup: Pickup):
    store.add(pickup)
    return {"message": "Pickup stored successfully"}
