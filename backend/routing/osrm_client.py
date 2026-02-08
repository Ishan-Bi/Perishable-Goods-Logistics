import requests

OSRM_URL = "https://router.project-osrm.org"


def get_route(points):
    """
    points = [(lat, lon), (lat, lon), ...]
    """
    coords = ";".join([f"{lon},{lat}" for lat, lon in points])

    url = f"{OSRM_URL}/route/v1/driving/{coords}"
    params = {
        "overview": "full",
        "geometries": "geojson"
    }

    res = requests.get(url, params=params)
    res.raise_for_status()

    return res.json()["routes"][0]
