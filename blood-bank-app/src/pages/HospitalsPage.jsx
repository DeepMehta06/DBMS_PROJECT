import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { hospitalsAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';

const HospitalsPage = () => {
  const { user } = useAuth();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    type: 'general',
    capacity: ''
  });

  // Fetch hospitals from API
  const fetchHospitals = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await hospitalsAPI.getAll();
      
      if (response.data.success) {
        setHospitals(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hospitals');
      console.error('Error fetching hospitals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const handleDelete = async (id) => {
    if (user?.role !== 'manager') {
      alert('Only managers can delete hospitals');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this hospital?')) {
      return;
    }

    try {
      await hospitalsAPI.delete(id);
      fetchHospitals();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete hospital');
    }
  };

  const handleAddClick = () => {
    if (user?.role !== 'manager') {
      alert('Only managers can add hospitals');
      return;
    }

    setEditingHospital(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      type: 'general',
      capacity: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (hospital) => {
    if (user?.role !== 'manager') {
      alert('Only managers can edit hospitals');
      return;
    }

    setEditingHospital(hospital);
    setFormData({
      name: hospital.name,
      address: hospital.address,
      city: hospital.city,
      phone: hospital.phone,
      email: hospital.email,
      type: hospital.type || 'general',
      capacity: hospital.capacity || ''
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
      if (editingHospital) {
        await hospitalsAPI.update(editingHospital._id, formData);
      } else {
        await hospitalsAPI.create(formData);
      }
      
      setShowModal(false);
      fetchHospitals();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save hospital');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id', render: (row) => row._id?.slice(-6) || 'N/A' },
    { header: 'Hospital Name', accessor: 'name' },
    { header: 'City', accessor: 'city' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.type === 'specialized' ? 'bg-purple-100 text-purple-800' :
          row.type === 'emergency' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {row.type?.toUpperCase() || 'GENERAL'}
        </span>
      )
    },
    {
      header: 'Capacity',
      accessor: 'capacity',
      render: (row) => row.capacity || 'N/A'
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          {user?.role === 'manager' && (
            <>
              <button 
                onClick={() => handleEditClick(row)}
                className="text-blue-600 hover:text-blue-800 font-medium text-xs"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(row._id)}
                className="text-red-600 hover:text-red-800 font-medium text-xs"
              >
                Delete
              </button>
            </>
          )}
          {user?.role !== 'manager' && (
            <span className="text-gray-400 text-xs">Manager Only</span>
          )}
        </div>
      )
    }
  ];

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital => {
    const searchLower = searchTerm.toLowerCase();
    return (
      hospital.name?.toLowerCase().includes(searchLower) ||
      hospital.city?.toLowerCase().includes(searchLower) ||
      hospital.type?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Hospital Network</h3>
          <p className="text-gray-600">Manage partner hospitals and blood distribution</p>
        </div>
        {user?.role === 'manager' ? (
          <button 
            onClick={handleAddClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + Add New Hospital
          </button>
        ) : (
          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
            Manager Access Required
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchHospitals}
            className="mt-2 text-sm underline"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by name, city, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <DataTable columns={columns} data={filteredHospitals} />
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <p>Showing {filteredHospitals.length} of {hospitals.length} hospitals</p>
      </div>

      {/* Modal for Add/Edit Hospital */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="general">General</option>
                    <option value="specialized">Specialized</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {editingHospital ? 'Update Hospital' : 'Add Hospital'}
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

export default HospitalsPage;
