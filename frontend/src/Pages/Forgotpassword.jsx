<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/adminedit/get-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setError('');
        localStorage.setItem('email', emailOrPhone);
        Navigate('/otp');
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while requesting OTP.');
    }
  };
=======
import React from 'react';

const ForgotPassword = () => {
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - Form */}
      <div className="w-full md:w-full lg:w-1/2 flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full m-4" style={{ backgroundColor: '#333748' }}>
          <h2 className="text-2xl font-semibold text-white mb-6">Forgot Password</h2>

<<<<<<< HEAD
          <form method="POST" onSubmit={handleSubmit}>
            <label className="block text-sm text-white mb-1">Email or Phone</label>
            <input
              type="email"
              name="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="harry@gmail.com"
              required
=======
          <form method="POST">
            <label className="block text-sm text-white mb-1">Email or Phone</label>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="+91 98652 32699"
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
              style={{ backgroundColor: '#2D303E', border: "1px solid #ABBBC240" }}
            />

            <button type="submit"
              className=" w-full py-2 px-40  bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
<<<<<<< HEAD
              style={{ backgroundColor: '#CA923D' }}>
              Get OTP
            </button>
          </form>
          {message && <p className="text-green-400 mt-4">{message}</p>}
          {error && <p className="text-red-400 mt-4">{error}</p>}
=======
              style={{ backgroundColor: '#CA923D' }}
            >
              Get OTP
            </button>
          </form>
>>>>>>> a7ff61a57dd5ec835b3edeb4182ab3bd2061376b
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden w-1/2 lg:flex md:hidden items-center justify-center bg-slate-800 bg-opacity-70">
        <img
          src="/assets/images/Group 1000005985.png"
          alt="Illustration"
          className="w-full max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;