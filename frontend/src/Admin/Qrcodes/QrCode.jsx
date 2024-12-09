import React, { useEffect, useState } from 'react';
import { 
  FaEllipsisV, 
  FaBoxOpen, FaSearch, FaClipboardList 
} from 'react-icons/fa';
import { MdWindow, MdAddBox , MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';



function QrCode() {
  const [activeLink, setActiveLink] = useState('');
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Fixed state for dropdown menu
  const [isOpen, setIsOpen] = useState(false);

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
      case 'table':
        return 'Table';
      case 'counter':
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
  const [selectedQrCode, setSelectedQrCode] = useState(null);

  const handleDelete = async (id) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this QR code?");
    // if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:8080/api/v1/qrCode/deleteQrCode/${selectedQrCodeId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setIsModalOpen(false);
        // alert('QR Code deleted successfully!');
      } else {
        alert('Failed to delete QR Code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again later.');
    }
  };
  const handleEditClick = (qrCode) => {
    setSelectedQrCode(qrCode);
    navigate('/createqrcode', { state: { qrCode } }); // Pass data using the state
  };

  const [adminData, setAdminData] = useState({});

  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
      const fetchQrCodes = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/v1/qrCode/getAllQrCodes');
              setQrCodes(response.data);
          } catch (error) {
              console.error('Error fetching QR Codes:', error);
          }
      };

      fetchQrCodes();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); // Or any other page
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedQrCodeId, setSelectedQrCodeId] = useState(null); // State to store QR Code ID for deletion
  const handleDeleteClick = (id) => {
    setSelectedQrCodeId(id); // Set the selected QR code to delete
    setIsModalOpen(true); // Open the confirmation modal
  };


  const closeModal = () => {
    setIsModalOpen(false); // Close the modal if the user cancels
  };

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
        <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto"
        onClick={handleLogout}
        >
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

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-ss-lg ${activeTab === 'table' ? 'border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]' : 'bg-gray-700 text-gray-300'}`}
          >
            Table
          </button>
          <button
            onClick={() => setActiveTab('counter')}
            className={`px-4 py-2 ${activeTab === 'counter' ? 'border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]' : 'bg-gray-700 text-gray-300'} rounded-e-lg rounded-ee-none`}
          >
            Counter
          </button>
        </div>
        
        {/* QR Code Section */}
        {activeTab === 'table' && (
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
  {qrCodes && qrCodes.length > 0 ? (
     qrCodes
     .filter((qrCode) => qrCode.activeTab === activeTab) // Filter based on activeTab
     .map((qrCode) => (
      <div key={qrCode._id} className="bg-gray-700 rounded-lg flex h-[250px] flex-col items-center relative w-full">
        {/* Table Number Label and Three Dots in One Line (Cover Full Width) */}
        <div className="flex justify-between items-center w-full bg-gray-600 py-2 px-4 rounded-t-lg">
          <h2 className="text-lg font-semibold text-white">{`Table No - ${qrCode.qrName}`}</h2>
          <div
            className="text-gray-400 cursor-pointer"
            onClick={() => toggledropdown(qrCode._id)}
            aria-label={`More options for table ${qrCode.qrName}`}
          >
            <FaEllipsisV />
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen === qrCode._id && (
          <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28 z-10">
            <a
              href='/createqrcode'
              className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
              onClick={() => handleEditClick(qrCode)}
            >
              Edit
            </a>
            <a
              className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
              onClick={() => handleDeleteClick(qrCode._id)}
            >
              Delete
            </a>
          </div>
        )}
        
        {/* QR Code Box with Full Width Dark Background */}
        <div className="bg-gray-900 relative rounded-lg w-44 h-40 mt-6 flex justify-center items-center">
          
          <QRCodeSVG className='absolute top-4 left-[40px] w-[100px]' fgColor={qrCode.chooseColor} bgColor={qrCode.qrColor}  value={qrCode.link}/>
        </div>
      </div>
    ))
  ) : (
    <p>No QR Codes available</p> // Fallback message if no qrCodes are found
  )}
</div>

{/* Confirmation Modal */}
{isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-[#1e1e2d] rounded-lg p-6 w-[350px]">
                    <h2 className="text-white text-xl font-semibold mb-4">Delete QR Code</h2>

                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-red-600 p-4 rounded-full border-2 border-pink-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="36" height="36">
                          <path d="M3 6h18v2H3V6zm3 4v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10H6zm8 6v-6h2v6h-2zm-4 0v-6h2v6H10zm-3-14h10l1 1H6l1-1z" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-400 text-center mb-6">
                      <strong className='text-white text-2xl font-medium ml-3'>Delete This Qr Code</strong> <br />
                      <span className='ml-6'> Are you sure you want to delete <br /> this item?</span>
                    </p>

                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-14 rounded-lg"
                      >
                        No
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-14 rounded-lg"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}
        {activeTab === "counter" && (
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
      {qrCodes && qrCodes.length > 0 ? (
     qrCodes
     .filter((qrCode) => qrCode.activeTab === activeTab) // Filter based on activeTab
     .map((qrCode) => (
      <div key={qrCode._id} className="bg-gray-700 rounded-lg flex h-[250px] flex-col items-center relative w-full">
        {/* Table Number Label and Three Dots in One Line (Cover Full Width) */}
        <div className="flex justify-between items-center w-full bg-gray-600 py-2 px-4 rounded-t-lg">
          <h2 className="text-lg font-semibold text-white">{`Counter No - ${qrCode.qrName}`}</h2>
          <div
            className="text-gray-400 cursor-pointer"
            onClick={() => toggledropdown(qrCode._id)}
            aria-label={`More options for table ${qrCode.qrName}`}
          >
            <FaEllipsisV />
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen === qrCode._id && (
          <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28 z-10">
            <a
              href='/createqrcode'
              className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
              onClick={() => handleEditClick(qrCode)}
            >
              Edit
            </a>
            <a
              className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
              onClick={() => handleDeleteClick(qrCode._id)}
            >
              Delete
            </a>
          </div>
        )}

        {/* QR Code Box with Full Width Dark Background */}
        <div className="bg-gray-900 relative rounded-lg w-44 h-40 mt-6 flex justify-center items-center">
          
          <QRCodeSVG className='absolute top-4 left-[40px] w-[100px]' fgColor={qrCode.chooseColor} bgColor={qrCode.qrColor} value={qrCode.link}/>
        </div>
      </div>
    ))
  ) : (
    <p>No QR Codes available</p> // Fallback message if no qrCodes are found
  )}
      </div>
      {/* Confirmation Modal */}
{isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-[#1e1e2d] rounded-lg p-6 w-[350px]">
                    <h2 className="text-white text-xl font-semibold mb-4">Delete QR Code</h2>

                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-red-600 p-4 rounded-full border-2 border-pink-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="36" height="36">
                          <path d="M3 6h18v2H3V6zm3 4v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10H6zm8 6v-6h2v6h-2zm-4 0v-6h2v6H10zm-3-14h10l1 1H6l1-1z" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-400 text-center mb-6">
                      <strong className='text-white text-2xl font-medium ml-3'>Delete This Qr Code</strong> <br />
                      <span className='ml-6'> Are you sure you want to delete <br /> this item?</span>
                    </p>

                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-14 rounded-lg"
                      >
                        No
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-14 rounded-lg"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
    </div>
  </section>
)}
      </main>
    </div>
  );
}

export default QrCode;