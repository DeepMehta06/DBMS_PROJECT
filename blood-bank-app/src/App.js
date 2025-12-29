import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalAuthProvider } from './context/HospitalAuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import DonorsPage from './pages/DonorsPage';
import RecipientsPage from './pages/RecipientsPage';
import HospitalsPage from './pages/HospitalsPage';

// Hospital Portal Pages
import HospitalLoginPage from './pages/hospital/HospitalLoginPage';
import HospitalRegisterPage from './pages/hospital/HospitalRegisterPage';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalRequestsPage from './pages/hospital/HospitalRequestsPage';
import HospitalChatPage from './pages/hospital/HospitalChatPage';

// Admin Pages
import AdminChatPage from './pages/AdminChatPage';
import AdminRequestsPage from './pages/AdminRequestsPage';

// Logout component
const Logout = () => {
  const { logout } = useAuth();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <HospitalAuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Landing Page - Public */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Login Route - No Layout */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Hospital Portal Routes */}
              <Route path="/hospital/login" element={<HospitalLoginPage />} />
              <Route path="/hospital/register" element={<HospitalRegisterPage />} />
              <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
              <Route path="/hospital/requests" element={<HospitalRequestsPage />} />
              <Route path="/hospital/chat" element={<HospitalChatPage />} />
              
              {/* Logout Route - Clears session and redirects to login */}
              <Route path="/logout" element={<Logout />} />
              
              {/* Protected Routes - With Layout */}
              <Route 
                path="/app" 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="donors" element={<DonorsPage />} />
                <Route path="recipients" element={<RecipientsPage />} />
                <Route path="hospitals" element={<HospitalsPage />} />
                <Route path="chat" element={<AdminChatPage />} />
                <Route path="requests" element={<AdminRequestsPage />} />
              </Route>
              
              {/* Redirect old routes to new /app prefix */}
              <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
              <Route path="/inventory" element={<Navigate to="/app/inventory" replace />} />
              <Route path="/donors" element={<Navigate to="/app/donors" replace />} />
              <Route path="/recipients" element={<Navigate to="/app/recipients" replace />} />
              <Route path="/hospitals" element={<Navigate to="/app/hospitals" replace />} />
              <Route path="/chat" element={<Navigate to="/app/chat" replace />} />
              <Route path="/requests" element={<Navigate to="/app/requests" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </HospitalAuthProvider>
    </AuthProvider>
  );
}

export default App;
