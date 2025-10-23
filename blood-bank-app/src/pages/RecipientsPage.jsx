import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { recipientsAPI, citiesAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/ui/StatusBadge';

const RecipientsPage = () => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState(null);
  const [formData, setFormData] = useState({
    Reci_Name: '',
    Reci_Phone: '',
    Reci_Bgrp: '',
    Reci_Bqty: 1,
    Reci_Age: '',
    Reci_Sex: 'M',
    City_Id: '',
    status: 'pending'
  });

  // Fetch cities from API
  const fetchCities = useCallback(async () => {
    try {
      const response = await citiesAPI.getAll();
      if (response.data.success) {
        setCities(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  }, []);

  // Fetch recipients from API
  const fetchRecipients = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (statusFilter) params.status = statusFilter;
      
      const response = await recipientsAPI.getAll(params);
      
      if (response.data.success) {
        setRecipients(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recipients');
      console.error('Error fetching recipients:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchCities();
    fetchRecipients();
  }, [fetchCities, fetchRecipients]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipient?')) {
      return;
    }

    try {
      await recipientsAPI.delete(id);
      fetchRecipients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete recipient');
    }
  };

  const handleAddClick = () => {
    setEditingRecipient(null);
    setFormData({
      Reci_Name: '',
      Reci_Phone: '',
      Reci_Bgrp: '',
      Reci_Bqty: 1,
      Reci_Age: '',
      Reci_Sex: 'M',
      City_Id: '',
      status: 'pending'
    });
    setShowModal(true);
  };

  const handleEditClick = (recipient) => {
    setEditingRecipient(recipient);
    setFormData({
      Reci_Name: recipient.Reci_Name || recipient.name || '',
      Reci_Phone: recipient.Reci_Phone || recipient.phone || '',
      Reci_Bgrp: recipient.Reci_Bgrp || recipient.bloodGroup || '',
      Reci_Bqty: recipient.Reci_Bqty || recipient.bloodQuantity || 1,
      Reci_Age: recipient.Reci_Age || recipient.age || '',
      Reci_Sex: recipient.Reci_Sex || (recipient.sex === 'Male' ? 'M' : recipient.sex === 'Female' ? 'F' : '') || 'M',
      City_Id: recipient.City_Id || '',
      status: recipient.status || 'pending'
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
      if (editingRecipient) {
        await recipientsAPI.update(editingRecipient._id, formData);
      } else {
        await recipientsAPI.create(formData);
      }
      
      setShowModal(false);
      fetchRecipients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save recipient');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await recipientsAPI.update(id, { status: newStatus });
      fetchRecipients();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'Reci_Id', render: (row) => row.Reci_Id || row._id?.slice(-6) || 'N/A' },
    { header: 'Name', accessor: 'Reci_Name', render: (row) => row.Reci_Name || row.name || 'N/A' },
    { header: 'Blood Group', accessor: 'Reci_Bgrp', render: (row) => row.Reci_Bgrp || row.bloodGroup || 'N/A' },
    { header: 'Phone', accessor: 'Reci_Phone', render: (row) => row.Reci_Phone || row.phone || 'N/A' },
    { 
      header: 'Quantity (Units)', 
      accessor: 'Reci_Bqty',
      render: (row) => row.Reci_Bqty || row.bloodQuantity || 1
    },
    {
      header: 'Age',
      accessor: 'Reci_Age',
      render: (row) => row.Reci_Age || row.age || 'N/A'
    },
    {
      header: 'Sex',
      accessor: 'Reci_Sex',
      render: (row) => row.Reci_Sex || row.sex || 'N/A'
    },
    { 
      header: 'City', 
      accessor: 'City_Id',
      render: (row) => {
        if (row.City_Id) {
          const city = cities.find(c => c.City_Id === row.City_Id);
          return city?.City_Name || `City ID: ${row.City_Id}`;
        }
        return 'N/A';
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
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
          {row.status === 'pending' && (
            <select
              onChange={(e) => handleStatusChange(row._id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>Change Status</option>
              <option value="approved">Approve</option>
              <option value="fulfilled">Fulfill</option>
              <option value="rejected">Reject</option>
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

  // Filter recipients based on search term
  const filteredRecipients = recipients.filter(recipient => {
    const searchLower = searchTerm.toLowerCase();
    const recipientName = (recipient.Reci_Name || recipient.name || '').toLowerCase();
    const recipientBloodGroup = (recipient.Reci_Bgrp || recipient.bloodGroup || '').toLowerCase();
    const recipientPhone = (recipient.Reci_Phone || recipient.phone || '').toLowerCase();
    
    return (
      recipientName.includes(searchLower) ||
      recipientBloodGroup.includes(searchLower) ||
      recipientPhone.includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipients...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Blood Recipients</h3>
          <p className="text-gray-600">Manage blood recipients and their requests</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          + Add New Recipient
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchRecipients}
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
            placeholder="Search by name, blood group, or phone..."
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredRecipients} />
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <p>Showing {filteredRecipients.length} of {recipients.length} recipients</p>
      </div>

      {/* Modal for Add/Edit Recipient */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingRecipient ? 'Edit Recipient' : 'Add New Recipient'}
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
                    name="Reci_Name"
                    value={formData.Reci_Name}
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
                    name="Reci_Phone"
                    value={formData.Reci_Phone}
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
                    name="Reci_Bgrp"
                    value={formData.Reci_Bgrp}
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
                    Blood Quantity (Units) *
                  </label>
                  <input
                    type="number"
                    name="Reci_Bqty"
                    value={formData.Reci_Bqty}
                    onChange={handleFormChange}
                    required
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="Reci_Age"
                    value={formData.Reci_Age}
                    onChange={handleFormChange}
                    required
                    min="0"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sex *
                  </label>
                  <select
                    name="Reci_Sex"
                    value={formData.Reci_Sex}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Sex</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <select
                    name="City_Id"
                    value={formData.City_Id}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city._id} value={city.City_Id}>
                        {city.City_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {editingRecipient ? 'Update Recipient' : 'Add Recipient'}
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

export default RecipientsPage;
