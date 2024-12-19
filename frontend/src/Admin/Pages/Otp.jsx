import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Otp = () => { 
  const Navigate = useNavigate();
  const [otpFields, setOtpFields] = useState(['', '', '', '', '', '']); // Initialize with 6 empty fields
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [email, setEmail] = useState(""); // Example email input, should be set dynamically based on context
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // Countdown timer state
  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("email"); // Or wherever you store the email
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);
  const handleInputChange = (index, event) => {
    const value = event.target.value; // Extract value from the input field
    if (isNaN(value)) return; // Ensure only numeric values are allowed
    const updatedFields = [...otpFields];
    updatedFields[index] = value.slice(-1); // Allow only one character per input
    setOtpFields(updatedFields);
  };
  

  // Verify OTP
  const handleVerify = async () => {
    
    const storedEmail = localStorage.getItem('email'); // Dynamically retrieve email
    const otpCode = otpFields.join(''); // Combine OTP input fields
    if (!storedEmail || otpCode.length !== 6) {
      setError('Please complete all fields or ensure the email is set.');
      return;
    }
  
    try {
      const response = await fetch('https://restaurants-customer-dashboard.onrender.com/api/v1/adminedit/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: storedEmail, otp: otpCode }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('OTP Verified:', data.message);
        Navigate('/resetpassword');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setError('An error occurred during verification.');
    }
  };
  
  // Resend OTP (Reset timer and call API to resend OTP)
  const handleResend = async () => {
    try {
      await axios.post("/get-otp", { email });
      setTimer(30); // Reset timer
      setMessage("A new OTP has been sent to your email.");
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/d75bfbbb18fefcba2a744eb559378aad.jfif')" }}
    >
      {/* Left side - OTP Form */}
      <div className="w-full lg:w-1/2 md:w-full flex items-center justify-center bg-slate-800 bg-opacity-70">
        <div className="p-8 rounded-md shadow-md max-w-md w-full" style={{ backgroundColor: '#333748',margin:'50px' }}>
          <h2 className="text-2xl font-semibold text-white mb-4">Enter OTP</h2>
          <p className="text-gray-400 mb-6">
          A verification code has been sent to <span className="text-white">{email || "your email"}</span>.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-between mb-4">
            {otpFields.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ backgroundColor: '#2D303E', border: '1px solid #ABBBC2' }}
                onChange={(e) => handleInputChange(index, e)} // Pass event to the function
                value={value}
              />
            ))}
          </div>

          {/* Countdown Timer and Resend Link */}
          <div className="flex items-center justify-between mb-4 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <span>⏰</span>
              <span>{timer} sec</span>
            </div>
            <button
              className="text-blue-400 hover:text-blue-500 focus:outline-none"
              onClick={handleResend}
              disabled={timer > 0}
            >
              Resend OTP
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition duration-200"
            style={{ backgroundColor: "#CA923D" }}
          >
            Verify
          </button>
          {message && <p className="text-green-400 mt-4">{message}</p>}
          {error && <p className="text-red-400 mt-4">{error}</p>}
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

export default Otp;
