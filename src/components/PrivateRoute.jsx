import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken'); // 토큰 확인

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
