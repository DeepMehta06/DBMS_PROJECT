import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { bloodSpecimensAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/ui/StatusBadge';

const InventoryPage = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    specimenNumber: '',
    bloodGroup: '',
    collectionDate: '',
    expiryDate: '',
    status: 'available'
  });

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (statusFilter) params.status = statusFilter;
      
      const response = await bloodSpecimensAPI.getAll(params);
      
      if (response.data.success) {
        setInventory(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch inventory');
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blood specimen?')) {
      return;
    }

    try {
      await bloodSpecimensAPI.delete(id);
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete specimen');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await bloodSpecimensAPI.update(id, { status: newStatus });
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleAddClick = () => {
    // Generate auto specimen number
    const timestamp = Date.now();
    const specimenNumber = `SP-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
    
    setFormData({
      specimenNumber,
      bloodGroup: '',
      collectionDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      status: 'available'
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await bloodSpecimensAPI.create(formData);
      setShowModal(false);
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add blood specimen');
    }
  };

  const columns = [
    { 
      header: 'ID', 
      accessor: 'id',
      render: (row) => row._id?.slice(-6) || 'N/A'
    },
    { header: 'Blood Group', accessor: 'bloodGroup' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    { 
      header: 'Collection Date', 
      accessor: 'collectionDate',
      render: (row) => new Date(row.collectionDate).toLocaleDateString()
    },
    { 
      header: 'Expiry Date', 
      accessor: 'expiryDate',
      render: (row) => new Date(row.expiryDate).toLocaleDateString()
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          {row.status === 'available' && (
            <select
              onChange={(e) => handleStatusChange(row._id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>Change Status</option>
              <option value="reserved">Mark Reserved</option>
              <option value="used">Mark Used</option>
              <option value="contaminated">Mark Contaminated</option>
            </select>
          )}
          {user?.role === 'manager' && (
            <button 
              onClick={() => handleDelete(row._id)}
              className="text-red-600 hover:text-red-800 font-medium text-xs"
            >
              Delete
            </button>
          )}
        </div>
      )
    }
  ];

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.bloodGroup?.toLowerCase().includes(searchLower) ||
      item._id?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Blood Inventory</h3>
          <p className="text-gray-600">Manage and track blood specimen inventory</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          + Add Blood Unit
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchInventory}
            className="mt-2 text-sm underline"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by ID or Blood Group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="used">Used</option>
            <option value="contaminated">Contaminated</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredInventory} />
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <p>Showing {filteredInventory.length} of {inventory.length} entries</p>
      </div>

      {/* Modal for Add Blood Unit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Blood Unit</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specimen Number *
                </label>
                <input
                  type="text"
                  name="specimenNumber"
                  value={formData.specimenNumber}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Date *
                </label>
                <input
                  type="date"
                  name="collectionDate"
                  value={formData.collectionDate}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Add Blood Unit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
