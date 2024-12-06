
'use client'

import React, { useState , useEffect } from 'react';
import { FaUser, FaLock, FaFileAlt, FaSearch, FaClipboardList, FaBoxOpen } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdWindow, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'

export default function Kitchen() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false)



  const handlenavigateprofile = () => {
    navigate('/Profilepage');
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Adjust this depending on where your user data is stored
    navigate("/login"); // Or any other page
  };
const [adminData, setAdminData] = useState({});
  useEffect(() => {
    // Fetch admin data
    const token = localStorage.getItem("authToken");
    console.log(token);

    axios.get("http://localhost:8080/api/v1/adminedit/getadmin", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(response => {
    if (response.data.success) {
      setAdminData(response.data.data); // Set admin data to the state
    }
  })
  .catch(error => {
      console.error("Error fetching admin data:", error);
  });
  }, []);

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
      <aside className="w-[200px] fixed top-0 left-0 h-screen sm:hidden lg:flex bg-gray-800 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-20 rounded-full mb-2" />
        </div>

        <nav className="flex flex-col space-y-3 w-full">
          <a href='/dashboard' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700 w-full">
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
                <a href='/kitchen' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                  Kitchen
                </a>
              </div>
            )}
          </div>
          <a href='/managemenu' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineRestaurantMenu className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Manage Menu
          </a>
          <div>
            <button className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-gray-700"
              onClick={togglePaymentHistory}>
              <FaClipboardList className="mr-2 text-yellow-500" />
              PaymentHistory
              <MdExpandMore className={`ml-auto transform ${PaymentHistoryOpen ? 'rotate-180' : ''}`} />
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
          <a href="/qrcode" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineQrCodeScanner className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            QR Codes
          </a>
        </nav>
         <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto"
        onClick={handleLogout}
        >
          <IoMdLogOut className="mr-2" />
           Log Out
         </button>
      </aside>

      <main className="flex-1 lg:ml-[200px] md:ml-0 sm:w-svw p-6 bg-gray-900">
        {/* Navbar */}
        <header className="flex justify-between sm:justify-normal md:justify-between items-center mb-6 pb-4 ">
        {/* Welcome Text */}
        <h2 className="text-xl font-semibold text-white sm:hidden xl:flex">
          Welcome Back 👋 
          <br />
          <span className="text-gray-400 font-normal text-lg">{restaurants.restaurantName}</span>
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
                       <a href='/kitchen' className='flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700'>
                        Kitchen
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
        <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto"
        onClick={handleLogout}
        >
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
        <div className='flex'>
        <div className="relative w-[400px] mr-28 marker">
          <input
            type="text"
            placeholder="Search Here Your Delicious Food..."
            className="w-[300px] sm:w-[200px] xl:w-[260px] 2xl:w-[300px] md:w-[300px] h-[40px] p-2 pl-10 md:ml-48 sm:ml-3  ml-48 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none"
          />
          < FaSearch 
            className="w-5 h-5 ml-48 text-gray-400 absolute sm:right-[330px] md:left-2 top-2.5"/>
        </div>

       {/* Notification Icon and User Profile Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a7 7 0 00-7 7v4.29l-1.71 1.7a1 1 0 00-.29.71v1a1 1 0 001 1h16a1 1 0 001-1v-1a1 1 0 00-.29-.71L19 13.29V9a7 7 0 00-7-7zm-1 18h2a1 1 0 01-2 0z" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>

            {/* Notification Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#252836] text-gray-300 rounded-md shadow-lg overflow-hidden z-50" style={{ marginRight: '240px', marginTop: '390px', width: '380px' }}>
                {/* Header with Close Button */}
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Notification</h3>
                  <button
                    className="text-gray-400 hover:text-gray-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="divide-y divide-gray-700 m-2 ">
                  <div className="p-3 bg-[#1F1D2B] cursor-pointer rounded-md  mb-1">
                    <div className="text-sm font-medium">Parcel Order</div>
                    <div className="text-sm">Lincoln Siphron</div>
                    <div className="text-xs text-gray-400">2 Min Ago</div>
                  </div>
                  <div className="p-3 bg-[#1F1D2B] cursor-pointer rounded-md  mb-1">
                    <div className="text-sm font-medium">Table No: 10</div>
                    <div className="text-sm">Lincoln Siphron</div>
                    <div className="text-xs text-gray-400">15 Min Ago</div>
                  </div>
                  <div className="p-3 bg-[#1F1D2B] cursor-pointer rounded-md  mb-1">
                    <div className="text-sm font-medium">Parcel Order</div>
                    <div className="text-sm">Lincoln Siphron</div>
                    <div className="text-xs text-gray-400">1 Hr Ago</div>
                  </div>
                </div>
              </div>
            )}


          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handlenavigateprofile}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src="./assets/images/21460d39cd98ccca0d3fa906d5718aa3.jpg" alt="User" className="md:w-10 sm:w-8 md:h-10 sm:h-8 rounded-full" />
              <span className="text-white sm:hidden lg:flex">{adminData.firstname} {adminData.lastname}</span>
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
        </div>
      </header>


        {/* Kitchen Order Management */}
        <div className="h-screen bg-slate-900 text-white p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Order Lists</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Order Pending :</span>
              <span className="text-green-500 text-2xl font-bold">07</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Order Card 1 */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-700 p-3 flex justify-between items-center">
                <span className="text-gray-300">Order Type</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white">Table No:</span>
                  <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-md text-sm">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Customer Name:</label>
                  <p className="text-gray-400">Ramjibhai</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Item Quantity:</label>
                  <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">5</p>
                </div>
                <div>
                  <label className="text-base text-white block mb-1">Item Name:</label>
                  <div className="flex gap-1">
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Pizza(01)
                    </span>
                    <span className="bg-slate-700 text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Manchurian(02)
                    </span>
                    <span className="bg-slate-700 text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      PavBhaji(02)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white block">Cooking Request:</label>
                  <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
                </div>
                <div>
                  <label className="text-sm text-white block">Customization:</label>
                  <p className="text-sm text-gray-400">(1)100% Wheat Crust,(2)Large,(3) Jalapeno</p>
                </div>
                <a 
                  href="/deliver" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
                >
                  Accept Order
                </a>
              </div>
            </div>

            {/* Order Card 2 */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-700 p-3 flex justify-between items-center">
                <span className="text-gray-300">Order Type</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Parcel</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Customer Name:</label>
                  <p className="text-gray-400">MukeshBhai</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Item Quantity:</label>
                  <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">2</p>
                </div>
                <div>
                  <label className="text-base text-white block mb-1">Item Name:</label>
                  <div className="flex gap-1">
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Burger (01)
                    </span>
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Pizza (01)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white block">Cooking Request:</label>
                  <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
                </div>
                <div>
                  <label className="text-sm text-white block">Customization:</label>
                  <p className="text-sm text-gray-400 block">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
                </div>
                <a 
                  href="/deliver" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
                >
                  Accept Order
                </a>
              </div>
            </div>

            {/* Order Card 3 */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-700 p-3 flex justify-between items-center">
                <span className="text-gray-300">Order Type</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Table No:</span>
                  <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Customer Name:</label>
                  <p className="text-gray-400">Rajubhai</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Item Quantity:</label>
                  <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">3</p>
                </div>
                <div>
                  <label className="text-base text-white block mb-1">Item Name:</label>
                  <div className="flex gap-1">
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Burger (01)
                    </span>
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Pizza (02)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white block">Cooking Request:</label>
                  <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
                </div>
                <div>
                  <label className="text-sm text-white block">Customization:</label>
                  <p className="text-sm text-gray-400">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
                </div>
                <a 
                  href="/deliver" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
                >
                  Accept Order
                </a>
              </div>
            </div>

            {/* Order Card 4 */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <div className="bg-slate-700 p-3 flex justify-between items-center">
                <span className="text-gray-300">Order Type</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Table No:</span>
                  <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Customer Name:</label>
                  <p className="text-gray-400">Rajubhai</p>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-base text-white block">Item Quantity:</label>
                  <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">2</p>
                </div>
                <div>
                  <label className="text-base text-white block mb-1">Item Name:</label>
                  <div className="flex gap-1">
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Burger (01)
                    </span>
                    <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                      Pizza (01)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white block">Cooking Request:</label>
                  <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
                </div>
                <div>
                  <label className="text-sm text-white block">Customization:</label>
                  <p className="text-sm text-gray-400">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
                </div>
                <a 
                  href="/deliver" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
                >
                  Accept Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}