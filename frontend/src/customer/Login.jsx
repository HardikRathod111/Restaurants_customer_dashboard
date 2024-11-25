import React from "react";
import { useNavigate } from "react-router-dom";


const ParcelLogin = () => {

  const navigate = useNavigate();

const handleLogin = () => {

  navigate('/parcel-homepage');

}
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0d23]">
      <div className="w-[375px] px-6 py-8  shadow-md">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-25 h-25 flex items-center justify-center mb-4">
            <img
              src="/assets/images/Frame 1116602047.png"
              alt="Chef Icon"
            />
          </div>
        </div>

        {/* Input Fields */}
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              User Name*
            </label>
            <input
              type="text"
              id="username"
              placeholder="Marcus George"
              className="w-full px-4 py-2 bg-[#26264d] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Phone Number*
            </label>
            <input
              type="text"
              id="phone"
              placeholder="91+"
              className="w-full px-4 py-2 bg-[#26264d] text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 bg-[#CA923D] rounded-lg text-lg font-medium hover:bg-orange-600"
            onClick={handleLogin}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParcelLogin;
