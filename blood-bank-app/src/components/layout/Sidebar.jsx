import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Inventory', path: '/inventory', icon: '🩸' },
    { name: 'Donors', path: '/donors', icon: '👥' },
    { name: 'Recipients', path: '/recipients', icon: '🏥' },
    { name: 'Hospitals', path: '/hospitals', icon: '🏢' },
  ];

  return (
    <div className="h-screen w-64 bg-red-700 text-white fixed left-0 top-0 overflow-y-auto shadow-lg">
      <div className="p-6 border-b border-red-600">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-3xl">🩸</span>
          Blood Bank MS
        </h1>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-white hover:bg-red-600 transition-colors ${
                isActive ? 'bg-red-800 border-l-4 border-white' : ''
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-red-600">
        <p className="text-sm text-red-200">© 2025 Blood Bank System</p>
      </div>
    </div>
  );
};

export default Sidebar;
