import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHospitalAuth } from '../../context/HospitalAuthContext';
import { useToast } from '../../context/ToastContext';
import { Building2, Mail, Lock, LogIn, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const HospitalLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useHospitalAuth();
  const { success, error: showError, warning } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const result = await login(formData);

    if (result.success) {
      setMessage('Login successful! Redirecting...');
      success('Login successful', 'Welcome to Hospital Portal');
      setTimeout(() => {
        navigate('/hospital/dashboard');
      }, 1000);
    } else {
      setError(result.message);
      if (result.message.includes('not approved')) {
        warning('Account pending approval', 'Your hospital account is awaiting admin approval');
      } else {
        showError('Login failed', result.message || 'Invalid email or password');
      }
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Hospital Portal</h1>
          <p className="text-zinc-600">Login to manage blood requests and communicate with BloodTrack</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Hospital Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="hospital@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-700">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600">
              Don't have an account?{' '}
              <Link
                to="/hospital/register"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Register your hospital
              </Link>
            </p>
          </div>

          {/* Admin Link */}
          <div className="mt-4 pt-4 border-t border-zinc-200 text-center">
            <Link
              to="/login"
              className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              ← Back to Admin Login
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Need help? Contact BloodTrack support
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalLoginPage;
