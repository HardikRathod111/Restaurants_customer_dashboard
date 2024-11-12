import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Resetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 md:w-full flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full m-4" style={{ backgroundColor: '#333748' }}>
          <h2 className="text-2xl font-semibold text-white mb-6">Reset Password</h2>

          {/* Enter New Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm text-white mb-1">Enter New Password<span className="text-red-500">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ backgroundColor: '#2D303E', border: '1px solid #ABBBC240' }}
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
