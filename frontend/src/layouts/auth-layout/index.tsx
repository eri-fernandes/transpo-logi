import Header from '@/components/header';
import { Navigate, Outlet } from 'react-router';

export function AuthLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
