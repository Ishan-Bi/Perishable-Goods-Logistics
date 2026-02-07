import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, History, BarChart3, Package } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/route-planning', icon: Map, label: 'Route Planning' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      {/* Logo/Title */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="font-semibold text-lg">PGLO System</h1>
            <p className="text-xs text-gray-400">Rescue Optimizer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Hackathon Project 2026
        </p>
      </div>
    </div>
  );
}
