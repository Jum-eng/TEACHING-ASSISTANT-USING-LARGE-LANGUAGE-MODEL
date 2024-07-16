import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="mb-4 text-xl">Log In</h2>
        <input className="border p-2 mb-4 w-full" type="text" placeholder="Username" required />
        <input className="border p-2 mb-4 w-full" type="password" placeholder="Password" required />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">Log In</button>
      </form>
      
    </div>
  );
};

export default LoginPage;
