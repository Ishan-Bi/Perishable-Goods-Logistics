import csv
from pathlib import Path
from typing import List
from models.pickup import Pickup

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)
CSV_FILE = DATA_DIR / "pickups.csv"


class CSVPickupStore:
    def __init__(self):
        self.pickups: List[Pickup] = []
        self._load()

    def _load(self):
        if not CSV_FILE.exists():
            return
        with open(CSV_FILE, "r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                row["quantity"] = int(row["quantity"])
                row["latitude"] = float(row["latitude"])
                row["longitude"] = float(row["longitude"])
                self.pickups.append(Pickup(**row))

    def add_pickup(self, pickup: Pickup):
        self.pickups.append(pickup)
        exists = CSV_FILE.exists()
        with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=pickup.dict().keys())
            if not exists:
                writer.writeheader()
            writer.writerow(pickup.dict())

    def get_all_pickups(self):
        return self.pickups


pickup_store = CSVPickupStore()


