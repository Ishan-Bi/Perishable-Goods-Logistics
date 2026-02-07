import requests

OSRM_BASE_URL = "https://router.project-osrm.org"

def get_route(start, end):
    url = (
        f"{OSRM_BASE_URL}/route/v1/driving/"
        f"{start[1]},{start[0]};{end[1]},{end[0]}"
        "?overview=full&geometries=geojson"
    )

    response = requests.get(url)
    data = response.json()

    if "routes" not in data:
        raise Exception("OSRM error")

    coords = data["routes"][0]["geometry"]["coordinates"]
    return [[lat, lng] for lng, lat in coords]
