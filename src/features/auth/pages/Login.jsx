import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log('Student Login payload:', data);
    // Redirect student to Place Order page
    navigate('/order/placeorder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;