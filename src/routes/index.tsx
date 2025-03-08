import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Login from '@/pages/auth/login';
import Dashboard from '@/pages/dashboard';
import RoomManagement from '@/pages/room-management';
import StudentManagement from '@/pages/student-management';
import FeeManagement from '@/pages/fee-management';
import ComplaintManagement from '@/pages/complaint-management';
import AttendanceManagement from '@/pages/attendance-management';
import ClearanceManagement from '@/pages/clearance-management';
import Reports from '@/pages/reports';
import Settings from '@/pages/settings';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <PrivateRoute>
            <RoomManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/students"
        element={
          <PrivateRoute>
            <StudentManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/fees"
        element={
          <PrivateRoute>
            <FeeManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <PrivateRoute>
            <ComplaintManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <AttendanceManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/clearance"
        element={
          <PrivateRoute>
            <ClearanceManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}