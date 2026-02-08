import folium
from storage.ngos import NGOS
from storage.csv_file import store

def generate_map(vehicle, route):
    m = folium.Map(location=vehicle, zoom_start=12)

    folium.Marker(
        vehicle,
        tooltip="Vehicle",
        icon=folium.Icon(color="blue")
    ).add_to(m)

    for ngo in NGOS:
        folium.Marker(
            [ngo["lat"], ngo["lng"]],
            tooltip=ngo["name"],
            icon=folium.Icon(color="green")
        ).add_to(m)

    for pickup in store.get_all():
        folium.Marker(
            [pickup.lat, pickup.lng],
            tooltip=f"{pickup.name} ({pickup.quantity}kg)",
            icon=folium.Icon(color="red")
        ).add_to(m)

    folium.PolyLine(route, color="blue", weight=4).add_to(m)

    m.save("output/optimized_route.html")
