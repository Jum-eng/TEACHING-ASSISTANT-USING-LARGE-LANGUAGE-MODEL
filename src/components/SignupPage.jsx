// src/components/SignupPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <h2 className="mb-4 text-xl">Sign Up</h2>
        <input className="border p-2 mb-4 w-full" type="text" placeholder="Username" required />
        <input className="border p-2 mb-4 w-full" type="password" placeholder="Password" required />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
