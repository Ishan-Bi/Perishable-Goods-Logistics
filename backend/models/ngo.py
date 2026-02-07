from pydantic import BaseModel

class NGO(BaseModel):
    name: str
    lat: float
    lng: float
