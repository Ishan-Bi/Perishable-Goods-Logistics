from routing.osrm_client import get_route
from storage.csv_file import store

def compute_route(vehicle):
    route_points = []
    current = vehicle

    for pickup in store.get_all():
        segment = get_route(current, (pickup.lat, pickup.lng))
        route_points.extend(segment)
        current = (pickup.lat, pickup.lng)

    return route_points
