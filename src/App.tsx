import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PageManagement from './components/admin/PageManagement';
import StaticPage from './components/StaticPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pages/:pageId"
            element={
              <ProtectedRoute>
                <PageManagement />
              </ProtectedRoute>
            }
          />
          {/* Static Pages Routes */}
          <Route path="/privacy-policy" element={<StaticPage />} />
          <Route path="/terms-conditions" element={<StaticPage />} />
          <Route path="/support" element={<StaticPage />} />
          {/* Generic static page route */}
          <Route path="/:slug" element={<StaticPage />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;