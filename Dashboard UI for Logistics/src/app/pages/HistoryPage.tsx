import { Calendar, MapPin, Package, Clock } from 'lucide-react';

export function HistoryPage() {
  const historyData = [
    {
      id: 1,
      date: 'Feb 7, 2026',
      time: '09:30 AM',
      donors: 3,
      ngos: 2,
      itemType: 'Food',
      totalDistance: '12.5 km',
      duration: '45 min',
      status: 'Completed'
    },
    {
      id: 2,
      date: 'Feb 7, 2026',
      time: '07:15 AM',
      donors: 2,
      ngos: 1,
      itemType: 'Medicine',
      totalDistance: '8.2 km',
      duration: '28 min',
      status: 'Completed'
    },
    {
      id: 3,
      date: 'Feb 6, 2026',
      time: '04:20 PM',
      donors: 4,
      ngos: 3,
      itemType: 'Food',
      totalDistance: '18.7 km',
      duration: '62 min',
      status: 'Completed'
    },
    {
      id: 4,
      date: 'Feb 6, 2026',
      time: '02:10 PM',
      donors: 1,
      ngos: 1,
      itemType: 'Medicine',
      totalDistance: '5.4 km',
      duration: '18 min',
      status: 'Completed'
    },
    {
      id: 5,
      date: 'Feb 6, 2026',
      time: '11:00 AM',
      donors: 5,
      ngos: 2,
      itemType: 'Food',
      totalDistance: '22.1 km',
      duration: '78 min',
      status: 'Completed'
    },
    {
      id: 6,
      date: 'Feb 5, 2026',
      time: '05:45 PM',
      donors: 2,
      ngos: 2,
      itemType: 'Medicine',
      totalDistance: '10.3 km',
      duration: '35 min',
      status: 'Completed'
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Route History</h1>
        <p className="text-gray-600 mt-1">View all your completed rescue missions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Total Routes</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Items Rescued</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">487</p>
          <p className="text-sm text-gray-500 mt-1">Food & Medicine</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Distance Covered</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">1,248 km</p>
          <p className="text-sm text-gray-500 mt-1">Total distance</p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Routes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NGOs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historyData.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{route.date}</div>
                    <div className="text-xs text-gray-500">{route.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      route.itemType === 'Food' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {route.itemType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.donors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.ngos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.totalDistance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
