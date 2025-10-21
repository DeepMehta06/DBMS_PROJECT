import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'used':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'contaminated':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
