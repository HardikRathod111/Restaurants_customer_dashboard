import React, { useEffect } from 'react';
import { FaUser, FaLock, FaFileAlt,  FaSearch  ,FaClipboardList } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdWindow , MdOutlineRestaurantMenu , MdOutlineQrCodeScanner ,MdExpandMore } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Editprofile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handlenavigateprofile = ()=> {
    navigate('/Profilepage');
  }
  const toggleManageOrder = () => {
    setManageOrderOpen(!manageOrderOpen);
  };

  const togglePaymentHistory = () => {
    setPaymentHistoryOpen(!PaymentHistoryOpen);
  };
 
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem("authToken"); // Adjust this depending on where your user data is stored
  
    // Optionally make an API request to invalidate session if necessary
    // await axios.post('http://localhost:8080/api/v1/auth/logout'); // Optional backend call
  
    // Redirect user to login or home page after logout
    navigate("/login"); // Or any other page
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [open, setOpen] = useState(false)

  const [adminData, setAdminData] = useState({});
  useEffect(() => {
    // Fetch admin data
    const token = localStorage.getItem("authToken");

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

   // Handle form input changes
   const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle update request
  const handleUpdate = () => {
    const token = localStorage.getItem("authToken");
    axios
      .put(
        "http://localhost:8080/api/v1/adminedit/updateadmin",
        adminData, // Send the updated admin data
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          console.log("Admin data updated successfully");
          navigate("/profilepage");
        } else {
          console.log("Error updating admin data");
        }
      })
      .catch((error) => {
        console.error("Error updating admin data:", error);
      });
  };

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

      </aside>

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
            className="w-[300px] sm:w-[150px] xl:w-[260px] 2xl:w-[300px] md:w-[300px] h-[40px] p-2 pl-10 md:ml-48 sm:ml-3  ml-48 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none"
          />
          < FaSearch 
            className="w-5 h-5 ml-48 text-gray-400 absolute sm:right-36 md:left-2 top-2.5"/>
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
      <section className="flex gap-3 sm:flex-col md:flex-row w-full">
      {/* Menu Section */}
      <div className="md:w-[250px] h-[250px] xl:h-[250px] lg:h-[270px] md:h-[280px] sm:h-[280px] sm:w-full   bg-gray-800 p-4 rounded-md">
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
                  className="md:w-[100px] md:h-[100px] rounded-full sm:w-[80px] sm:h-[80px]"
                />
              </div>
             <a href='#' className="md:mr-10 sm:mr-2 px-4 md:py-2 sm:py-1 bg-yellow-600 text-gray-900 mb-11 rounded-md flex items-center">
                <FiEdit className="mr-2" />
                Edit Profile
              </a>
            </div>

            {/* Profile Form Section */}
<div className="mt-8 grid grid-cols-3 gap-6">
  {/* First Row */}
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">First Name</label>
    <input
      type="text"
      name="firstname"
      value={adminData.firstname || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Last Name</label>
    <input
      type="text"
      name='lastname'
      value={adminData.lastname || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Email Address</label>
    <input
      type="email"
      name='email'
      value={adminData.email || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>

  {/* Second Row */}
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Phone Number</label>
    <input
      type="text"
      name='phonenumber'
      value={adminData.phonenumber || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Restaurant Name</label>
    <input
      type="text"
      name='selectrestaurant'
      value={adminData.selectrestaurant || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Gender</label>
    <input
      type="text"
      name='gender'
      value="male"
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>

  {/* Third Row */}
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">City</label>
    <input
      type="text"
      name='city'
      value={adminData.city || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">State</label>
    <input
      type="text"
      name='state'
      value={adminData.state || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <div className="md:col-span-1 sm:col-span-3">
    <label className="block text-sm font-medium">Country</label>
    <input
      type="text"
      name='country'
      value={adminData.country || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>

  {/* Fourth Row */}
  <div className="col-span-3">
    <label className="block text-sm font-medium">Address</label>
    <input
      type="text"
      name='city1'
      value={adminData.city || ''}
      onChange={handleChange}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-300"
    />
  </div>
  <button
        type="button"
        onClick={handleUpdate}
        className="mt-4 lg:col-span-1 sm:col-span-3 px-4 py-2 bg-yellow-600 text-white rounded-md"
      >
        Update Admin Info
      </button>
</div>
      

          </div>
        </section>
      </main>
    </div>
  );
}

export default Editprofile;  