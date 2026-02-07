import { Package, MapPin, TrendingUp, Clock } from 'lucide-react';

export function DashboardPage() {
  const stats = [
    { label: 'Active Donors', value: '24', icon: Package, color: 'bg-red-500' },
    { label: 'NGO Partners', value: '12', icon: MapPin, color: 'bg-green-500' },
    { label: 'Routes Optimized', value: '156', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Avg. Response Time', value: '18m', icon: Clock, color: 'bg-purple-500' },
  ];

  const recentActivity = [
    { id: 1, type: 'Food', donor: 'Restaurant A', ngo: 'NGO 1', time: '10 mins ago', status: 'Completed' },
    { id: 2, type: 'Medicine', donor: 'Pharmacy B', ngo: 'NGO 3', time: '25 mins ago', status: 'In Progress' },
    { id: 3, type: 'Food', donor: 'Grocery C', ngo: 'NGO 2', time: '1 hour ago', status: 'Completed' },
    { id: 4, type: 'Medicine', donor: 'Hospital D', ngo: 'NGO 4', time: '2 hours ago', status: 'Completed' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your rescue operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NGO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      activity.type === 'Food' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.donor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.ngo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Plan New Route</h3>
          <p className="text-blue-100 mb-4">Create an optimized route for perishable goods delivery</p>
          <a 
            href="/route-planning" 
            className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Start Planning
          </a>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
          <p className="text-green-100 mb-4">Track performance metrics and rescue statistics</p>
          <a 
            href="/analytics" 
            className="inline-block bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-50 transition-colors"
          >
            View Reports
          </a>
        </div>
      </div>
    </div>
  );
}
