// import React from 'react';
// import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout } from 'react-icons/md';
// import { FaBoxOpen, FaClipboardList, FaSearch } from 'react-icons/fa';
// import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';

// const ParcelOrder = () => {
//     const orders = [
//         { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", total: "₹ 500" },
//         { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", total: "₹ 500" },
//         // Add more order objects as needed
//     ];

//     return (
//         <div className="flex min-h-screen text-white font-sans" style={{backgroundColor:"#0B0F1F"}}>
//             {/* Sidebar */}
//             <aside className="w-[250px] p-4 flex flex-col" style={{backgroundColor:'#1F1D2B'}}>
//                 <div className="flex items-center justify-center mb-8">
//                     <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-24 rounded-full mb-2" />
//                 </div>
//                 <nav className="flex flex-col space-y-4">
//                     <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
//                         <MdDashboard className="mr-2" style={{color:"#CA923D"}}/>
//                         Dashboard
//                     </button>
//                     <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
//                         <FaBoxOpen className="mr-2" style={{color:"#CA923D"}}/>
//                         Manage Order
//                     </button>
//                     <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
//                         <MdOutlineRestaurantMenu className="mr-2" style={{color:"#CA923D"}}/>
//                         Manage Menu
//                     </button>
//                     <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
//                         <FaClipboardList className="mr-2" style={{color:"#CA923D"}}/>
//                         Payment History
//                     </button>
//                     <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
//                         <MdOutlineQrCodeScanner className="mr-2" style={{color:"#CA923D"}}/>
//                         QR Codes
//                     </button>
//                 </nav>
//                 <button className="mt-auto p-3 bg-red-500 text-white rounded-md flex items-center">
//                     <MdLogout className="mr-2" />
//                     Log Out
//                 </button>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-8">
//                 {/* Header */}
//                 <header className="flex justify-between items-center mb-6">
//                     <div className="flex items-center space-x-4">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search Here Your Delicious Food..."
//                                 className="p-2 pr-10 rounded bg-gray-700 text-gray-300 placeholder-gray-400"
//                             />
//                             <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
//                         </div>
//                         <div className="bg-gray-700 p-2 rounded-full">User Icon</div>
//                     </div>
//                 </header>

//                 {/* Tabs */}
//                 <div className="flex">
//                     <button className="px-2 py-2 " style={{Color:'#CA923D',backgroundColor:'#422F11'}}>Request For Payment</button>
//                     <button className="px-4 py-2 bg-gray-700 text-gray-300">In Progress</button>
//                     <button className="px-4 py-2 bg-gray-700 text-gray-300 ">Delivered</button>
//                 </div>

//                 {/* Table */}
//                 <div className="overflow-auto rounded-lg" style={{backgroundColor:'#1F1D2B'}}>
//                 <h1 className="text-2xl font-semibold m-5">Parcel Order</h1>

//                     <table className="w-full text-sm text-left">
//                         <thead>
//                             <tr className=" text-white" style={{backgroundColor:'#CA923D'}}>
//                                 <th className="px-6 py-3">Customer Name</th>
//                                 <th className="px-6 py-3">Items Name</th>
//                                 <th className="px-6 py-3">Date</th>
//                                 <th className="px-6 py-3">Time</th>
//                                 <th className="px-6 py-3">Customer Phone</th>
//                                 <th className="px-6 py-3">Quantity</th>
//                                 <th className="px-6 py-3">Total Bill</th>
//                                 <th className="px-6 py-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map(order => (
//                                 <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
//                                     <td className="px-6 py-4">{order.customer}</td>
//                                     <td className="px-6 py-4">{order.item}</td>
//                                     <td className="px-6 py-4">{order.date}</td>
//                                     <td className="px-6 py-4">{order.time}</td>
//                                     <td className="px-6 py-4">{order.phone}</td>
//                                     <td className="px-6 py-4">{order.quantity}</td>
//                                     <td className="px-6 py-4 text-green-500">{order.total}</td>
//                                     <td className="px-6 py-4 flex space-x-2">
//                                         <button className="bg-green-500 p-2 rounded text-white">
//                                             <IoMdCheckmarkCircle />
//                                         </button>
//                                         <button className="bg-red-500 p-2 rounded text-white">
//                                             <IoMdCloseCircle />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ParcelOrder;

import React, { useState } from 'react';
import { MdDashboard,MdWindow , MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdLogOut, IoMdCloseCircle } from 'react-icons/io';

const ParcelOrder = () => {
    const [manageOrderOpen, setManageOrderOpen] = useState(false);

     const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const toggleManageOrder = () => {
        setManageOrderOpen(!manageOrderOpen);
    };

          const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
    };
 

    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", total: "₹ 500" },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", total: "₹ 500" },
        // Add more order objects as needed
    ];

    return (
       <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-[200px] h-[900px] bg-gray-800 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          {/* Centered Image */}
          <img src="./assets/images/Frame 1000005156.png" alt="Logo" className=" h-20 rounded-full mb-2" />
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

                {/* Tabs */}
                <div className="flex">
                    <button className="px-2 py-2" style={{ color: '#CA923D', backgroundColor: '#422F11' }}>Request For Payment</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300">In Progress</button>
                    <button className="px-4 py-2 bg-gray-700 text-gray-300">Delivered</button>
                </div>

                {/* Table */}
                <div className="overflow-auto rounded-lg" style={{ backgroundColor: '#1F1D2B' }}>
                    <h1 className="text-2xl font-semibold m-5">Parcel Order</h1>

                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="text-white" style={{ backgroundColor: '#CA923D' }}>
                                <th className="px-6 py-3">Customer Name</th>
                                <th className="px-6 py-3">Items Name</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Customer Phone</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Total Bill</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.item}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">{order.time}</td>
                                    <td className="px-6 py-4">{order.phone}</td>
                                    <td className="px-6 py-4">{order.quantity}</td>
                                    <td className="px-6 py-4 text-green-500">{order.total}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="bg-green-500 p-2 rounded text-white">
                                            <IoMdCheckmarkCircle />
                                        </button>
                                        <button className="bg-red-500 p-2 rounded text-white">
                                            <IoMdCloseCircle />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ParcelOrder;