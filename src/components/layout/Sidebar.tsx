import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package,
  BarChart3,
  ShoppingCart,
  Calendar,
  Users,
  LogOut,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/admin', label: 'Dashboard', icon: BarChart3 },
    { to: '/admin/services', label: 'Services', icon: Package },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { to: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { to: '/admin/users', label: 'Users', icon: Users },
  ];

  return (
    <div className={`w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 border-b border-gray-700">
        <Package size={28} />
        <div>
          <h1 className="font-bold text-xl">Tailorify</h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="p-4 flex items-center gap-3 border-t border-gray-700 hover:bg-gray-800 transition-colors w-full"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};