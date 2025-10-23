import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import { bloodSpecimensAPI, donorsAPI } from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch inventory stats
      const inventoryResponse = await bloodSpecimensAPI.getInventoryStats();
      
      // Fetch donor stats
      const donorStatsResponse = await donorsAPI.getStats();
      
      if (inventoryResponse.data.success && donorStatsResponse.data.success) {
        const inventoryData = inventoryResponse.data.data;
        const donorData = donorStatsResponse.data.data;
        
        // Ensure byBloodGroup is an object, not an array
        let byBloodGroup = inventoryData.byBloodGroup || {};
        
        // If byBloodGroup is an array, convert it to object
        if (Array.isArray(byBloodGroup)) {
          const converted = {};
          byBloodGroup.forEach(item => {
            if (item._id) {
              converted[item._id] = item.total || item.count || 0;
            }
          });
          byBloodGroup = converted;
        }
        
        // Combine stats
        setStats({
          totalUnits: inventoryData.totalUnits || 0,
          donorsThisMonth: donorData.thisMonth || 0,
          available: inventoryData.available || 0,
          byBloodGroup: byBloodGroup,
          lowStockGroups: Object.entries(byBloodGroup)
            .filter(([_, count]) => count < 5)
            .map(([group]) => group)
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p className="font-semibold mb-2">Error Loading Dashboard</p>
        <p>{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Overview</h3>
        <p className="text-gray-600">Welcome to the Blood Bank Management System Dashboard</p>
      </div>

      {stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Blood Units"
              value={stats.totalUnits}
              detail="Available in inventory"
              icon="🩸"
            />
            <StatCard
              title="Donors This Month"
              value={stats.donorsThisMonth}
              detail="New registrations"
              icon="👥"
            />
            <StatCard
              title="Available Units"
              value={stats.available}
              detail="Ready for transfusion"
              icon="✓"
            />
            <StatCard
              title="Low Stock Groups"
              value={stats.lowStockGroups.length}
              detail={stats.lowStockGroups.length > 0 ? stats.lowStockGroups.join(', ') : 'All stocked'}
              icon="⚠️"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Group Inventory</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.byBloodGroup && typeof stats.byBloodGroup === 'object' && !Array.isArray(stats.byBloodGroup) ? (
                Object.entries(stats.byBloodGroup).map(([bloodGroup, count]) => (
                  <div 
                    key={bloodGroup} 
                    className={`p-4 rounded-lg border-2 ${
                      count < 5 ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-800">{bloodGroup}</div>
                    <div className="text-sm text-gray-600 mt-1">{count} units</div>
                    {count < 5 && <div className="text-xs text-red-600 mt-1 font-semibold">Low Stock!</div>}
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-500">No blood group data available</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/inventory')}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>🩸</span>
                <span>Add Blood Unit</span>
              </button>
              <button 
                onClick={() => navigate('/donors')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>👥</span>
                <span>Register Donor</span>
              </button>
              <button 
                onClick={() => navigate('/recipients')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>🏥</span>
                <span>Process Request</span>
              </button>
            </div>
          </div>

          {stats.lowStockGroups.length > 0 && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>The following blood groups are running low: <strong>{stats.lowStockGroups.join(', ')}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-8 bg-gray-100 rounded-lg text-center text-gray-600">
          No statistics available
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
