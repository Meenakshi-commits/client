import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Maintenance from './pages/Maintenance';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                />
                <Route
                  path="/rooms"
                  element={<ProtectedRoute><Rooms /></ProtectedRoute>}
                />
                <Route
                  path="/maintenance"
                  element={<ProtectedRoute><Maintenance /></ProtectedRoute>}
                />
                <Route
                  path="/billing"
                  element={<ProtectedRoute><Billing /></ProtectedRoute>}
                />
                <Route
                  path="/reports"
                  element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;