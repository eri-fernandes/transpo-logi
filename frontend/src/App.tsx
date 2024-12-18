import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/login';
import { Dashboard } from '@/pages/dashboard';
import { AuthLayout } from '@/layouts/auth-layout';
import { Trucks } from './pages/trucks';
import { NotFound } from './pages/not-found';
import { Deliveries } from './pages/deliveries';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Área logada */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/deliveries" element={<Deliveries />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
