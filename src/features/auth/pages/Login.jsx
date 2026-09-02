import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import authApi from '../api/authApi';
import tokenManager from '../../../services/auth/tokenManager';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenManager.isAuthenticated()) {
      const hasHeroData = localStorage.getItem('heroOrderData');
      if (hasHeroData) {
        navigate('/order/place-order', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (data) => {
    // Calls backend login API: POST /api/v1/auth/login
    // authApi stores token + user in localStorage automatically
    await authApi.login(data);

    // Redirect to place order after successful login
    navigate('/order/place-order');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-alt flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;