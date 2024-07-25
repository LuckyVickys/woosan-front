import React from 'react';
import { Navigate, useLocation,  } from 'react-router-dom';
import useCustomLogin from '../hooks/useCustomLogin';

const AccessRoute = ({ children, allowedRoles }) => {
  const { isLogin, loginState } = useCustomLogin();
  const location = useLocation();

const fromPath = location.state?.from || '/'; 
console.log(fromPath);
  if (!isLogin) {
    return <Navigate to={fromPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(loginState.memberType)) {
    return <Navigate to={fromPath} replace />;
  }

  return children;
};

// const fromPath = location.state || location.pathname; 

// useEffect(() => {
//   if (location.pathname === '/matching' && 
//           (fromPath.startsWith('/cs/') || fromPath.startsWith('/board/') || fromPath.startsWith('/mypage/'))) {
//         window.location.reload();
//       } else if (location.pathname === '/mypage' && 
//       (fromPath.startsWith('/cs/') || fromPath.startsWith('/board/') || fromPath.startsWith('/mypage/'))) {
//     window.location.reload();
//   }
// }, [location.pathname, fromPath]);

// console.log(fromPath);

//   if (!isLogin) {
//     return <Navigate to={fromPath} replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(loginState.memberType)) {
//     return <Navigate to={fromPath} replace />;
//   }

//   return children;
// };

export default AccessRoute;