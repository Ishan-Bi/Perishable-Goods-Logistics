from pydantic import BaseModel
from datetime import datetime

class Pickup(BaseModel):
    name: str
    phone: str
    email: str
    donation_type: str
    quantity: int
    lat: float
    lng: float
    pickup_time: datetime
