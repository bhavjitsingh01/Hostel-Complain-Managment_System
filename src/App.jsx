import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ComplaintsProvider } from './context/ComplaintsContext';
import { AnnouncementsProvider } from './context/AnnouncementsContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/landing/LandingPage';
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { StudentDashboardPage } from './pages/student/DashboardPage';
import { StudentComplaintsPage } from './pages/student/ComplaintsPage';
import { NewComplaintPage } from './pages/student/NewComplaintPage';
import { StudentComplaintDetailsPage } from './pages/student/ComplaintDetailsPage';
import { StudentAnnouncementsPage } from './pages/student/AnnouncementsPage';
import { StudentProfilePage } from './pages/student/ProfilePage';
import { WardenDashboardPage } from './pages/warden/DashboardPage';
import { WardenComplaintsPage } from './pages/warden/ComplaintsPage';
import { WardenComplaintDetailsPage } from './pages/warden/ComplaintDetailsPage';
import { WardenStudentsPage } from './pages/warden/StudentsPage';
import { WardenAnnouncementsPage } from './pages/warden/AnnouncementsPage';
import { WardenMaintenancePage } from './pages/warden/MaintenancePage';
import { WardenProfilePage } from './pages/warden/ProfilePage';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/role-selection/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'student' ? '/student/dashboard' : '/warden/dashboard'} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/role-selection/signin" element={<RoleSelectionPage mode="signin" />} />
      <Route path="/role-selection/signup" element={<RoleSelectionPage mode="signup" />} />
      
      <Route path="/student/login" element={<LoginPage role="student" />} />
      <Route path="/student/signup" element={<SignupPage role="student" />} />
      <Route path="/warden/login" element={<LoginPage role="warden" />} />
      <Route path="/warden/signup" element={<SignupPage role="warden" />} />
      
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Routes>
              <Route path="dashboard" element={<StudentDashboardPage />} />
              <Route path="complaints" element={<StudentComplaintsPage />} />
              <Route path="complaints/new" element={<NewComplaintPage />} />
              <Route path="complaints/:id" element={<StudentComplaintDetailsPage />} />
              <Route path="announcements" element={<StudentAnnouncementsPage />} />
              <Route path="profile" element={<StudentProfilePage />} />
              <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/warden/*"
        element={
          <ProtectedRoute allowedRoles={['warden']}>
            <Routes>
              <Route path="dashboard" element={<WardenDashboardPage />} />
              <Route path="complaints" element={<WardenComplaintsPage />} />
              <Route path="complaints/:id" element={<WardenComplaintDetailsPage />} />
              <Route path="students" element={<WardenStudentsPage />} />
              <Route path="announcements" element={<WardenAnnouncementsPage />} />
              <Route path="maintenance" element={<WardenMaintenancePage />} />
              <Route path="profile" element={<WardenProfilePage />} />
              <Route path="*" element={<Navigate to="/warden/dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ComplaintsProvider>
            <AnnouncementsProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </AnnouncementsProvider>
          </ComplaintsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;