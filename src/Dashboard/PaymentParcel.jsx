
import React, { useState } from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore ,MdWindow} from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch, FaEye, FaHome, FaRegMoneyBillAlt, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle ,IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'


const PaymentParcel = () => {
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [manageHistoryOpen, setManageHistoryOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("request");
    const [selectedOrder, setSelectedOrder] = useState(null); // For selected order details
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);

    const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
      };    

    const [selectedOption, setSelectedOption] = useState("Month");
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openDateModal = () => setIsDateModalOpen(true);
    const closeDateModal = () => setIsDateModalOpen(false);
    const [open, setOpen] = useState(false)
    const [selectedOption1, setSelectedOption1] = useState("Month");
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown1 = () => setIsOpen(!isOpen);

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


    const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
    const toggleManageHistory = () => setManageHistoryOpen(!manageHistoryOpen);


    const handleViewBill = (order) => {
        setSelectedOrder(order); // Set the selected order details
        setShowModal(true); // Open the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSelectedOrder(null); // Reset selected order
    };


    // Create a ref for the date input
    const dateInputRef = useRef(null);
    const dateInputRef1 = useRef(null);
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
      };
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

    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", total: "₹ 500", payment: 'Online' },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", total: "₹ 500", payment: 'Cash' },
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
                <header className="flex justify-between sm:justify-normal md:justify-between items-center mb-6 pb-4">
                    <div className="flex items-center xl:flex sm:hidden text-white font-semibold">
                        <FaHome />
                        {/* <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}></h4> */}
                        {/* <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}></h4> */}
                        <h1 className="text-md font-semibold  text-white ml-2">| Payment History <span style={{ color: "#CA923D" }} className='text-md font-semibold'>| Parcel Order</span></h1>

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




                <div className=" rounded-lg p-5 sm:hidden md:flex mb-4 flex justify-between items-center" style={{ backgroundColor: '#1F1D2B' }}>
                    <h2 className="text-xl font-semibold text-white">Payment Details</h2>
                    <div className="flex items-center space-x-3">
                        <span>Total Customer : <strong className="text-green-400 text-xl">589 </strong></span>
                        <span>|    Total Bill : <strong className="text-green-400 text-xl">265</strong></span>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-gray-200 bg-gray-800 border border-gray-600 rounded-md px-4 py-2 flex items-center justify-between w-40"
                            >
                                {selectedOption}
                                <svg
                                    className="w-4 h-4 ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                                    <ul>
                                        {["Month", "Week", "Day", "Custom Date"].map((option) => (
                                            <li
                                                key={option}
                                                onClick={() => handleOptionClick(option)}
                                                className="px-4 py-2 text-gray-300 cursor-pointer hover:bg-gray-700 flex items-center"
                                            >
                                                <span className={`mr-2 w-4 h-4 rounded-full border-2 ${selectedOption === option
                                                    ? "border-orange-500 bg-orange-500"
                                                    : "border-gray-500"
                                                    }`} />
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* Custom Date Modal */}
                {isDateModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-[#252836] rounded-lg p-6 w-[300px] sm:w-[400px] md:w-[500px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white text-lg font-semibold">Custom Date</h3>
                        
                                <button onClick={closeDateModal} style={{backgroundColor:'#E74C37'}} className='rounded-full p-1'>
                                    <FaTimes className="text-black-400" />
                                </button>
                            </div>
                            <hr style={{color:'#999393'}}/>
                            <div className="flex flex-col space-y-4 mt-4">
                                <div>
                                    <label className="text-gray-300 text-sm">From</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="DD/MM/YYYY"
                                            ref={dateInputRef} // Assign ref to the input
                                            className="w-full h-10 p-2 bg-gray-800 rounded-md text-gray-300 placeholder-gray-400 focus:outline-none"
                                            style={{backgroundColor:'#2D303E',border:'1px solid #999393'}}
                                        />
                                        <FaCalendarAlt
                                            onClick={handleIconClick} // Call the function on icon click
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-300 text-sm">To</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="DD/MM/YYYY"
                                            ref={dateInputRef1} // Assign ref to the input
                                            className="w-full h-10 p-2 bg-gray-800 rounded-md text-gray-300 placeholder-gray-400 focus:outline-none"
                                            style={{backgroundColor:'#2D303E',border:'1px solid #999393'}}
                                        />
                                        <FaCalendarAlt
                                            onClick={handleIconClick1} // Call the function on icon click
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                <section className="bg-gray-800 p-6 rounded-lg" style={{ backgroundColor: '#2D303E' }}>
                    <div className="flex justify-between mb-6">
                        <h1 className="text-2xl font-semibold ">Parcel Order</h1>






                    </div>
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="w-full text-sm text-left ">
                            <thead>
                                <tr className="text-white " style={{ backgroundColor: '#CA923D' }}>
                                    <th className="px-6 py-3">Customer Name</th>
                                    <th className="px-6 py-3">Customer Phone</th>
                                    <th className="px-6 py-3">Items Name</th>
                                    <th className="px-6 py-3">Quantity</th>
                                    <th className="px-6 py-3">Total Bill</th>
                                    <th className="px-6 py-3">Payment Type</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700" style={{ backgroundColor: '#1F1D2B' }}>
                                        <td className="px-6 py-4">{order.customer}</td>
                                        <td className="px-6 py-4">{order.phone}</td>
                                        <td className="px-6 py-4">{order.item}</td>
                                        <td className="px-6 py-4">{order.quantity}</td>
                                        <td className="px-6 py-4 text-green-500">{order.total}</td>
                                        <td className="px-6 py-4 text-green-500">
                                            <div>
                                                {order.payment === "Online" ? (
                                                    <div className="flex items-center px-4 py-1 rounded-full text-white bg-[#1F3746] space-x-2">
                                                        <FaRegMoneyBillAlt className="w-4 h-4 text-[#18D8FF]" />
                                                        <span className="text-sm text-[#18D8FF]">Online</span>
                                                    </div>
                                                ) : (
                                                    // Here you can add another component or text for the "else" case if needed.
                                                    <div className="flex items-center px-4 py-1 rounded-full text-white bg-[#35383C] space-x-2">
                                                        <FaRegMoneyBillAlt className="w-4 h-4 text-[#AFD19A]" />
                                                        <span className="text-sm text-[#AFD19A]">Cash</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button className=" p-2 rounded text-white" style={{ backgroundColor: '#5678E9' }}
                                                onClick={() => handleViewBill(order)}>
                                                <FaEye />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Modal for viewing bill */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white text-white p-6 rounded-lg max-w-md w-full text-center" style={{ backgroundColor: '#252836' }}>
                            <div>
                                <h2 className="text-xl font-semibold mb-4 underline-offset-[10px]" style={{ textDecoration: 'underline' }}>Parcel Payment Bill</h2>
                                <p className='p-2'><strong>Customer:</strong> {selectedOrder.customer}</p>
                                <p className='p-2'><strong>Phone:</strong> {selectedOrder.phone}</p>
                                <p className='p-2'><strong>Items:</strong> {selectedOrder.item}</p>
                                <p className='p-2'><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                                <p className='p-2'><strong>Total Bill:</strong> {selectedOrder.total}</p>
                                <p className='p-2'><strong>Payment type:</strong> {selectedOrder.payment}</p>

                            </div>
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

export default PaymentParcel;