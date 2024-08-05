import React from 'react';
import { Navigate, useLocation,  } from 'react-router-dom';
import useCustomLogin from '../hooks/useCustomLogin';

const AccessRoute = ({ children, allowedRoles }) => {
  const { isLogin, loginState } = useCustomLogin();
  const location = useLocation();

const fromPath = location.state?.from || '/'; 
  if (!isLogin) {
    return <Navigate to={fromPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(loginState.memberType)) {
    return <Navigate to={fromPath} replace />;
  }

  return children;
};

export default AccessRoute;