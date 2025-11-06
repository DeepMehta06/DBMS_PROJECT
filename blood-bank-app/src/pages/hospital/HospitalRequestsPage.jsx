import React, { useState, useEffect } from 'react';
import { useHospitalAuth } from '../../context/HospitalAuthContext';
import { useToast } from '../../context/ToastContext';
import { hospitalRequestsAPI } from '../../services/api';
import { 
  Plus, 
  Droplets, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Loader2,
  X,
  Calendar,
  User,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalRequestsPage = () => {
  const { hospital, logout } = useHospitalAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [formData, setFormData] = useState({
    bloodGroup: '',
    quantity: '',
    urgency: 'routine',
    reason: '',
    patientDetails: '',
    requiredBy: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/hospital/login');
  };

  useEffect(() => {
    fetchRequests();
  }, [selectedStatus]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = selectedStatus ? { status: selectedStatus } : {};
      const response = await hospitalRequestsAPI.getAll(params);
      
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await hospitalRequestsAPI.create(formData);
      
      if (response.data.success) {
        success('Request created successfully', `Your ${formData.bloodGroup} blood request has been submitted`);
        setShowModal(false);
        setFormData({
          bloodGroup: '',
          quantity: '',
          urgency: 'routine',
          reason: '',
          patientDetails: '',
          requiredBy: ''
        });
        fetchRequests();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
      showError('Failed to create request', err.response?.data?.message || 'Please try again later');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) return;

    try {
      await hospitalRequestsAPI.cancel(id);
      success('Request cancelled', 'Your blood request has been cancelled');
      fetchRequests();
    } catch (err) {
      showError('Failed to cancel request', err.response?.data?.message || 'Please try again later');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'fulfilled':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-zinc-600" />;
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

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'urgent':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                to="/hospital/dashboard"
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-600" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">Blood Requests</h1>
                <p className="text-sm sm:text-base text-zinc-600 mt-1 hidden sm:block">Manage your blood requests</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">New Request</span>
                <span className="sm:hidden">New</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                title="Logout"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4 sm:mt-6 flex-wrap">
            {['', 'pending', 'approved', 'fulfilled', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-400'
                }`}
              >
                {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-12 text-center">
            <FileText className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">No requests found</h3>
            <p className="text-zinc-600 mb-6">Create your first blood request to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-5 w-5" />
              Create Request
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-sm border border-zinc-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4 flex-col sm:flex-row gap-3">
                  <div className="flex items-start gap-3 sm:gap-4 w-full">
                    <div className="p-2 sm:p-3 bg-red-100 rounded-lg flex-shrink-0">
                      <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-900">{request.bloodGroup}</h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        {request.urgency !== 'routine' && (
                          <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            request.urgency === 'emergency' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {getUrgencyIcon(request.urgency)}
                            {request.urgency}
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-zinc-600">{request.quantity} units requested</p>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-auto whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  {request.requiredBy && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Needed by: {new Date(request.requiredBy).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-700 mb-1">Reason:</p>
                    <p className="text-xs sm:text-sm text-zinc-600 break-words">{request.reason}</p>
                  </div>

                  {request.patientDetails && (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-zinc-700 mb-1">Patient Details:</p>
                      <p className="text-xs sm:text-sm text-zinc-600 break-words">{request.patientDetails}</p>
                    </div>
                  )}

                  {request.adminNotes && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs sm:text-sm font-medium text-blue-900 mb-1">Admin Note:</p>
                      <p className="text-xs sm:text-sm text-blue-700 break-words">{request.adminNotes}</p>
                    </div>
                  )}

                  {request.respondedByName && (
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <User className="h-4 w-4" />
                      <span>Handled by: {request.respondedByName}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-xl border border-zinc-200 my-8">
            <div className="px-4 sm:px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">Create Blood Request</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Blood Group *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Quantity (units) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Urgency *
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Required By
                  </label>
                  <input
                    type="date"
                    value={formData.requiredBy}
                    onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Reason for blood request..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Patient Details (Optional)
                </label>
                <textarea
                  value={formData.patientDetails}
                  onChange={(e) => setFormData({ ...formData, patientDetails: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Patient information..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalRequestsPage;
