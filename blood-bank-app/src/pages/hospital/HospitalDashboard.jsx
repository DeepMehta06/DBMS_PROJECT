import React, { useState, useEffect } from 'react';
import { useHospitalAuth } from '../../context/HospitalAuthContext';
import { hospitalRequestsAPI } from '../../services/api';
import { 
  Building2, 
  Droplets, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Package,
  MessageSquare,
  Bell,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalDashboard = () => {
  const { hospital, logout } = useHospitalAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/hospital/login');
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch request stats
      const statsResponse = await hospitalRequestsAPI.getStats();
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      // Fetch recent requests
      const requestsResponse = await hospitalRequestsAPI.getAll({ limit: 5 });
      if (requestsResponse.data.success) {
        setRecentRequests(requestsResponse.data.data);
      }

      // Fetch hospital inventory
      const inventoryResponse = await hospitalRequestsAPI.getInventorySummary();
      if (inventoryResponse.data.success) {
        setInventory(inventoryResponse.data.data.inventory || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      fulfilled: 'bg-blue-100 text-blue-700 border-blue-200',
      cancelled: 'bg-zinc-100 text-zinc-700 border-zinc-200'
    };
    return colors[status] || colors.pending;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      routine: 'text-zinc-600',
      urgent: 'text-amber-600',
      emergency: 'text-red-600'
    };
    return colors[urgency] || colors.routine;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">{hospital?.Hosp_Name}</h1>
                <p className="text-blue-100">Hospital Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/hospital/chat" 
                className="relative p-2 hover:bg-blue-500/30 rounded-lg transition-colors"
                title="Chat with Admin"
              >
                <MessageSquare className="h-6 w-6" />
                {/* Unread badge will be added later */}
              </Link>
              <Link 
                to="/hospital/requests" 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <Package className="h-5 w-5" />
                <span>My Requests</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2 text-white"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Total Requests</p>
                <p className="text-3xl font-bold text-zinc-900 mt-1">{stats?.totalRequests || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{stats?.pendingRequests || 0}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Fulfilled</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{stats?.fulfilledRequests || 0}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600">Fulfillment Rate</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats?.fulfillmentRate || 0}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
              <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">Recent Requests</h2>
                <Link 
                  to="/hospital/requests" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="divide-y divide-zinc-200">
                {recentRequests.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-zinc-500">No requests yet</p>
                    <Link 
                      to="/hospital/requests/new" 
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Create Request
                    </Link>
                  </div>
                ) : (
                  recentRequests.map((request) => (
                    <div key={request._id} className="px-6 py-4 hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <Droplets className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900">{request.bloodGroup}</p>
                            <p className="text-sm text-zinc-600">{request.quantity} units</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                        </span>
                        <span className="text-zinc-500">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </span>
                      </div>
                      {request.reason && (
                        <p className="text-sm text-zinc-600 mt-2 line-clamp-1">{request.reason}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Blood Inventory */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
              <div className="px-6 py-4 border-b border-zinc-200">
                <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Blood Inventory
                </h2>
                <p className="text-sm text-zinc-600 mt-1">Currently available</p>
              </div>
              
              <div className="p-6">
                {inventory.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-zinc-500">No inventory received yet</p>
                    <p className="text-sm text-zinc-400 mt-1">Request blood to build your inventory</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {inventory.map((item) => (
                      <div 
                        key={item.bloodGroup} 
                        className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg font-bold text-red-600">{item.bloodGroup}</span>
                          <Droplets className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-sm text-zinc-600">{item.quantity} units</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Need Help?
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact admin for urgent blood requests or queries
              </p>
              <Link 
                to="/hospital/chat" 
                className="block w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
              >
                Open Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
