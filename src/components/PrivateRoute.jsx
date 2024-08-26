import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
