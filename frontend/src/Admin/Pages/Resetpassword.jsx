import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();
  const email = localStorage.getItem('email');
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/adminedit/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after successful reset
        }, 2000);
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 md:w-full flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full m-4" style={{ backgroundColor: '#333748' }}>
          <h2 className="text-2xl font-semibold text-white mb-6">Reset Password</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {message && <div className="text-green-500 mb-4">{message}</div>}
          {/* Enter New Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm text-white mb-1">Enter New Password<span className="text-red-500">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ backgroundColor: '#2D303E', border: '1px solid #ABBBC240' }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 mt-3"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <label className="block text-sm text-white mb-1">Confirm Password<span className="text-red-500">*</span></label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Confirm Password"
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ backgroundColor: '#2D303E', border: '1px solid #ABBBC240' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 mt-3"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          {/* Reset Password Button */}
          <button
            type="button"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
            style={{ backgroundColor: '#CA923D' }}
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex w-full md:hidden items-center justify-center bg-slate-800 bg-opacity-70">
        <img
          src="/assets/images/Group 1000005985.png"
          alt="Illustration"
          className="w-full max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default Resetpassword;