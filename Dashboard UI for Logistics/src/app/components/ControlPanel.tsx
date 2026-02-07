import { useState } from 'react';
import { MapPin, Package, Heart, Navigation, Locate } from 'lucide-react';

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

interface ControlPanelProps {
  donors: Donor[];
  ngos: NGO[];
  onAddDonor: (itemType: string, expiryTime: string) => void;
  onSelectDonorLocation: (latitude: number, longitude: number) => void;
  onAddNGO: (latitude: number, longitude: number) => void;
  onOptimizeRoute: () => void;
  isSelectingDonor: boolean;
  isSelectingNGO: boolean;
  pendingDonor: { itemType: string; expiryTime: string } | null;
}

export function ControlPanel({
  donors,
  ngos,
  onAddDonor,
  onSelectDonorLocation,
  onAddNGO,
  onOptimizeRoute,
  isSelectingDonor,
  isSelectingNGO,
  pendingDonor
}: ControlPanelProps) {
  const [itemType, setItemType] = useState<string>('Food');
  const [expiryTime, setExpiryTime] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleAddDonorWithGPS = () => {
    if (!expiryTime) {
      alert('Please enter expiry time');
      return;
    }
    
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGettingLocation(false);
        onAddDonor(itemType, expiryTime);
        onSelectDonorLocation(position.coords.latitude, position.coords.longitude);
        setExpiryTime('');
      },
      (error) => {
        setIsGettingLocation(false);
        alert(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleAddNGOWithGPS = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGettingLocation(false);
        onAddNGO(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setIsGettingLocation(false);
        alert(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const canOptimize = donors.length > 0 && ngos.length > 0;

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Title */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">
          Perishable Goods Logistics Optimizer
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Food / Medicine Rescue System
        </p>
      </div>

      {/* Add Donor Card */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-red-500" />
          <h2 className="font-medium text-gray-900">Add Donor</h2>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Item Type</label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGettingLocation}
            >
              <option value="Food">Food</option>
              <option value="Medicine">Medicine</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Expiry Time (hours)</label>
            <input
              type="number"
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              placeholder="e.g., 24"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isGettingLocation}
              min="1"
            />
          </div>
          
          <button
            onClick={handleAddDonorWithGPS}
            disabled={isGettingLocation}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {isGettingLocation ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Getting GPS Location...
              </>
            ) : (
              <>
                <Locate className="w-4 h-4" />
                Add Donor (Use My GPS)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add NGO Card */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-green-500" />
          <h2 className="font-medium text-gray-900">Add NGO</h2>
        </div>
        
        <button
          onClick={handleAddNGOWithGPS}
          disabled={isGettingLocation}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {isGettingLocation ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Getting GPS Location...
            </>
          ) : (
            <>
              <Locate className="w-4 h-4" />
              Add NGO (Use My GPS)
            </>
          )}
        </button>
      </div>

      {/* Lists Section */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 flex-1">
        <h3 className="font-medium text-gray-900 mb-3">Added Locations</h3>
        
        <div className="space-y-4">
          {/* Donors List */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Donors ({donors.length})
            </div>
            <div className="space-y-2">
              {donors.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No donors added</p>
              ) : (
                donors.map((donor, index) => (
                  <div key={donor.id} className="bg-gray-50 rounded px-3 py-2 text-sm border border-gray-200">
                    <div className="font-medium text-gray-900">
                      {donor.itemType} #{index + 1}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Expires in {donor.expiryTime}h
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* NGOs List */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase mb-2 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              NGOs ({ngos.length})
            </div>
            <div className="space-y-2">
              {ngos.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No NGOs added</p>
              ) : (
                ngos.map((ngo, index) => (
                  <div key={ngo.id} className="bg-gray-50 rounded px-3 py-2 text-sm border border-gray-200">
                    <div className="font-medium text-gray-900">
                      NGO #{index + 1}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={onOptimizeRoute}
        disabled={!canOptimize}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition-all disabled:shadow-none"
      >
        <Navigation className="w-5 h-5" />
        Optimize Rescue Route
      </button>
    </div>
  );
}