// src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
