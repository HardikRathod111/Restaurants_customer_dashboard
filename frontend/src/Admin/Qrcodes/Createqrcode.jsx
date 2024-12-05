import React, { useEffect, useRef, useState } from 'react';
import { 
  FaHome, FaBoxOpen, FaSearch, FaClipboardList 
} from 'react-icons/fa';
import { MdWindow, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore } from 'react-icons/md';
import { IoMdLogOut } from 'react-icons/io';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {QRCodeSVG} from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Createqrcode = () => {
  const location = useLocation();
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [qrCodeData, setQrCodeData] = useState(location.state?.qrCode || {}); // Access passed QR code data
  const [category, setCategory] = useState(qrCodeData.contentCategory || 'Food & Drink');
  const [link, setLink] =  useState(qrCodeData.link || '');
  const [additionalText, setAdditionalText] =useState(qrCodeData.additionalText || '');
  const [chooseColor, setChooseColor] = useState(qrCodeData.chooseColor || '#000000');
  const [frameColor, setFrameColor] = useState(qrCodeData.frameColor || '#000000');
  const [qrColor, setQRColor] =  useState(qrCodeData.qrColor || '#000000');
  const [contentCategory, setContentCategory] = useState('Food & Drink'); // State for content category
  const [qrName, setQRName] =  useState(qrCodeData.qrName || ''); // State for QR Name

  const isEditing = Boolean(qrCodeData);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
  const togglePaymentHistory = () => setPaymentHistoryOpen(!PaymentHistoryOpen);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const { qrCode } = location.state || {};

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
  console.log(activeTab);
  

  const handlenavigateprofile = ()=> {
    navigate('/Profilepage');
  }

  const handleSubmit = async () => {
    const qrData = {
      activeTab,
      link,
      qrName,
      additionalText,
      chooseColor,
      frameColor,
      qrColor,
      contentCategory
  };
  console.log(qrData);
    if (qrCode) {
      // Update QR Code
      await updateQrCode(qrCode._id, qrData); // Call the update function from your API
    } else {
      // Create a new QR Code
      await createQrCode(qrData); // Call the create function from your API
    }
  };

  const createQrCode = async (qrData) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/qrCode/createQrCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('QR Code created successfully!');
        navigate('/qrcode');
        // Optionally, navigate back or refresh the list
      } else {
        alert('Failed to create QR Code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again later.');
    }
  };

  const updateQrCode = async (id, qrData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/qrCode/updateQrCode/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('QR Code updated successfully!');
        navigate('/qrcode');
        // Optionally, navigate back or refresh the list
      } else {
        alert('Failed to update QR Code');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again later.');
    }
  };

  const handleDownload = () => {
    const svgElement = qrCodeRef.current; // The QRCodeSVG component reference
    const svgData = new XMLSerializer().serializeToString(svgElement);

    // Create a Blob from the SVG data
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create a temporary image element to load the SVG and convert it to a PNG
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      // Set the canvas size to the size of the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      context.drawImage(img, 0, 0);

      // Convert the canvas to a PNG data URL
      const pngUrl = canvas.toDataURL("image/png");

      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "QRCode.png"; // Name of the downloaded image
      link.click();
    };
    img.src = svgUrl; // Set the image source to the SVG data
  };


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Or any other page
  };
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);

    axios.get("http://localhost:8080/api/v1/adminedit/getadmin", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(response => {
    if (response.data.success) {
      setAdminData(response.data.data); 
    }
  })
  .catch(error => {
      console.error("Error fetching admin data:", error);
  });
  }, []);
  const qrCodeRef = useRef(null);

  return (
    <div className="flex bg-gray-900 text-white font-sans">
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
            onClick={handleLogout}>
            <IoMdLogOut className="mr-2" />
            Log Out
          </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-[200px] md:ml-0 sm:w-svw bg-gray-900">
      <header className="flex justify-between sm:justify-normal md:justify-between items-center mb-6 pb-4 ">
        {/* Welcome Text */}
        <div className="flex items-center xl:flex sm:hidden text-white font-semibold">
          <FaHome />
          <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}>
          {getTabLabel()}
          </h4>
        </div>

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
        <button className="flex items-center px-4 py-2 mr-12 md:mt-6 bg-red-500 rounded-md text-white ml-auto"
          onClick={handleLogout}>
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
        <div className="relative w-[400px] mr-28  marker">
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
        <section>
            <div className="relative bg-gray-900 rounded-lg   w-full overflow-auto rounded-ss-none rounded-r-lg rounded-bl-lg">
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
              placeholder="https://www.example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
                value={qrName}
                onChange={(e) => setQRName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Select Content Category</label>
              <select className="bg-gray-700 p-3 rounded w-full text-gray-200"  value={contentCategory}
                onChange={(e) => setContentCategory(e.target.value)} >
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
                  <div className="w-4 h-4 rounded-full"  style={{ backgroundColor: chooseColor }}></div>
                  <span className="ml-2">{chooseColor}  </span>
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
             {/* Thematic Icons Section */}
        <div className="grid grid-cols-3 gap-1  mb-6">
          <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            {/* Insert SVG or Icon Here */}
            <span className="text-lg">
              <img src='./assets/images/qrcode_undefined_undefined.png' alt='logo' className='w-16'/>
            </span>
          </div>
          <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            <span className="text-xl">
              <img src='./assets/images/Group 1116601973.png' alt='logo' className='w-20'/>
            </span>
          </div>
          <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            <span className="text-xl">
              <img src='./assets/images/Group 1116601958.png' alt='logo' className='w-20'/>
            </span>
          </div>
          <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            <span className="text-xl">
              <img src='./assets/images/Group 1116601960.png' alt='logo' className='w-20'/>
            </span>
          </div>
          <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            <span className="text-xl">
              <img src='./assets/images/Group 1116601959.png' alt='logo' className='w-20'/>
            </span>
          </div>
            <div className="bg-[#2B2F3F] rounded-lg w-[200px] p-1 flex justify-center items-center">
            <span className="text-xl">
              <img src='./assets/images/Group 1116601961.png' alt='logo' className='w-20'/>
            </span>
          </div>
        </div>

        {/* Download Button */}
        <div className=" justify-center">
          <div className="bg-[#2B2F3F] relative rounded-lg w-[250px] h-[200px] ml-[290px] p-1 flex justify-center items-center" id="download-container">
            <span className="text-xl">
              <img src='./assets/images/qrcode_undefined_undefined_2.png' alt='logo' className='w-96' />
              <QRCodeSVG className='absolute top-10 left-[90px] w-[75px]' ref={qrCodeRef}  value={link}/>
            </span>
          </div>
          <button className="bg-[#A870FF] text-white px-6 py-2 mt-5 ml-[340px] rounded-lg font-semibold shadow-md hover:bg-[#9142FF]"   onClick={async () => {
            // Run both functions in parallel
            await Promise.all([handleSubmit(), handleDownload()]);
          }}>
          {qrCode ? 'Update QR Code' : 'Create QR Code'}
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