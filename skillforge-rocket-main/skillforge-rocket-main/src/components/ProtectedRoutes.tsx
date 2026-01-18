// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!api.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}