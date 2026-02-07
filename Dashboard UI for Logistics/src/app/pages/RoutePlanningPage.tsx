import { useState } from 'react';
import { MapView } from '../components/MapView';
import { ControlPanel } from '../components/ControlPanel';
import { calculateOptimizedRoute, formatDistance, formatDuration } from '../services/osrmService';
import { toast } from 'sonner';

interface Donor {
  id: string;
  itemType: string;
  expiryTime: string;
  location: [number, number];
}

interface NGO {
  id: string;
  location: [number, number];
}

export function RoutePlanningPage() {
  // Default location: San Francisco
  const [vehicleLocation] = useState<[number, number]>([37.7749, -122.4194]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [pendingDonor, setPendingDonor] = useState<{ itemType: string; expiryTime: string } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleAddDonor = (itemType: string, expiryTime: string) => {
    setPendingDonor({ itemType, expiryTime });
  };

  const handleSelectDonorLocation = (lat: number, lng: number) => {
    if (pendingDonor) {
      const newDonor: Donor = {
        id: `donor-${Date.now()}`,
        itemType: pendingDonor.itemType,
        expiryTime: pendingDonor.expiryTime,
        location: [lat, lng]
      };
      setDonors([...donors, newDonor]);
      setPendingDonor(null);
      toast.success(`${pendingDonor.itemType} donor added at GPS location`);
    }
  };

  const handleAddNGO = (lat: number, lng: number) => {
    const newNGO: NGO = {
      id: `ngo-${Date.now()}`,
      location: [lat, lng]
    };
    setNgos([...ngos, newNGO]);
    toast.success('NGO added at GPS location');
  };

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true);
    
    try {
      // Sort donors by expiry time (most urgent first)
      const sortedDonors = [...donors].sort((a, b) => 
        parseInt(a.expiryTime) - parseInt(b.expiryTime)
      );

      // Build the route points: vehicle -> urgent donors -> remaining donors -> NGOs
      const routePoints = [
        { lat: vehicleLocation[0], lng: vehicleLocation[1] },
        ...sortedDonors.map(donor => ({ lat: donor.location[0], lng: donor.location[1] })),
        ...ngos.map(ngo => ({ lat: ngo.location[0], lng: ngo.location[1] }))
      ];

      // Call OSRM to get optimized route
      const osrmRoute = await calculateOptimizedRoute(routePoints);
      
      if (osrmRoute) {
        setRoute(osrmRoute.coordinates);
        setRouteInfo({
          distance: formatDistance(osrmRoute.distance),
          duration: formatDuration(osrmRoute.duration)
        });
        toast.success(`Route optimized! Distance: ${formatDistance(osrmRoute.distance)}, Duration: ${formatDuration(osrmRoute.duration)}`);
      } else {
        // Fallback to simple path if OSRM fails
        const simpleRoute: [number, number][] = routePoints.map(p => [p.lat, p.lng]);
        setRoute(simpleRoute);
        setRouteInfo(null);
        toast.error('Could not connect to OSRM server. Showing simple route.');
      }
    } catch (error) {
      console.error('Route optimization error:', error);
      toast.error('Failed to optimize route');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Control Panel */}
      <div className="w-[420px] h-full border-r border-gray-200">
        <ControlPanel
          donors={donors}
          ngos={ngos}
          onAddDonor={handleAddDonor}
          onSelectDonorLocation={handleSelectDonorLocation}
          onAddNGO={handleAddNGO}
          onOptimizeRoute={handleOptimizeRoute}
          isSelectingDonor={false}
          isSelectingNGO={false}
          pendingDonor={pendingDonor}
        />
      </div>

      {/* Right Map View */}
      <div className="flex-1 h-full p-4 relative">
        <MapView
          donors={donors}
          ngos={ngos}
          vehicleLocation={vehicleLocation}
          route={route}
          onMapClick={() => {}}
          isSelectingLocation={false}
        />
        
        {/* Route Info Overlay */}
        {routeInfo && (
          <div className="absolute top-8 right-8 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-[1000]">
            <h3 className="font-semibold text-gray-900 mb-2">Route Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium text-gray-900">{routeInfo.distance}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">{routeInfo.duration}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Optimizing Overlay */}
        {isOptimizing && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg shadow-xl p-6 flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="font-medium text-gray-900">Optimizing route with OSRM...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}