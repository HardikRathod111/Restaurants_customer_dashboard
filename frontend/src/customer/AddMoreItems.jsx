'use client';

import React, { useState } from 'react';
import { FaChevronLeft, FaCaretRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function AddMoreItems() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bg-[#0A0B14] min-h-screen w-[375px] text-white relative">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-800">
        <a href="/cartpage" className="p-2">
          <FaChevronLeft className="w-6 h-6" />
        </a>
        <h1 className="text-lg ml-28 font-medium">Cart</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 pt-12 pb-32">
        {/* Illustration */}
        <div className="w-[240px] h-[240px] relative pb-3">
          <img
            src="./assets/images/21532513_6461715 1.png"
            alt="Person eating at table illustration"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>

        {/* Text */}
        <p className="text-center text-gray-300 text-sm mb-2">
          If you want to order another item, you
          <br />
          can order this button.
        </p>
        <p className="text-center text-gray-300 text-sm mb-6">
          If you want to order another item, you
          <br /> can order this button.
        </p>

        {/* Add More Button */}
        <button className="bg-[#C68A15] text-white py-3 px-8 rounded-full text-sm font-medium">
          Add More Items
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-[375px] bg-[#1A1B23] p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">5 Items Added</p>
          <p className="text-lg font-semibold">₹ 2,050</p>
        </div>
        <button
          className="bg-[#C68A15] text-white py-3 px-6 rounded-full text-sm font-medium flex items-center"
          onClick={togglePopup}
        >
          Place Order
          <FaCaretRight size={20} className="ml-1" />
        </button>
      </div>

      {/* Payment Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1A1B23] w-[300px] rounded-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Select Payment</h2>
              <button
                className="text-white text-2xl"
                onClick={togglePopup}
              >
                <IoClose />
              </button>
            </div>

            {/* Payment Options */}
            <div className="flex justify-between items-center mb-6">
              {/* Online Option */}
              <div className="flex flex-col items-center">
                <div className="bg-[#23242E] w-16 h-16 rounded-lg flex items-center justify-center">
                  <img
                    src="./assets/icons/online-icon.png"
                    alt="Online Payment"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm mt-2">Online</p>
              </div>
              {/* Cash Option */}
              <div className="flex flex-col items-center">
                <div className="bg-[#23242E] w-16 h-16 rounded-lg flex items-center justify-center border-2 border-[#C68A15]">
                  <img
                    src="./assets/icons/cash-icon.png"
                    alt="Cash Payment"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-sm mt-2">Cash</p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              className="bg-[#C68A15] text-white py-3 w-full rounded-full text-sm font-medium"
              onClick={togglePopup}
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
