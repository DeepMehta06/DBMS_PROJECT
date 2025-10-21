import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { donorsAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';

const DonorsPage = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    city: '',
    address: '',
    age: '',
    sex: ''
  });

  // Fetch donors from API
  const fetchDonors = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (bloodGroupFilter) params.bloodGroup = bloodGroupFilter;
      
      const response = await donorsAPI.getAll(params);
      
      if (response.data.success) {
        setDonors(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch donors');
      console.error('Error fetching donors:', err);
    } finally {
      setLoading(false);
    }
  }, [bloodGroupFilter]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) {
      return;
    }

    try {
      await donorsAPI.delete(id);
      // Refresh the list after deletion
      fetchDonors();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete donor');
    }
  };

  const handleAddClick = () => {
    setEditingDonor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      city: '',
      address: '',
      age: '',
      sex: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (donor) => {
    setEditingDonor(donor);
    setFormData({
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      bloodGroup: donor.bloodGroup,
      city: donor.city,
      address: donor.address || '',
      age: donor.age,
      sex: donor.sex
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
      if (editingDonor) {
        await donorsAPI.update(editingDonor._id, formData);
      } else {
        await donorsAPI.create(formData);
      }
      
      setShowModal(false);
      fetchDonors();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save donor');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id', render: (row) => row._id?.slice(-6) || 'N/A' },
    { header: 'Name', accessor: 'name' },
    { header: 'Blood Group', accessor: 'bloodGroup' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'City', accessor: 'city' },
    { 
      header: 'Registration Date', 
      accessor: 'registrationDate',
      render: (row) => new Date(row.registrationDate).toLocaleDateString()
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEditClick(row)}
            className="text-blue-600 hover:text-blue-800 font-medium text-xs"
          >
            Edit
          </button>
          <button className="text-green-600 hover:text-green-800 font-medium text-xs">
            Contact
          </button>
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

  // Filter donors based on search term
  const filteredDonors = donors.filter(donor => {
    const searchLower = searchTerm.toLowerCase();
    return (
      donor.name?.toLowerCase().includes(searchLower) ||
      donor.bloodGroup?.toLowerCase().includes(searchLower) ||
      donor.city?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Registered Donors</h3>
          <p className="text-gray-600">Manage donor information and contact details</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          + Add New Donor
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchDonors}
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
            placeholder="Search by name, blood group, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select 
            value={bloodGroupFilter}
            onChange={(e) => setBloodGroupFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Blood Groups</option>
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
      </div>

      <DataTable columns={columns} data={filteredDonors} />
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <p>Showing {filteredDonors.length} of {donors.length} donors</p>
      </div>

      {/* Modal for Add/Edit Donor */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingDonor ? 'Edit Donor' : 'Add New Donor'}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
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
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    required
                    min="18"
                    max="65"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sex *
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {editingDonor ? 'Update Donor' : 'Add Donor'}
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

export default DonorsPage;
