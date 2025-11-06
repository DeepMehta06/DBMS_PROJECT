import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Droplets, Users, Heart, Building2, MessageSquare, Package, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Droplets },
    { name: 'Donors', path: '/donors', icon: Users },
    { name: 'Recipients', path: '/recipients', icon: Heart },
    { name: 'Hospitals', path: '/hospitals', icon: Building2 },
    { name: 'Hospital Chats', path: '/chat', icon: MessageSquare },
    { name: 'Blood Requests', path: '/requests', icon: Package },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        h-screen w-64 bg-zinc-900 text-white fixed left-0 top-0 overflow-y-auto shadow-xl z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Droplets className="h-6 w-6 text-red-500" />
            <span className="hidden sm:inline">Blood Bank MS</span>
          </h1>
          
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-zinc-400 hover:text-white hover:bg-zinc-800 p-2 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">© 2025 Blood Bank System</p>
          <p className="text-xs text-zinc-600 mt-1">v2.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
