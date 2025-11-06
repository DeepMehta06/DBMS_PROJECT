import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { hospitalsAPI, citiesAPI } from '../services/api';
import DataTable from '../components/shared/DataTable';
import { Plus, Edit, Trash2, Loader2, Search, X } from 'lucide-react';


const HospitalsPage = () => {
  const { user } = useAuth();
  const { success, error: showError, warning } = useToast();
  const [hospitals, setHospitals] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [formData, setFormData] = useState({
    Hosp_Name: '',
    Hosp_Phone: '',
    Hosp_Needed_Bgrp: '',
    City_Id: '',
    email: '',
    password: '',
    isApproved: true // Auto-approve when admin creates
  });

  // Fetch cities from API
  const fetchCities = useCallback(async () => {
    try {
      const response = await citiesAPI.getAll();
      if (response.data.success) {
        setCities(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  }, []);

  // Fetch hospitals from API
  const fetchHospitals = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate network delay
      await new Promise(res => setTimeout(res, 500));
      
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
    fetchCities();
    fetchHospitals();
  }, [fetchCities, fetchHospitals]);

  const handleDelete = async (id) => {
    if (user?.role !== 'manager') {
      warning('Permission denied', 'Only managers can delete hospitals');
      return;
    }

    // Removed window.confirm as it is not supported
    // Add a custom modal confirmation here for production

    try {
      await hospitalsAPI.delete(id);
      success('Hospital deleted', 'Hospital has been removed from the system');
      fetchHospitals();
    } catch (err) {
      showError('Failed to delete hospital', err.response?.data?.message || 'Please try again later');
    }
  };

  const handleAddClick = () => {
    if (user?.role !== 'manager') {
      warning('Permission denied', 'Only managers can add hospitals');
      return;
    }

    setEditingHospital(null);
    setFormData({
      Hosp_Name: '',
      Hosp_Phone: '',
      Hosp_Needed_Bgrp: '',
      City_Id: '',
      email: '',
      password: '',
      isApproved: true
    });
    setShowModal(true);
  };

  // Helper function to get City_Id by city name (for backward compatibility)
  const getCityIdByName = (cityName) => {
    if (!cityName) return '';
    const city = cities.find(c => c.City_Name?.toLowerCase() === cityName?.toLowerCase());
    return city ? city.City_Id : '';
  };

  // Helper function to get City_Name by City_Id
  const getCityName = (cityId) => {
    if (!cityId) return 'N/A';
    const city = cities.find(c => c.City_Id === cityId);
    return city ? city.City_Name : 'N/A';
  };

  const handleEditClick = (hospital) => {
    if (user?.role !== 'manager') {
      warning('Permission denied', 'Only managers can edit hospitals');
      return;
    }

    setEditingHospital(hospital);
    setFormData({
      Hosp_Name: hospital.Hosp_Name || hospital.name || '',
      Hosp_Phone: hospital.Hosp_Phone || hospital.phone || '',
      Hosp_Needed_Bgrp: hospital.Hosp_Needed_Bgrp || hospital.neededBloodGroup || '',
      City_Id: hospital.City_Id || getCityIdByName(hospital.city) || ''
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
        success('Hospital updated', `${formData.Hosp_Name}'s information has been updated successfully`);
      } else {
        await hospitalsAPI.create(formData);
        success('Hospital added', `${formData.Hosp_Name} has been added to the system with login credentials`);
      }
      
      setShowModal(false);
      fetchHospitals();
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to save hospital';
      showError(
        editingHospital ? 'Failed to update hospital' : 'Failed to add hospital',
        errorMsg
      );
    }
  };

  const columns = [
    { 
      header: 'ID', 
      accessor: 'Hosp_Id', 
      render: (row) => row.Hosp_Id || row._id?.slice(-6) || 'N/A' 
    },
    { 
      header: 'Hospital Name', 
      accessor: 'Hosp_Name',
      render: (row) => row.Hosp_Name || row.name || 'N/A'
    },
    { 
      header: 'Phone', 
      accessor: 'Hosp_Phone',
      render: (row) => row.Hosp_Phone || row.phone || 'N/A'
    },
    { 
      header: 'Needed Blood Group', 
      accessor: 'Hosp_Needed_Bgrp',
      render: (row) => row.Hosp_Needed_Bgrp || row.neededBloodGroup || 'N/A'
    },
    { 
      header: 'City', 
      accessor: 'City_Id',
      render: (row) => getCityName(row.City_Id) || row.city || 'N/A'
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          {user?.role === 'manager' && (
            <>
              <button 
                onClick={() => handleEditClick(row)}
                className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors"
                title="Edit hospital"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(row._id)}
                className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-colors"
                title="Delete hospital"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
          {user?.role !== 'manager' && (
            <span className="text-zinc-400 text-xs">Manager Only</span>
          )}
        </div>
      )
    }
  ];

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (hospital.Hosp_Name || hospital.name)?.toLowerCase().includes(searchLower) ||
      (hospital.Hosp_Phone || hospital.phone)?.toLowerCase().includes(searchLower) ||
      (hospital.Hosp_Needed_Bgrp || hospital.neededBloodGroup)?.toLowerCase().includes(searchLower) ||
      getCityName(hospital.City_Id)?.toLowerCase().includes(searchLower) ||
      hospital.city?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-zinc-600">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-zinc-900 mb-1">Hospital Network</h3>
          <p className="text-zinc-600">Manage partner hospitals and blood distribution</p>
        </div>
        {user?.role === 'manager' ? (
          <button 
            onClick={handleAddClick}
            // FIXED: Combined className and placed icon inside
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 shadow-sm duration-150 flex items-center gap-2 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add New Hospital
          </button>
        ) : (
          <div className="text-sm text-zinc-500 bg-gray-100 px-4 py-2 rounded-lg">
            Manager Access Required
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchHospitals}
            className="mt-2 text-sm underline font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-zinc-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, city, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredHospitals} />
      
      <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
        <p>Showing {filteredHospitals.length} of {hospitals.length} hospitals</p>
      </div>

      {/* Modal for Add/Edit Hospital */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-zinc-200 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-semibold text-zinc-900">
                {editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 overflow-y-auto">
              <form onSubmit={handleFormSubmit} id="hospital-form" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="Hosp_Name"
                    value={formData.Hosp_Name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="Hosp_Phone"
                    value={formData.Hosp_Phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Needed Blood Group *
                  </label>
                  <select
                    name="Hosp_Needed_Bgrp"
                    value={formData.Hosp_Needed_Bgrp}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    City *
                  </label>
                  <select
                    name="City_Id"
                    value={formData.City_Id}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city._id} value={city.City_Id}>
                        {city.City_Name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* NEW: Hospital Portal Login Credentials */}
                {!editingHospital && (
                  <>
                    <div className="col-span-2 mt-4 pt-4 border-t border-zinc-200">
                      <h3 className="text-sm font-semibold text-zinc-900 mb-3">Hospital Portal Access</h3>
                      <p className="text-xs text-zinc-600 mb-3">Provide login credentials for the hospital to access their portal</p>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required={!editingHospital}
                        placeholder="hospital@example.com"
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        required={!editingHospital}
                        minLength="6"
                        placeholder="Minimum 6 characters"
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-zinc-500 mt-1">Hospital will use this to login at /hospital/login</p>
                    </div>
                  </>
                )}
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex gap-3 justify-end flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white text-zinc-700 font-medium rounded-lg shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="hospital-form"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150"
              >
                {editingHospital ? 'Update Hospital' : 'Add Hospital'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalsPage;

