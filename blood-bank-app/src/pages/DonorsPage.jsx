import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { donorsAPI, citiesAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';

const DonorsPage = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [formData, setFormData] = useState({
    Bd_Name: '',
    Bd_Phone: '',
    Bd_Bgroup: '',
    City_Id: '',
    Bd_Age: '',
    Bd_Sex: ''
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
    fetchCities();
    fetchDonors();
  }, [fetchCities, fetchDonors]);

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
      Bd_Name: '',
      Bd_Phone: '',
      Bd_Bgroup: '',
      City_Id: '',
      Bd_Age: '',
      Bd_Sex: ''
    });
    setShowModal(true);
  };

  const handleEditClick = (donor) => {
    setEditingDonor(donor);
    setFormData({
      Bd_Name: donor.Bd_Name || donor.name || '',
      Bd_Phone: donor.Bd_Phone || donor.phone || '',
      Bd_Bgroup: donor.Bd_Bgroup || donor.bloodGroup || '',
      City_Id: donor.City_Id || '',
      Bd_Age: donor.Bd_Age || donor.age || '',
      Bd_Sex: donor.Bd_Sex || (donor.sex === 'Male' ? 'M' : donor.sex === 'Female' ? 'F' : '') || ''
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
    { header: 'ID', accessor: 'Bd_Id', render: (row) => row.Bd_Id || row._id?.slice(-6) || 'N/A' },
    { header: 'Name', accessor: 'Bd_Name', render: (row) => row.Bd_Name || row.name || 'N/A' },
    { header: 'Blood Group', accessor: 'Bd_Bgroup', render: (row) => row.Bd_Bgroup || row.bloodGroup || 'N/A' },
    { header: 'Phone', accessor: 'Bd_Phone', render: (row) => row.Bd_Phone || row.phone || 'N/A' },
    { header: 'Age', accessor: 'Bd_Age', render: (row) => row.Bd_Age || row.age || 'N/A' },
    { header: 'Sex', accessor: 'Bd_Sex', render: (row) => row.Bd_Sex || row.sex || 'N/A' },
    { 
      header: 'City', 
      accessor: 'City_Id',
      render: (row) => {
        if (row.City_Id) {
          const city = cities.find(c => c.City_Id === row.City_Id);
          return city?.City_Name || `City ID: ${row.City_Id}`;
        }
        return row.city || 'N/A';
      }
    },
    { 
      header: 'Registration Date', 
      accessor: 'Bd_reg_Date',
      render: (row) => new Date(row.Bd_reg_Date || row.registrationDate || row.createdAt).toLocaleDateString()
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
    const donorName = (donor.Bd_Name || donor.name || '').toLowerCase();
    const donorBloodGroup = (donor.Bd_Bgroup || donor.bloodGroup || '').toLowerCase();
    const donorCity = donor.City_Id 
      ? (cities.find(c => c.City_Id === donor.City_Id)?.City_Name || '').toLowerCase()
      : (donor.city || '').toLowerCase();
    
    return (
      donorName.includes(searchLower) ||
      donorBloodGroup.includes(searchLower) ||
      donorCity.includes(searchLower)
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
                    name="Bd_Name"
                    value={formData.Bd_Name}
                    onChange={handleFormChange}
                    required
                    maxLength="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="Bd_Phone"
                    value={formData.Bd_Phone}
                    onChange={handleFormChange}
                    required
                    maxLength="15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    name="Bd_Bgroup"
                    value={formData.Bd_Bgroup}
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
                    {cities.map((city) => (
                      <option key={city._id} value={city.City_Id}>
                        {city.City_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="Bd_Age"
                    value={formData.Bd_Age}
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
                    name="Bd_Sex"
                    value={formData.Bd_Sex}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Sex</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
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
