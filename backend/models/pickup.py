from pydantic import BaseModel
from typing import Optional


class Pickup(BaseModel):
    name: str
    phone: str
    email: str
    organization: Optional[str] = None
    donation_type: str
    quantity: int
    address: str
    notes: Optional[str] = None
    pickup_time: Optional[str] = None
    latitude: float
    longitude: float

