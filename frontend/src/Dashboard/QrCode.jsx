import React, { useState } from 'react';
import { 
  FaQrcode, FaHome, FaList, FaMoneyBillWave, FaSignOutAlt, FaEllipsisV, 
  FaBoxOpen, FaUser, FaSearch, FaClipboardList 
} from 'react-icons/fa';
import { MdWindow, MdAddBox , MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'

function QrCode() {
  const [activeLink, setActiveLink] = useState('');
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Fixed state for dropdown menu
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
  const togglePaymentHistory = () => setPaymentHistoryOpen(!PaymentHistoryOpen);

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
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const handlenavigateprofile = ()=> {
    navigate('/Profilepage');
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] fixed top-0 left-0 h-screen sm:hidden lg:flex bg-gray-800 p-4 flex flex-col items-center">
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
                      <a href='/onsiteorder' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                          Onsite Order
                      </a>
                  </div>
              )}
          </div>
          <a href='/managemenu' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineRestaurantMenu className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Manage Menu
          </a>
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
                <a href='/paymentparcel' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Parcel Order
                </a>
                <a href='/paymentonsite' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Onsite Order
                </a>
              </div>
              )}
            </div>
          <a href='/qrcode' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineQrCodeScanner  className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            QR Codes
          </a>
        </nav>
        <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto">
          <IoMdLogOut className="mr-2" />
           Log Out
         </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[200px] md:ml-0 sm:w-svw p-6 bg-gray-900">
      <header className="flex justify-between sm:justify-normal md:justify-between items-center mb-6 pb-4 ">
        {/* Welcome Text */}
        <h2 className="text-xl font-semibold text-white sm:hidden xl:flex">
          Welcome Back 👋 
          <br />
          <span className="text-gray-400 font-normal text-lg">Jd's Restro</span>
        </h2>

        <button id="toggleButton" className='lg:hidden' onClick={() => setOpen(true)}>
        <BsThreeDotsVertical style={{fontSize:'20px'}}/>
        </button>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md sm:w-60 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    {/* <XMarkIcon aria-hidden="true" className="h-6 w-6" /> */}
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-screen flex-col overflow-y-scroll  py-6 shadow-xl  bg-gray-800 p-4 items-center">
                
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
                      <a href='/onsiteorder' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                          Onsite Order
                      </a>
                  </div>
              )}
          </div>
          <a href='/managemenu' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineRestaurantMenu className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Manage Menu
          </a>
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
                <a href='/paymentparcel' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Parcel Order
                </a>
                <a href='/paymentonsite' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Onsite Order
                </a>
              </div>
              )}
            </div>
          <a href='/qrcode' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineQrCodeScanner  className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            QR Codes
          </a>
        </nav>
        <button className="flex items-center px-4 py-2 mr-12 md:mt-6 bg-red-500 rounded-md text-white ml-auto">
          <IoMdLogOut className="mr-2" />
           Log Out
         </button>

                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
        
        {/* Search Bar */}
        <div className="relative w-[400px]  marker">
          <input
            type="text"
            placeholder="Search Here Your Delicious Food..."
            className="w-[300px] sm:w-[150px] xl:w-[260px] 2xl:w-[300px] md:w-[300px] h-[40px] p-2 pl-10 md:ml-48 sm:ml-3  ml-48 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none"
          />
          < FaSearch 
            className="w-5 h-5 ml-48 text-gray-400 absolute sm:right-36 md:left-2 top-2.5"/>
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
              onClick={handlenavigateprofile}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src="./assets/images/21460d39cd98ccca0d3fa906d5718aa3.jpg" alt="User" className="md:w-10 sm:w-8 md:h-10 sm:h-8 rounded-full" />
              <span className="text-white sm:hidden lg:flex">Musabbir Hossain</span>
              <svg
                className="w-4 h-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.25 7.5l4.25 4.25 4.25-4.25L15 9l-5 5-5-5z" />
              </svg>
            </button>
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
            className={`px-4 py-2 ${activeTab === 'progress' ? 'border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]' : 'bg-gray-700 text-gray-300'} rounded-e-lg rounded-ee-none`}
          >
            Counter
          </button>
        </div>
        
        {/* QR Code Section */}
        {activeTab === 'request' && (
          <section className="relative bg-gray-900 rounded-lg   w-full overflow-auto rounded-ss-none rounded-r-lg rounded-bl-lg">
            <div className="relative bg-gray-800 rounded-lg p-5 w-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-white">QR Codes</h1>
               <a href='/createqrcode' className="bg-yellow-600 hover:bg-yellow-700 white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center">
                   <MdAddBox className="text-white mr-2" />
                   Create QR Code
                 </a>
              </div>

              <div className="grid grid-cols-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 w-full">
                {[1, 2, 3, 4, 5, 6].map((tableNumber) => (
                  <div key={tableNumber} className="bg-gray-700 rounded-lg  flex h-[250px] flex-col items-center relative w-full">
                    
                    {/* Table Number Label and Three Dots in One Line (Cover Full Width) */}
                    <div className="flex justify-between items-center w-full bg-gray-600 py-2 px-4 rounded-t-lg">
                      <h2 className="text-lg font-semibold text-white">{`Table No - ${tableNumber}`}</h2>
                      <div
                        className="text-gray-400 cursor-pointer"
                        onClick={() => toggledropdown(tableNumber)}
                      >
                        <FaEllipsisV />
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen === tableNumber && (
                      <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28">
                        <a href='/createqrcode'
                          className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                          onClick={() => alert(`Editing Table ${tableNumber}`)}
                        >
                          Edit
                        </a>
                        <a href='/deleteprompt'
                          className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                          onClick={() => alert(`Deleting Table ${tableNumber}`)}
                        >
                          Delete
                        </a>
                      </div>
                    )}

                    {/* QR Code Box with Full Width Dark Background */}
                    <div className="bg-gray-900 rounded-lg w-44 h-40 mt-6 flex justify-center items-center">
                      <img src="./assets/images/Group 1000006213.png" alt={`QR Code for Table ${tableNumber}`} className="w-[120px] h-auto max-w-xs mx-auto"/>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {activeTab === "progress" && (
  <section className="relative bg-gray-900 rounded-lg   w-full overflow-auto rounded-ss-none rounded-r-lg rounded-bl-lg">
    <div className="relative bg-gray-800 rounded-lg p-5 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">QR Codes</h1>
        <a href="/createqrcode" className="bg-yellow-600 hover:bg-yellow-700 white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center">
          <MdAddBox className="text-white mr-2" />
          Create QR Code
        </a>
      </div>

      <div className="grid grid-cols-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 w-full">
        {[1, 2].map((counterNumber) => (
          <div key={counterNumber} className="bg-gray-700 rounded-lg  flex h-[250px] flex-col items-center relative w-full">
            {/* Table Number Label and Three Dots in One Line (Cover Full Width) */}
            <div className="flex justify-between items-center w-full bg-gray-600 py-2 px-4 rounded-t-lg">
              <h2 className="text-base font-semibold text-white">{`Counter No - ${counterNumber}`}</h2>
              <div
                className="text-gray-400 cursor-pointer"
                onClick={() => toggleCounterDropdown(counterNumber)} // Updated to use the correct function
              >
                <FaEllipsisV />
              </div>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen === counterNumber && (
              <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28">
                <a href='/createqrcode'
                  className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                  onClick={() => alert(`Editing Table ${counterNumber}`)}
                >
                  Edit
                </a>
                <a href='/deleteprompt'
                  className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                  onClick={() => alert(`Deleting Table ${counterNumber}`)}
                >
                  Delete
                </a>
              </div>
            )}

            {/* QR Code Box with Full Width Dark Background */}
            <div className="bg-black p-6 rounded-lg  w-44 h-40 mt-5 flex justify-center items-center">
              <img src="./assets/images/Group 1000006213.png" alt={`QR Code for Table ${counterNumber}`} className="w-[120px] h-auto max-w-xs mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
      </main>
    </div>
  );
}

export default QrCode;
