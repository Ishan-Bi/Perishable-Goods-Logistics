import folium
from storage.ngos import NGOS
from storage.csv_file import pickup_store


def generate_map(vehicle_location, osrm_route):
    """
    vehicle_location = (lat, lon)
    osrm_route = route object from OSRM
    """

    m = folium.Map(location=vehicle_location, zoom_start=12)

    # 🚚 Vehicle marker
    folium.Marker(
        vehicle_location,
        tooltip="Vehicle Start",
        icon=folium.Icon(color="blue", icon="truck", prefix="fa")
    ).add_to(m)

    # 🏢 NGO markers
    for ngo in NGOS:
        folium.Marker(
            [ngo["lat"], ngo["lng"]],
            tooltip=ngo["name"],
            icon=folium.Icon(color="green", icon="home")
        ).add_to(m)

    # 📦 Pickup markers (from CSV)
    for pickup in pickup_store.get_all_pickups():
        folium.Marker(
            [pickup.latitude, pickup.longitude],
            tooltip=f"{pickup.name} ({pickup.quantity}kg)",
            icon=folium.Icon(color="red", icon="cutlery")
        ).add_to(m)

    # 🛣️ Route from OSRM (GeoJSON)
    folium.GeoJson(
        osrm_route["geometry"],
        name="Optimized Route"
    ).add_to(m)

    # 💾 Save map
    output_path = "backend/output/optimized_route.html"
    m.save(output_path)

    return output_path
