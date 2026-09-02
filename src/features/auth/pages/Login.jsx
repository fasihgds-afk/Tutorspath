import React from 'react';
import LoginForm from '../components/LoginForm';
import SessionActiveBanner from '../components/SessionActiveBanner';
import authApi from '../api/authApi';
import tokenManager from '../../../services/auth/tokenManager';
import useSmartRedirect from '../hooks/useSmartRedirect';

const Login = () => {
  const smartRedirect = useSmartRedirect();
  const isLoggedIn = tokenManager.isAuthenticated();

  const handleLogin = async (data) => {
    await authApi.login(data);
    await smartRedirect();
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-alt flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {isLoggedIn ? (
          <SessionActiveBanner />
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Login;
