import React from 'react';

const Otp = () => {
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - OTP Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full" style={{ backgroundColor: '#333748',margin:'50px' }}>
          <h2 className="text-2xl font-semibold text-white mb-4">Enter OTP</h2>
          <p className="text-gray-400 mb-6">
            A verification code has been sent on <span className="text-white">XXX98</span>. Enter the code below.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-between mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ backgroundColor: '#2D303E', border: '1px solid #ABBBC2' }}
              />
            ))}
          </div>

          {/* Countdown Timer and Resend Link */}
          <div className="flex items-center justify-between mb-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <span>⏰</span>
              <span>00:30 sec</span>
            </div>
            <button className="text-blue-400 hover:text-blue-500 focus:outline-none">Resend OTP</button>
          </div>

          {/* Verify Button */}
          <a href='/resetpassword'
              className=" w-full py-2 px-40  bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
              style={{ backgroundColor: '#CA923D' }}
            >
             Verify
            </a>

        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-slate-800 bg-opacity-70">
        <img
          src="/assets/images/Group 1000005985.png"
          alt="Illustration"
          className="w-full max-w-lg h-auto"
        />
      </div>
    </div>
  );
};

export default Otp;
