

import React, { useState } from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner,MdWindow, MdLogout, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch, FaEye, FaHome, FaRegMoneyBillAlt, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle ,IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'

const AddItems = () => {
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [manageHistoryOpen, setManageHistoryOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("request");
    const [selectedOrder, setSelectedOrder] = useState(null); // For selected order details
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState("Veg");
    const [showForm, setShowForm] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Month");
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [customizations, setCustomizations] = useState([]);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openDateModal = () => setIsDateModalOpen(true);
    const closeDateModal = () => setIsDateModalOpen(false);
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState("Month");
    const [isOpen, setIsOpen] = useState(false);

    const [stepIndex, setStepIndex] = useState(1); // Track the current step

    const toggleDropdown1 = () => setIsOpen(!isOpen);

       const [steps, setSteps] = useState([
        // Initial empty steps or data structure
        { title: '', name: '', detail: '', rate: '' },
    ]);

    // Function to add a new step
    const addStep = () => {
        setSteps([
            ...steps,
            { title: '', name: '', detail: '', rate: '' }, // Add an empty step
        ]);
    };

    // Function to handle the save action
    const saveSteps = () => {
        // Your logic to save the steps (e.g., API call or local storage)
        console.log('Steps saved:', steps);
        // Add your save logic here, e.g., sending steps to the server.
    };

     const handleChange = (e, stepIndex, field) => {
        const updatedSteps = [...steps];
        updatedSteps[stepIndex][field] = e.target.value;
        setSteps(updatedSteps);
    };

    // Check if all fields in a step are filled
    const isStepFilled = (step) => {
        return step.title && step.name && step.detail && step.rate;
    };

    const handleOptionClick1 = (option) => {
        setSelectedOption1(option);
        setIsOpen(false);
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        if (option === "Custom Date") {
            openDateModal();
        }
    };
    

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
    const toggleManageHistory = () => setManageHistoryOpen(!manageHistoryOpen);
    const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
    }; 



    const handleViewBill = (order) => {
        setSelectedOrder(order); // Set the selected order details
        setShowModal(true); // Open the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSelectedOrder(null); // Reset selected order
    };

    // Function to add a new customization
    const addCustomization = () => {
        setCustomizations([
            ...customizations,
            { name: '', detail: '', rate: '' },
        ]);
    };

    // Function to remove a customization
    const removeCustomization = (index) => {
        const updatedCustomizations = customizations.filter((_, i) => i !== index);
        setCustomizations(updatedCustomizations);
    };


    // Create a ref for the date input
    const dateInputRef = useRef(null);
    const dateInputRef1 = useRef(null);


    // Function to focus on the date input when the icon is clicked
    const handleIconClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // For browsers that support showPicker()
            dateInputRef.current.focus();       // For general focus
        }
    };
    const handleIconClick1 = () => {
        if (dateInputRef1.current) {
            dateInputRef1.current.showPicker(); // For browsers that support showPicker()
            dateInputRef1.current.focus();       // For general focus
        }
    };

    const getTabLabel = () => {
        switch (activeTab) {
            case "request":
                return "Manage Menu";   
            case "AddItem":
                return "Add Item";
            case "delivered":
                return "Delivered";
            default:
                return "";
        }
    };
    const [open, setOpen] = useState(false)
    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", tblno: "1", total: "₹ 500", payment: 'Online' },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", tblno: "2", total: "₹ 500", payment: 'Cash' },
    ];
    const handlenavigateprofile = ()=> {
        navigate('/Profilepage');
    }

    return (
        <div className="flex min-h-screen text-white font-sans" style={{ backgroundColor: "#0B0F1F" }}>
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
                {/* Header */}
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


                <div className=" rounded-lg p-5 mb-4 flex justify-between items-center" style={{ backgroundColor: '#1F1D2B' }}>
                    <h2 className="text-xl font-semibold text-white">Add Items</h2>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSelected("Veg")}
                            className={`flex items-center px-4 py-2 border-2 rounded-lg transition-colors duration-200 ${selected === "Veg"
                                ? "border-green-500 text-green-500"
                                : "border-gray-500 text-gray-500"
                                }`}
                        >
                            <span
                                className={`w-3 h-3 rounded-lg ${selected === "Veg" ? "bg-green-500" : "bg-gray-500"
                                    }`}
                            ></span>
                            <span className="ml-2">Veg</span>
                        </button>
                        <button
                            onClick={() => setSelected("Non Veg")}
                            className={`flex items-center px-4 py-2 border-2 rounded-lg transition-colors duration-200 ${selected === "Non Veg"
                                ? "border-red-500 text-red-500"
                                : "border-gray-500 text-gray-500"
                                }`}
                        >
                            <span
                                className={`w-3 h-3 rounded-full ${selected === "Non Veg" ? "bg-red-500" : "bg-gray-500"
                                    }`}
                            ></span>
                            <span className="ml-2">Non Veg</span>
                        </button>
                    </div>
                </div>


                <section
                    className="bg-gray-800 p-3 rounded-lg mb-2"
                    style={{ backgroundColor: "#2D303E" }}
                >

                    <table border="1" width="100%" cellpadding="10">
                        <tr>
                            <td>
                                <label htmlFor="item-name" className="text-gray-400 block mb-2">Item Name</label>
                                <input
                                    type="text"
                                    id="item-name"
                                    placeholder="Enter Item Name"
                                    className="p-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                                />
                            </td>
                            <td>
                                <label htmlFor="item-ingredients" className="text-gray-400 block mb-2">Item Ingredients</label>
                                <input
                                    type="text"
                                    id="item-ingredients"
                                    placeholder="Enter Item Ingredients"
                                    className="p-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                                />
                            </td>
                            <td>
                                <label htmlFor="item-price" className="text-gray-400 block mb-2">Item Price</label>
                                <input
                                    type="text"
                                    id="item-price"
                                    placeholder="Enter Item Price"
                                    className="p-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                                />
                            </td>
                            <td rowSpan="2">
                               <label className="block text-sm mb-2">Upload Item Image</label>
                                <div className="border-2 border-dashed border-gray-600 p-4 rounded-md text-center">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/gif"
                                        onChange={handleImageUpload}
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-yellow-500"
                                    >
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="mx-auto h-32 w-auto object-cover rounded-md"
                                            />
                                        ) : (
                                            <>
                                            <p className='text-blue-400'>
                                                <BiImageAdd className='text-gray-400 text-5xl ml-20'/>
                                            Upload Image <span className='text-white'>or drag and drop </span> <br />
                                                <span className="text-sm text-gray-400">
                                                    PNG, JPG, GIF up to 10MB
                                                </span>
                                                </p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="item-discount" className="text-gray-400 block mb-2">Add Discount</label>
                                <input
                                    type="text"
                                    id="item-discount"
                                    placeholder="Enter Add Discount"
                                    className="p-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                                />
                            </td>
                            <td>
                                <label htmlFor="item-type" className="text-gray-400 block mb-2">Item Type</label>
                                <select
                                    id="item-type"
                                    className="p-2 bg-gray-700 rounded-md text-white"
                                    defaultValue=""
                                    style={{ paddingRight: '50px' }}
                                >
                                    <option value="" disabled>Select Item Type</option>
                                    <option>Spicy</option>
                                    <option>Sweet</option>
                                </select>
                            </td>
                            <td>
                                <label className="text-gray-400 block mb-2">Spice Level</label>
                                <div className="col-span-2 flex space-x-4 text-white">
                                    <label className="flex items-center">
                                        <input type="radio" name="spice-level" value="Less Spicy" className="mr-2" />
                                        Less Spicy
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="spice-level" value="Regular Spicy" className="mr-2" />
                                        Regular Spicy
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="spice-level" value="Extra Spicy" className="mr-2" />
                                        Extra Spicy
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </table>


                </section>


                {/* Toggle form visibility */}
            <div>
            {/* Toggle form visibility */}
            <label>
                <input type="checkbox" onChange={() => setShowForm(!showForm)} className='mr-2' />
                Customization
            </label>

            {/* Conditionally render the image if the form is not visible */}
            {!showForm && (
                <div className="flex justify-center">
                    <img
                        src="/assets/images/Group 1116602033.png" // Replace with the actual image URL
                        alt="Illustration"
                        className="w-full max-w-xs mt-8"
                    />
                </div>
            )}

            {/* Form container */}
            {showForm && (
                <div style={{ marginTop: "10px", backgroundColor: "#1A1C23", padding: "20px", borderRadius: "10px" }}>
                    <div>
                        {steps.map((step, index) => (
                            <div key={index}>
                                <h2 style={{ fontSize: "23px", color: "#fff" }}>Step {index + 1}</h2>
                                <label
                                    htmlFor={`customization-title-${index}`}
                                    style={{ display: "block", color: "#fff" }}
                                >
                                    Customization Title
                                </label>
                                <input
                                    id={`customization-title-${index}`}
                                    type="text"
                                    value={step.title}
                                    placeholder="Enter Customization Title"
                                    onChange={(e) => handleChange(e, index, 'title')}
                                    style={{
                                        padding: "10px",
                                        marginRight: "10px",
                                        width: "30%",
                                        borderRadius: "5px",
                                        backgroundColor: "#343644",
                                        color: "#fff",
                                        marginBottom: "15px",
                                    }}
                                />
                                <label style={{ marginRight: "10px", color: "#fff" }}>
                                    <input type="radio" name={`selection-${index}`} /> Multiple Selection
                                </label>
                                <label style={{ color: "#fff" }}>
                                    <input type="radio" name={`selection-${index}`} /> Single Selection
                                </label>
                                      
                                   <button className='ml-80'
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#FFB74D",
                            color: "#000",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                        onClick={addStep}
                        disabled={!steps.every(isStepFilled)}
                    >
                        + Add Customization
                    </button>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`customization-name-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Customization Name
                                        </label>
                                        <input
                                            id={`customization-name-${index}`}
                                            type="text"
                                            value={step.name}
                                            placeholder="Enter Customization Name"
                                            onChange={(e) => handleChange(e, index, 'name')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`customization-detail-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Customization Detail
                                        </label>
                                        <input
                                            id={`customization-detail-${index}`}
                                            type="text"
                                            value={step.detail}
                                            placeholder="Enter Customization Detail"
                                            onChange={(e) => handleChange(e, index, 'detail')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`extra-rate-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Extra Rate
                                        </label>
                                        <input
                                            id={`extra-rate-${index}`}
                                            type="text"
                                            value={step.rate}
                                            placeholder="Enter Extra Rate"
                                            onChange={(e) => handleChange(e, index, 'rate')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                        
                                     {index = 1 && (
                                    <button className='ml-3 mt-8'
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px",
                                        }}
                                        onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                                    >
                                        🗑
                                    </button>
                                )}

                                </div>

                                 <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`customization-name-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Customization Name
                                        </label>
                                        <input
                                            id={`customization-name-${index}`}
                                            type="text"
                                            value={step.name}
                                            placeholder="Enter Customization Name"
                                            onChange={(e) => handleChange(e, index, 'name')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`customization-detail-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Customization Detail
                                        </label>
                                        <input
                                            id={`customization-detail-${index}`}
                                            type="text"
                                            value={step.detail}
                                            placeholder="Enter Customization Detail"
                                            onChange={(e) => handleChange(e, index, 'detail')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`extra-rate-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Extra Rate
                                        </label>
                                        <input
                                            id={`extra-rate-${index}`}
                                            type="text"
                                            value={step.rate}
                                            placeholder="Enter Extra Rate"
                                            onChange={(e) => handleChange(e, index, 'rate')}
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                        
                                     {index = 1 && (
                                    <button className='ml-3 mt-8'
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px",
                                        }}
                                        onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                                    >
                                        🗑
                                    </button>
                                )}
                                </div>                               
                            </div>
                        ))}
                    </div>


                  <div className='space-x-3 font-medium text-lg'>
    <button
        className="border border-yellow-600 bg-yellow-600 rounded-md px-3 py-3"
        type='button'
        onClick={addStep}
    >
        Add Step {steps.length + 1} {/* Display the next step number */}
    </button>
    <button
        className="border border-gray-600 bg-gray-600 rounded-md px-8 py-3"
        type='button'
        onClick={saveSteps} // Assuming `saveSteps` is the function to handle saving
        disabled={steps.length < 3 || !steps.every(isStepFilled)} // Enable Save only when 3 steps are filled
    >
        Save
    </button>
</div>

                </div>
            )}
        </div>



            </main>
        </div>
    );
}

export default AddItems;
