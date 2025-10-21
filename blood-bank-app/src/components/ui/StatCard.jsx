import React from 'react';

const StatCard = ({ title, value, detail, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {detail && <p className="text-sm text-gray-600 mt-2">{detail}</p>}
        </div>
        {icon && (
          <div className="text-4xl text-red-500 opacity-80">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
