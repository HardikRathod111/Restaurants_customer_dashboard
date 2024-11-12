import React, { useState } from 'react';
import { 
  FaQrcode, FaHome, FaList, FaMoneyBillWave, FaSignOutAlt, FaEllipsisV, 
  FaBoxOpen, FaUser, FaSearch, FaClipboardList 
} from 'react-icons/fa';
import { MdWindow, MdAddBox , MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas from qrcode.react




const Createqrcode = () => {
  const [activeLink, setActiveLink] = useState('');
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Fixed state for dropdown menu


   const [link, setLink] = useState('');
  const [qrName, setQrName] = useState('');
  const [category, setCategory] = useState('Food & Drink');
  const [additionalText, setAdditionalText] = useState('');
  
  // Color states
  const [chooseColor, setChooseColor] = useState("#FFFFFF");
  const [frameColor, setFrameColor] = useState("#FFFFFF");
  const [qrColor, setQRColor] = useState("#FFFFFF");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
  const togglePaymentHistory = () => setPaymentHistoryOpen(!paymentHistoryOpen);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const toggledropdown = (tableNumber) => {
    setDropdownOpen(dropdownOpen === tableNumber ? null : tableNumber); // Updated dropdown toggle
  };

  const toggleCounterDropdown = (counterNumber) => {
  setDropdownOpen(dropdownOpen === counterNumber ? null : counterNumber); // Toggle dropdown for the current table or counter
};

    const getTabLabel = () => {
    switch (activeTab) {
      case 'request':
        return 'Table';
      case 'progress':
        return 'Counter';
      default:
        return 'QR Codes';
    }
  };

  return (
    <div className="flex bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] h-screen bg-gray-800 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-20 rounded-full mb-2" />
        </div>
        <nav className="flex flex-col space-y-3 w-full">
          <a href="/dashboard" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700 w-full">
            <MdWindow className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Dashboard
          </a>
          <div>
            <button
              className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-gray-700"
              onClick={toggleManageOrder}
            >
              <FaBoxOpen className="mr-2 text-yellow-500" />
              Manage Order
              <MdExpandMore className={`ml-auto transform ${manageOrderOpen ? 'rotate-180' : ''}`} />
            </button>
            {manageOrderOpen && (
              <div className="ml-8 mt-2 space-y-2">
                <a href='/parcelorder' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Parcel Order
                </a>
                <a href='/onsiteorder' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Onsite Order
                </a>
              </div>
            )}
          </div>
          <button className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineRestaurantMenu className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Manage Menu
          </button>
          <div>
            <button className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-gray-700" onClick={togglePaymentHistory}>
              <FaClipboardList className="mr-2 text-yellow-500" />
              PaymentHistory
              <MdExpandMore className={`ml-auto transform ${paymentHistoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {paymentHistoryOpen && (
              <div className="ml-8 mt-2 space-y-2">
                <a href='/' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Parcel Order
                </a>
                <a href='/' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Onsite Order
                </a>
              </div>
            )}
          </div>
          <a href="/qrcode" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineQrCodeScanner className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            QR Codes
          </a>
        </nav>
        <button className="flex items-center px-4 py-2 mt-auto bg-red-500 rounded-md text-white">
          <IoMdLogOut className="mr-2" />
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900">
        <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div className="flex items-center text-white font-semibold">
            <FaHome />
            <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px', color: "#CA923D" }}>
              {getTabLabel()}
            </h4>
          </div>
          {/* Search Bar */}
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search Here Your Delicious Food..."
              className="w-[300px] h-[40px] p-2 pl-10 ml-56 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none"
            />
            <FaSearch className="w-5 h-5 ml-56 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Notification Icon and User Profile Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-300 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a7 7 0 00-7 7v4.29l-1.71 1.7a1 1 0 00-.29.71v1a1 1 0 001 1h16a1 1 0 001-1v-1a1 1 0 00-.29-.71L19 13.29V9a7 7 0 00-7-7zm-1 18h2a1 1 0 01-2 0z" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-yellow-500" />
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img src="./assets/images/21460d39cd98ccca0d3fa906d5718aa3.jpg" alt="User" className="w-10 h-10 rounded-full" />
                <span className="text-white">Musabbir Hossain</span>
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.25 7.5l4.25 4.25 4.25-4.25L15 9l-5 5-5-5z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 bg-gray-800 text-gray-300 rounded-md shadow-lg py-2">
                  {/* Add dropdown items here */}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-4 py-2 rounded-ss-lg ${activeTab === 'request' ? 'border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]' : 'bg-gray-700 text-gray-300'}`}
          >
            Table
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 ${activeTab === 'progress' ? 'border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]' : 'bg-gray-700 text-gray-300'}`}
          >
            Counter
          </button>
        </div>
        <section>
            <div className="flex flex-col items-center bg-gray-900 min-h-screen py-8 text-white">
      <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 ">Create QR Code</h2>
        
        {/* Input Fields Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Link Input */}
          <div>
            <label className="block text-sm mb-1">Put Your Link Here</label>
            <input
              type="text"
              className="bg-gray-700 p-3 rounded w-full text-gray-200 placeholder-gray-400"
              placeholder="https://www.musthavemenus.com/category/restaurant-menu.html"
            />
          </div>

          {/* Name and Category */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Name Your QR (Optional)</label>
              <input
                type="text"
                className="bg-gray-700 p-3 rounded w-full text-gray-200 placeholder-gray-400"
                placeholder="Food & Drink"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Select Content Category</label>
              <select className="bg-gray-700 p-3 rounded w-full text-gray-200">
                <option>Food & Drink</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Text and Colors */}
      <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">Additional Text</label>
                <input
                  type="text"
                  className="bg-gray-700 p-3 rounded w-full text-gray-200 placeholder-gray-400"
                  placeholder="Additional"
                  value={additionalText}
                  onChange={(e) => setAdditionalText(e.target.value)}
                />
              </div>

              {/* Color Pickers */}
              <div className="relative">
                <label className="block text-sm mb-1">Choose Color</label>
                <div className="flex items-center bg-gray-700 rounded p-3 cursor-pointer">
                  <input
                    type="color"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    value={chooseColor}
                    onChange={(e) => setChooseColor(e.target.value)}
                  />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chooseColor }}></div>
                  <span className="ml-2">{chooseColor}</span>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">Frame Color</label>
                <div className="flex items-center bg-gray-700 rounded p-3 cursor-pointer">
                  <input
                    type="color"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    value={frameColor}
                    onChange={(e) => setFrameColor(e.target.value)}
                  />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: frameColor }}></div>
                  <span className="ml-2">{frameColor}</span>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">QR Color</label>
                <div className="flex items-center bg-gray-700 rounded p-3 cursor-pointer">
                  <input
                    type="color"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    value={qrColor}
                    onChange={(e) => setQRColor(e.target.value)}
                  />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: qrColor }}></div>
                  <span className="ml-2">{qrColor}</span>
                </div>
              </div>
            </div>

            {/* Display QR Code */}
            {link && (
              <div className="flex justify-center mb-6">
                <QRCodeCanvas
                  value={link}
                  size={256}
                  fgColor={qrColor}
                  bgColor={chooseColor}
                  level="H"
                  style={{ borderRadius: '10px', padding: '10px', border: `4px solid ${frameColor}` }}
                />
              </div>
            )}

            <div className="flex justify-center">
              <button className="bg-yellow-500 px-6 py-2 text-black font-semibold rounded-lg hover:bg-yellow-600">
                Download
              </button>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Createqrcode;
