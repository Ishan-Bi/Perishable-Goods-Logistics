from typing import List
from models.pickup import Pickup

class PickupStore:
    def __init__(self):
        self.pickups: List[Pickup] = []

    def add(self, pickup: Pickup):
        self.pickups.append(pickup)

    def get_all(self) -> List[Pickup]:
        return self.pickups

store = PickupStore()


