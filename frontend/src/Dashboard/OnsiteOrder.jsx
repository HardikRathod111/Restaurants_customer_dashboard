
import React, { useState } from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore ,MdWindow } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch,FaEye,FaHome  } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle ,IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


const OnsiteOrder = () => {
      const [manageOrderOpen, setManageOrderOpen] = useState(false);
  const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("progress");
    const [selectedOrder, setSelectedOrder] = useState(null); // For selected order details
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
  const togglePaymentHistory = () => setPaymentHistoryOpen(!paymentHistoryOpen);


    const handleViewBill = (order) => {
        setSelectedOrder(order); // Set the selected order details
        setShowModal(true); // Open the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
        setSelectedOrder(null); // Reset selected order
    };

    const getTabLabel = () => {
        switch (activeTab) {
            case "progress":
                return "In Progress";
            case "delivered":
                return "Order History";
            default:
                return "";
        }
    };
    

    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M",tblno:"1" ,total: "₹ 500" },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", tblno:"6" ,total: "₹ 500" },
    ];

    const occupiedTables = [
        { id: 2, items: 2, total: "₹1500.00" },
        { id: 8, items: 8, total: "₹1500.00" },
        { id: 10, items: 35, total: "₹1500.00" },
        { id: 9, items: 9, total: "₹1500.00" },
    ];

    const bil = [
        { id: 6, total: "₹1136.00", items: 2, status: "Bill Paid" },
        { id: 9, total: "₹1089.00", items: 8, status: "Bill Paid" },
        { id: 10, total: "₹3756.00", items: 35, status: "Bill Paid" },
        { id: 14, total: "₹1689.00", items: 9, status: "Bill Paid" },
        { id: 2, total: "₹1356.00", items: 9, status: "Bill Paid" },
    ];

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
          <a href='/managemenu' className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
            <MdOutlineRestaurantMenu className="mr-2 w-[20px] h-[20px] text-yellow-500" />
            Manage Menu
          </a>
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
                        onClick={() => setActiveTab("progress")}
                        className={`px-4 py-2 rounded-ss-lg ${activeTab === "progress" ? "border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]" : "bg-gray-700 text-gray-300"}`}
                    >
                        In Progress
                    </button>
                    <button 
                        onClick={() => setActiveTab("delivered")}
                        className={`px-4 py-2 ${activeTab === "delivered" ? "border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]" : "bg-gray-700 text-gray-300"} rounded-e-lg rounded-ee-none`}
                    >
                        Order History
                    </button>
                    </div>


                {/* Tab Content */}
                <div>
                    {activeTab === "progress" && 
                       <div className="overflow-auto rounded-ss-none rounded-r-lg rounded-bl-lg" style={{ backgroundColor: '#1F1D2B' }}>
                       <h1 className="text-2xl font-semibold m-5">Onsite Order</h1>
                       <div className="m-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 ">
                            {bil.map((bil) => (
                               <div key={bil.id} className="bg-[#252836] p-4 rounded-lg shadow-md space-y-2" style={{border:'1px solid #ffffff38'}}>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold" style={{ color: '#CA8631' }}>{bil.total}</h2>
                                    <button className="bg-[#CA8631] text-white text-xs px-3 py-1 rounded-full">Bill Paid</button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="text-blue-500 text-md " style={{color:'#5678E9'}}   onClick={() => handleViewBill(bil)}>View Bill</button>
                                    <p className="text-gray-700  font-bold" style={{color:'#463D37',fontSize:'25px'}}>{bil.id.toString().padStart(2, '0')}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        <h1 className="text-2xl font-semibold m-3">Occupied</h1>
                        <div className="m-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Occupied Tables */}
                {occupiedTables.map((table) => (
                    <div key={table.id} className="bg-[#252836] p-4 rounded-lg shadow-md space-y-2" style={{border:'1px solid #ffffff38'}}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold" style={{ color: 'white' }}>Total Items : <span style={{color:'#CA923D'}}>({table.items})</span></h2>
                        <button className="bg-[#CA8631] text-white text-md px-3 py-1 rounded" style={{backgroundColor:'#2D303E'}}> <FaEye style={{color:'#5678E9'}} onClick={() => handleViewBill(occupiedTables)}/></button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                    <h3 className="text-md font-semibold" style={{ color: 'white' }}>Total Bill : <span style={{color:'#CA923D'}}>{table.total}</span></h3>

                        <p className="text-gray-600 text-xl font-bold" style={{color:'#463D37',fontSize:'25px'}}>{table.id.toString().padStart(2, '0')}</p>
                    </div>
                </div>
                ))}
                        
            </div>
            <h1 className="text-2xl font-semibold m-3">Vacate</h1>
            <div className="m-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" >
                {/* Vacant Tables */}
                {[...Array(16 - occupiedTables.length)].map((_, index) => (
                    
                       <div key={index} className="bg-[#252836] p-4 rounded-lg shadow-md text-center text-gray-400 flex items-center justify-between" style={{border:'1px solid #ffffff38'}}>
                        
                        <h3 className="text-md font-semibold" style={{ color: '#ABBBC2' }}>Table No </h3>
                        <p className="text-gray-600 text-xl font-bold" style={{color:'#463D37',fontSize:'25px'}}>{index + occupiedTables.length + 1}</p>
                    </div>
                    
                ))}      
                </div>
                       </div>
                    }
                    {activeTab === "delivered" && 
                     <div className="overflow-auto rounded-ss-none rounded-r-lg rounded-bl-lg" style={{ backgroundColor: '#1F1D2B' }}>
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
                                 <th className="px-6 py-3">Table Number</th>
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
                                     <td className="px-6 py-4 text-center">{order.tblno}</td>
                                     <td className="px-6 py-4 text-green-500">{order.total}</td>
                                     <td className="px-6 py-4 flex space-x-2">
                                         <button className=" p-2 rounded text-white" style={{backgroundColor:'#5678E9'}}
                                          onClick={() => handleViewBill(order)}>
                                         <FaEye />
                                         </button>
                                      
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                     </div>
                    }
                </div>

                {/* Modal for viewing bill */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white text-white p-6 rounded-lg max-w-md w-full text-center"  style={{backgroundColor:'#252836'}}>
                           <div>
                           <h2 className="text-xl font-semibold mb-4 underline-offset-[10px]" style={{textDecoration:'underline'}}>Onsite Payment Bill</h2>
                            <p className='p-2'><strong>Customer:</strong> {selectedOrder.customer}</p>
                            <p className='p-2'><strong>Date:</strong> {selectedOrder.date}</p>
                            <p className='p-2'><strong>Time:</strong> {selectedOrder.time}</p>
                            <p className='p-2'><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p className='p-2'><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                            <p className='p-2'><strong>Table Number:</strong> {selectedOrder.tblno}</p>
                            <p className='p-2'><strong>Total Bill:</strong> {selectedOrder.total}</p>
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

export default OnsiteOrder;
