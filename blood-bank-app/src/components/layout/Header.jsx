import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';

const Header = ({ title, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    const styles = role === 'manager' 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-blue-100 text-blue-700';
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-200">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-zinc-700 hover:text-blue-600 focus:outline-none p-2 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">{title}</h2>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-right hidden sm:block">
          <div className="flex items-center gap-2 justify-end">
            <p className="text-sm font-medium text-zinc-900">{user?.name || 'User'}</p>
            {user?.role && getRoleBadge(user.role)}
          </div>
          <p className="text-xs text-zinc-500">{user?.email || ''}</p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            {getInitials(user?.name)}
          </button>
          
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-20 border border-zinc-200">
                <div className="px-4 py-3 border-b border-zinc-200">
                  <p className="text-sm font-medium text-zinc-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{user?.email || ''}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-3 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-zinc-500" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
