from fastapi import APIRouter
from routing.dynamic_router import compute_route
from visualization.folium_map import generate_map

router = APIRouter()

@router.post("/optimize")
def optimize_route():
    vehicle_location = (28.6139, 77.2090)  # Delhi default
    route = compute_route(vehicle_location)
    generate_map(vehicle_location, route)
    return {
        "message": "Route optimized",
        "map": "output/optimized_route.html"
    }
