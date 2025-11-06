import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHospitalAuth } from '../context/HospitalAuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, LogIn, Loader2, Droplets, Building2, Shield } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: adminLogin, isLoggedIn } = useAuth();
  const { login: hospitalLogin, isHospitalLoggedIn } = useHospitalAuth();
  const { success, error: showError, warning } = useToast();
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'hospital'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
    if (isHospitalLoggedIn) {
      navigate('/hospital/dashboard');
    }
  }, [isLoggedIn, isHospitalLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginType === 'admin') {
        // Admin login
        const result = await adminLogin(formData.email, formData.password);
        
        if (result.success) {
          success('Login successful', 'Welcome back to Blood Bank Management System');
          navigate('/dashboard');
        } else {
          setError(result.error || 'Login failed. Please try again.');
          showError('Login failed', result.error || 'Invalid email or password');
        }
      } else {
        // Hospital login
        const result = await hospitalLogin(formData);
        
        if (result.success) {
          success('Login successful', 'Welcome to Hospital Portal');
          setTimeout(() => {
            navigate('/hospital/dashboard');
          }, 500);
        } else {
          setError(result.message || 'Login failed. Please try again.');
          if (result.message && result.message.includes('not approved')) {
            warning('Account pending approval', 'Your hospital account is awaiting admin approval');
          } else {
            showError('Login failed', result.message || 'Invalid email or password');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      showError('Login error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const switchLoginType = (type) => {
    setLoginType(type);
    setError('');
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-zinc-200 overflow-hidden min-h-[600px] flex flex-col">
        {/* Header Section */}
        <div className={`bg-gradient-to-r ${loginType === 'admin' ? 'from-blue-600 to-blue-700' : 'from-emerald-600 to-emerald-700'} px-8 py-10 text-center transition-all duration-300`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            {loginType === 'admin' ? (
              <Shield className="h-8 w-8 text-white" />
            ) : (
              <Building2 className="h-8 w-8 text-white" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Blood Bank MS</h1>
          <p className="text-white/90">
            {loginType === 'admin' ? 'Admin Portal' : 'Hospital Portal'}
          </p>
        </div>

        {/* Login Type Tabs */}
        <div className="flex border-b border-zinc-200">
          <button
            type="button"
            onClick={() => switchLoginType('admin')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              loginType === 'admin'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 flex-shrink-0" />
              <span>Admin</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => switchLoginType('hospital')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              loginType === 'hospital'
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span>Hospital</span>
            </div>
          </button>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">{error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-colors"
                  placeholder={loginType === 'admin' ? 'admin@bloodbank.com' : 'hospital@example.com'}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-colors"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors"
                  disabled={loading}
                />
                <span className="ml-2 text-zinc-700">Remember me</span>
              </label>
              <button 
                type="button" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loginType === 'admin' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'} text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-200 text-center">
            <p className="text-sm text-zinc-600">
              {loginType === 'admin' ? (
                <>Need to register? <span className="text-blue-600 font-medium">Contact your system administrator</span></>
              ) : (
                <>Need hospital registration? <span className="text-emerald-600 font-medium">Contact admin to create your account</span></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
