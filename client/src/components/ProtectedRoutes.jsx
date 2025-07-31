import { Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
