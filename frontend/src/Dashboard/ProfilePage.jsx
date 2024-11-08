// src/App.js
import React, { useState } from 'react';
import { FaTachometerAlt, FaClipboardList, FaUtensils, FaHistory, FaQrcode, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [showManageOrderDropdown, setShowManageOrderDropdown] = useState(false);
  const [showPaymentHistoryDropdown, setShowPaymentHistoryDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col items-center">
        <img 
          src='./assets/images/Frame 1000005156.png' 
          alt='Dashboard logo' 
          className="w-24 h-auto mb-5"
        />
        <nav className="w-full">
          <div className="mb-4 flex items-center">
            <FaTachometerAlt className="text-yellow-500 mr-2" />
            <span>Dashboard</span>
          </div>

          <div className="mb-4">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setShowManageOrderDropdown(!showManageOrderDropdown)}
            >
              <FaClipboardList className="text-yellow-500 mr-2" />
              <span>Manage Order</span>
            </div>
            {showManageOrderDropdown && (
              <div className="pl-8 mt-2 space-y-1">
                <div className="cursor-pointer hover:text-yellow-500">Parcel Order</div>
                <div className="cursor-pointer hover:text-yellow-500">Onsite Order</div>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <FaUtensils className="text-yellow-500 mr-2" />
            <span>Manage Menu</span>
          </div>

          <div className="mb-4">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setShowPaymentHistoryDropdown(!showPaymentHistoryDropdown)}
            >
              <FaHistory className="text-yellow-500 mr-2" />
              <span>Payment History</span>
            </div>
            {showPaymentHistoryDropdown && (
              <div className="pl-8 mt-2 space-y-1">
                <div className="cursor-pointer hover:text-yellow-500">Parcel Order</div>
                <div className="cursor-pointer hover:text-yellow-500">Onsite Order</div>
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <FaQrcode className="text-yellow-500 mr-2" />
            <span>QR Code</span>
          </div>

          {/* Logout Button */}
          <div className="mt-10 flex  items-center">
            <FaSignOutAlt className="text-yellow-500 mr-2" />
            <Link to="/logout" className="hover:text-yellow-500">Logout</Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold">Welcome to your Dashboard</h2>
      </main>
    </div>
  );
}

export default ProfilePage;
