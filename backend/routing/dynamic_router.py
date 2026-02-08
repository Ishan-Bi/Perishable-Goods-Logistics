from routing.osrm_client import get_route
from routing.expiry_logic import sort_by_priority


def optimize_route(pickups, ngos, start_location):
    ordered = sort_by_priority(pickups)

    points = [start_location]

    for p in ordered:
        points.append((p.latitude, p.longitude))

    points.append((ngos[0].latitude, ngos[0].longitude))

    route = get_route(points)
    return route, points
