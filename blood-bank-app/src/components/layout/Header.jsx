import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title }) => {
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
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${styles}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
            {user?.role && getRoleBadge(user.role)}
          </div>
          <p className="text-xs text-gray-500">{user?.email || ''}</p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {getInitials(user?.name)}
          </button>
          
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <span className="text-lg">🚪</span>
                  Logout
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
