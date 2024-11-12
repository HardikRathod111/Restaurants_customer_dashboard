import React from 'react';

const ForgotPassword = () => {
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - Form */}
      <div className="w-full md:w-full lg:w-1/2 flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full m-4" style={{ backgroundColor: '#333748' }}>
          <h2 className="text-2xl font-semibold text-white mb-6">Forgot Password</h2>

          <form>
            <label className="block text-sm text-white mb-1">Email or Phone</label>
            <input
              type="text"
              placeholder="+91 98652 32699"
              className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
              style={{ backgroundColor: '#2D303E', border: "1px solid #ABBBC240" }}
            />

            <a href='/Otp'
              className=" w-full py-2 px-40  bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
              style={{ backgroundColor: '#CA923D' }}
            >
              Get OTP
            </a>
          </form>
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