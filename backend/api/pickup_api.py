from fastapi import APIRouter
from models.pickup import Pickup
from storage.csv_file import pickup_store
from datetime import datetime
import uuid

router = APIRouter()


@router.post("/pickup")
def create_pickup(pickup: Pickup):
    """
    Accepts pickup request from frontend,
    stores it in CSV,
    and returns confirmation.
    """

    # add system generated fields
    pickup_data = pickup.dict()
    pickup_data["pickup_id"] = str(uuid.uuid4())
    pickup_data["created_at"] = datetime.utcnow().isoformat()
    pickup_data["status"] = "pending"

    pickup_store.add_pickup(Pickup(**pickup.dict()))

    return {
        "message": "Pickup request stored successfully",
        "pickup_id": pickup_data["pickup_id"],
        "status": "pending"
    }


@router.get("/pickups")
def get_all_pickups():
    """
    Returns all stored pickup requests
    """
    return pickup_store.get_all_pickups()


