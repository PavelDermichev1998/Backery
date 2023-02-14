import React from 'react';
import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';
import JobRequestPage from './pages/JobRequestPage';
import ProfilePage from './pages/ProfilePage';
import Employees from './pages/Emloyees';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Logs from './pages/Logs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/candidates" element={<JobRequestPage />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
