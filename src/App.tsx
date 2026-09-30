import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { WelcomePage } from './components/auth/WelcomePage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { GuestPortalView } from './components/guest/GuestPortalView';
import { AdminLayout } from './components/admin/AdminLayout';
import { ResidentLayout } from './components/resident/ResidentLayout';

const MainContent: React.FC = () => {
  const { role, authView } = useApp();

  // 1. Unauthenticated / Guest View Flow
  if (role === 'guest') {
    if (authView === 'login') {
      return <LoginPage />;
    }
    if (authView === 'register') {
      return <RegisterPage />;
    }
    if (authView === 'guest') {
      return <GuestPortalView />;
    }
    return <WelcomePage />;
  }

  // 2. Admin Operations Portal (Strictly Admin Operations)
  if (role === 'admin') {
    return <AdminLayout />;
  }

  // 3. Resident Operations Portal (Strictly Resident Operations)
  return <ResidentLayout />;
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
