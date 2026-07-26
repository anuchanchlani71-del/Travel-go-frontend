import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoutesComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/admin';

  useEffect(() => {
    // Add or remove classes to the body element based on the current route
    if (isLoginPage) {
      document.body.classList.add('hold-transition', 'login-page');
      document.body.classList.remove('sidebar-mini');
      const adminToken = localStorage.getItem('adminToken');
      adminToken ?  navigate('/admin/dashboard', { replace: true }) :  navigate('/admin', { replace: true });
    } else {
      document.body.classList.remove('login-page');
      document.body.classList.add('hold-transition', 'sidebar-mini');
    }
    // Clean up classes when the component unmounts
    return () => {
      document.body.classList.remove('hold-transition', 'login-page', 'sidebar-mini');
    };
  }, [isLoginPage, navigate]);

  return null;
};

export default RoutesComponent;
