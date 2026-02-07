import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, MapPin } from 'lucide-react';

export function AnalyticsPage() {
  const weeklyData = [
    { day: 'Mon', food: 12, medicine: 8 },
    { day: 'Tue', food: 15, medicine: 6 },
    { day: 'Wed', food: 18, medicine: 10 },
    { day: 'Thu', food: 14, medicine: 9 },
    { day: 'Fri', food: 20, medicine: 12 },
    { day: 'Sat', food: 16, medicine: 7 },
    { day: 'Sun', food: 10, medicine: 5 },
  ];

  const monthlyTrend = [
    { month: 'Jan', routes: 45 },
    { month: 'Feb', routes: 52 },
    { month: 'Mar', routes: 48 },
    { month: 'Apr', routes: 61 },
    { month: 'May', routes: 55 },
    { month: 'Jun', routes: 67 },
  ];

  const itemDistribution = [
    { name: 'Food', value: 342, color: '#ef4444' },
    { name: 'Medicine', value: 145, color: '#3b82f6' },
  ];

  const kpiData = [
    { 
      label: 'Rescue Rate', 
      value: '94.2%', 
      change: '+2.4%', 
      trend: 'up',
      icon: Package,
      color: 'text-green-600'
    },
    { 
      label: 'Avg. Response Time', 
      value: '18 min', 
      change: '-5 min', 
      trend: 'up',
      icon: TrendingDown,
      color: 'text-green-600'
    },
    { 
      label: 'Routes/Day', 
      value: '24', 
      change: '+3', 
      trend: 'up',
      icon: MapPin,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <div className={`flex items-center gap-1 mt-2 ${kpi.color}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Rescues */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Rescues by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="food" fill="#ef4444" name="Food" />
              <Bar dataKey="medicine" fill="#3b82f6" name="Medicine" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Route Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="routes" stroke="#8b5cf6" strokeWidth={2} name="Routes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Item Distribution and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Item Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={itemDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {itemDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Total Items Rescued</span>
              <span className="text-lg font-semibold text-gray-900">487</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Food Waste Prevented</span>
              <span className="text-lg font-semibold text-gray-900">2,340 kg</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Medicine Value Saved</span>
              <span className="text-lg font-semibold text-gray-900">$48,200</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">People Served</span>
              <span className="text-lg font-semibold text-gray-900">12,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Carbon Footprint Reduced</span>
              <span className="text-lg font-semibold text-green-600">340 kg CO₂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
