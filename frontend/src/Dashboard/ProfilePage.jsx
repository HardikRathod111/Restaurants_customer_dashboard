// App.js
import React from 'react';
import { FaUser, FaLock, FaFileAlt,  FaSearch  ,FaClipboardList } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdWindow , MdOutlineRestaurantMenu , MdOutlineQrCodeScanner ,MdExpandMore } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react';


function ProfilePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

              const [manageOrderOpen, setManageOrderOpen] = useState(false);

             const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);


                const toggleManageOrder = () => {
        setManageOrderOpen(!manageOrderOpen);
    };

            const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
    };
 
     const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] h-[900px] bg-gray-800 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          {/* Centered Image */}
          <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-20 rounded-full mb-2" />
        </div>

        <nav className="flex flex-col space-y-3 w-full">
          <a href='/dashboard' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700 w-full">
            <MdWindow className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Dashboard
          </a>
           <div>
                        {/* Manage Order Dropdown */}
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
                                <a href='/' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
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
              {/* PaymentHistory Dropdown */}
              <button className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-gray-700"
                onClick={togglePaymentHistory}>
                <FaClipboardList className="mr-2 text-yellow-500" />
                PaymentHistory
                <MdExpandMore className={`ml-auto transform ${PaymentHistoryOpen ? 'rotate-180' : '' }`} />
              </button>
              {PaymentHistoryOpen && (
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
          <button className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineQrCodeScanner  className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            QR Codes
          </button>
        </nav>
        <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto">
          <IoMdLogOut className="mr-2" />
           Log Out
         </button>

      </aside>

      <main className="flex-1 p-6 bg-gray-900">
      <header className="flex justify-between items-center mb-6 pb-4 ">
        {/* Welcome Text */}
        <h2 className="text-xl font-semibold text-white">
          Welcome Back 👋 
          <br />
          <span className="text-gray-400 font-normal text-lg">Jd's Restro</span>
        </h2>

        {/* Search Bar */}
        <div className="relative w-[400px]">
          <input
            type="text"
            placeholder="Search Here Your Delicious Food..."
            className="w-[300px] h-[40px] p-2 pl-10 ml-48 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none"
          />
          < FaSearch 
            className="w-5 h-5 ml-48 text-gray-400 absolute left-3 top-2.5"/>
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
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500" />
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
                {/* <a href="#" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">Logout</a> */}
              </div>
            )}
          </div>
        </div>
      </header>
         <section className="flex gap-3">
      {/* Menu Section */}
      <div className="w-[250px] h-[250px] bg-gray-800 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Menu</h3>
        
        {/* Profile Link */}
        <a
          href="/"
          onClick={() => handleLinkClick('profile')}
          className={`flex items-center w-full  p-2 rounded-md bg-yellow-600 text-white ${activeLink === 'profile' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300'} font-medium mb-4`}
        >
          <FaUser className="mr-2" />
          Profile
        </a>
        
        {/* Change Password Link */}
        <a
          href="/ChangePassword"
          onClick={() => handleLinkClick('change-password')}
          className={`flex items-center w-full p-2 rounded-md text-white ${activeLink === 'change-password' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300'} mb-4`}
        >
          <FaLock className="mr-2" />
          Change Password
        </a>
        
        {/* Terms & Conditions Link */}
        <a
          href="/TermsAndConditions"
          onClick={() => handleLinkClick('terms-and-conditions')}
          className={`flex items-center w-full px-1 py-2 rounded-md text-white ${activeLink === 'terms-and-conditions' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-gray-300'}`}
        >
          <FaFileAlt className="mr-2" />
          Terms & Condition
        </a>
      </div>

          {/* Profile Information Section */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden p-3 w-full">
            {/* Background Image */}
            <div
              className="absolute w-[800px] h-[90px] inset-0 bg-cover bg-center "
              style={{ backgroundImage: "url('./assets/images/6b8d7b581303d40fcc1f30dfc6de9d00.jpg')" }}
            ></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center ">
                <img
                  src="./assets/images/21460d39cd98ccca0d3fa906d5718aa3.jpg"
                  alt="Profile"
                  className="w-[100px] h-[100px] rounded-full "
                />
              </div>
             <a href='/editprofile' className="mr-10 px-4   py-2 bg-yellow-600 text-gray-900 mb-11 rounded-md flex items-center">
                <FiEdit className="mr-2" />
                Edit Profile
              </a>
            </div>

            {/* Profile Form Section */}
           <div className="mt-8 grid grid-cols-3 gap-6">
  {/* First Row */}
  <div>
    <label className="block text-sm font-medium">First Name</label>
    <input
      type="text"
      value="Jenny"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">Last Name</label>
    <input
      type="text"
      value="Wilson"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">Email Address</label>
    <input
      type="email"
      value="jenny.wilson@example.com"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>

  {/* Second Row */}
  <div>
    <label className="block text-sm font-medium">Phone Number</label>
    <input
      type="text"
      value="+91 95354 98972"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">Restaurant Name</label>
    <input
      type="text"
      value="Statesman Restaurant"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">Gender</label>
    <input
      type="text"
      value="Male"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>

  {/* Third Row */}
  <div>
    <label className="block text-sm font-medium">City</label>
    <input
      type="text"
      value="Surat"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">State</label>
    <input
      type="text"
      value="Gujarat"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
  <div>
    <label className="block text-sm font-medium">Country</label>
    <input
      type="text"
      value="India"
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>

  {/* Fourth Row */}
  <div className="col-span-3">
    <label className="block text-sm font-medium">Address</label>
    <input
      type="text"
      value="A-151 Swastik Plaza, Punagam, Varchha, Jamnagar, Gujarat."
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
      readOnly
    />
  </div>
</div>

          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;  