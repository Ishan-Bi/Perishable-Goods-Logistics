from storage.csv_file import add_pickup
from routing.dynamic_router import compute_route
from visualization.folium_map import generate_map

vehicle = (28.6139, 77.2090)

add_pickup(28.6280, 77.2200)
add_pickup(28.5950, 77.2300)

pickups = [(28.6280, 77.2200), (28.5950, 77.2300)]
route = compute_route(vehicle, pickups)

generate_map(vehicle, route)

print("Map generated successfully")
