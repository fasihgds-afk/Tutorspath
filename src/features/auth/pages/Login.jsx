import React from 'react';
import LoginForm from '../components/LoginForm';
import authApi from '../api/authApi';

const Login = () => {
  const handleLogin = async (data) => {
    // Calls backend login API: POST /api/v1/auth/login
    const response = await authApi.login(data);
    console.log('Login successful:', response);

    // No redirect after login
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