// OSRM Service for route optimization
const OSRM_SERVER = 'https://router.project-osrm.org';

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface OSRMRoute {
  coordinates: [number, number][];
  distance: number; // in meters
  duration: number; // in seconds
}

/**
 * Calculate optimized route using OSRM Trip service
 * This service solves the Traveling Salesman Problem
 */
export async function calculateOptimizedRoute(
  points: RoutePoint[]
): Promise<OSRMRoute | null> {
  if (points.length < 2) {
    return null;
  }

  try {
    // Format coordinates for OSRM (lng,lat format)
    const coordinates = points.map(p => `${p.lng},${p.lat}`).join(';');
    
    // Use OSRM Trip service for route optimization (TSP solver)
    const url = `${OSRM_SERVER}/trip/v1/driving/${coordinates}?source=first&destination=last&roundtrip=false&steps=false&geometries=geojson`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== 'Ok' || !data.trips || data.trips.length === 0) {
      console.error('OSRM error:', data);
      return null;
    }

    const trip = data.trips[0];
    
    // Convert GeoJSON coordinates to [lat, lng] format for Leaflet
    const routeCoordinates: [number, number][] = trip.geometry.coordinates.map(
      (coord: [number, number]) => [coord[1], coord[0]] // Convert from [lng, lat] to [lat, lng]
    );

    return {
      coordinates: routeCoordinates,
      distance: trip.distance,
      duration: trip.duration
    };
  } catch (error) {
    console.error('Error calling OSRM:', error);
    return null;
  }
}

/**
 * Calculate simple route between two points using OSRM Route service
 */
export async function calculateRoute(
  start: RoutePoint,
  end: RoutePoint
): Promise<OSRMRoute | null> {
  try {
    const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
    const url = `${OSRM_SERVER}/route/v1/driving/${coordinates}?geometries=geojson&overview=full`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      console.error('OSRM error:', data);
      return null;
    }

    const route = data.routes[0];
    
    const routeCoordinates: [number, number][] = route.geometry.coordinates.map(
      (coord: [number, number]) => [coord[1], coord[0]]
    );

    return {
      coordinates: routeCoordinates,
      distance: route.distance,
      duration: route.duration
    };
  } catch (error) {
    console.error('Error calling OSRM:', error);
    return null;
  }
}

/**
 * Format distance for display
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Format duration for display
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
