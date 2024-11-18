

import React, { useState } from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch,FaEye,FaHome  } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';


const ParcelOrder = () => {
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const[manageHistoryOpen,setManageHistoryOpen]=useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("request");
    const [selectedOrder, setSelectedOrder] = useState(null); // For selected order details
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
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

    const getTabLabel = () => {
        switch (activeTab) {
            case "request":
                return "Request For Payment";
            case "progress":
                return "In Progress";
            case "delivered":
                return "Delivered";
            default:
                return "";
        }
    };
    

    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", total: "₹ 500" },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", total: "₹ 500" },
    ];

    return (
        <div className="flex min-h-screen text-white font-sans" style={{ backgroundColor: "#0B0F1F" }}>
            {/* Sidebar */}
            <aside className="w-[200px] h-screen p-4 flex flex-col" style={{ backgroundColor: '#1F1D2B' }}>
                <div className="flex items-center justify-center mb-8">
                    <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-24 rounded-full mb-2" />
                </div>
                <nav className="flex flex-col space-y-4">
                    <a href='/dashboard' className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdDashboard className="mr-2" style={{ color: "#CA923D" }} />
                        Dashboard
                    </a>
                    <div>
                        <button
                            className="flex items-center p-3 w-full rounded-md text-gray-300 hover:bg-gray-700"
                            onClick={toggleManageOrder}
                        >
                            <FaBoxOpen className="mr-2" style={{ color: "#CA923D" }} />
                            Manage Order
                            <MdExpandMore className={`ml-auto transform ${manageOrderOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {manageOrderOpen && (
                            <div className="ml-8 mt-2 space-y-2">
                                <button 
                                 onClick={() => navigate('/parcelorder')}
                                className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Parcel Order
                                </button>
                                <button 
                                 onClick={() => navigate('/onsiteorder')}
                                className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Onsite Order
                                </button>
                            </div>
                        )}
                    </div>
                    <a href='/managemenu' className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdOutlineRestaurantMenu className="mr-2" style={{ color: "#CA923D" }} />
                        Manage Menu
                    </a>
                    <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700" onClick={toggleManageHistory}>
                        <FaClipboardList className="mr-2" style={{ color: "#CA923D" }} />
                        PaymentHistory
                        <MdExpandMore className={`ml-auto transform ${manageHistoryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {manageHistoryOpen && (
                            <div className="ml-8 mt-2 space-y-2">
                                <button 
                                 onClick={() => navigate('/paymentparcel')}
                                className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Parcel Order
                                </button>
                                <button 
                                 onClick={() => navigate('/paymentonsite')}
                                className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Onsite Order
                                </button>
                            </div>
                        )}
                    <a href='/qrcode' className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdOutlineQrCodeScanner className="mr-2" style={{ color: "#CA923D" }} />
                        QR Codes
                    </a>
                </nav>
                <button className="mt-auto p-3 bg-red-500 text-white rounded-md flex items-center">
                    <MdLogout className="mr-2" />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-6 pb-4">
                <div className="flex items-center text-white font-semibold">
                    <FaHome />
                    <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}>
                    {getTabLabel()}
                    </h4>
                </div>

                 

                    <div className="flex items-center space-x-3">
                    <div className="relative ml-12">
                        <input
                            type="text"
                            placeholder="Search Here Your Delicious Food..."
                            className="w-[330px] h-[40px] p-2 pl-10 ml-52 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none text-md"
                            style={{backgroundColor:'#2A2A38'}}
                        />
                        <FaSearch className="w-4 h-5 ml-52 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                        {/* <div className="relative rounded-full" style={{backgroundColor:'#2A2A38',padding:'12px'}}>
                            <svg className="w-6 h-6 text-gray-300 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a7 7 0 00-7 7v4.29l-1.71 1.7a1 1 000-.29.71v1a1 1 0 001 1h16a1 1 0 001-1v-1a1 1 0 00-.29-.71L19 13.29V9a7 7 0 00-7-7zm-1 18h2a1 1 0 01-2 0z" />
                            </svg>
                            <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500" />
                        </div> */}
                        <div className="relative rounded-full"  style={{backgroundColor:'#2A2A38',padding:'10px'}}>
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

                        <div className="relative">
                            <button className="flex items-center rounded-full space-x-2 focus:outline-none" style={{backgroundColor:'#2A2A38',padding:'8px'}}>
                                <img src="./assets/images/header.png" alt="User" className="w-10 h-10 rounded-full" />
                                <span className="text-white text-sm">Musabbir Hossain</span>
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5.25 7.5l4.25 4.25 4.25-4.25L15 9l-5 5-5-5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex">
                    <button 
                        onClick={() => setActiveTab("request")}
                        className={`px-4 py-2 rounded-ss-lg ${activeTab === "request" ? "border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]" : "bg-gray-700 text-gray-300"}`}
                    >
                        Request For Payment
                    </button>
                    <button 
                        onClick={() => setActiveTab("progress")}
                        className={`px-4 py-2 ${activeTab === "progress" ? "border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]" : "bg-gray-700 text-gray-300"}`}
                    >
                        In Progress
                    </button>
                    <button 
                        onClick={() => setActiveTab("delivered")}
                        className={`px-4 py-2 ${activeTab === "delivered" ? "border-b-2 border-yellow-500 bg-[#372f28] text-[#CA923D]" : "bg-gray-700 text-gray-300"} rounded-e-lg rounded-ee-none`}
                    >
                        Delivered
                    </button>
                    </div>


                {/* Tab Content */}
                <div>
                    {activeTab === "request" && (
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
                    )}
                    {activeTab === "progress" && 
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
                           <h2 className="text-xl font-semibold mb-4 underline-offset-[10px]" style={{textDecoration:'underline'}}>Parcel Payment Bill</h2>
                            <p className='p-2'><strong>Customer:</strong> {selectedOrder.customer}</p>
                            <p className='p-2'><strong>Date:</strong> {selectedOrder.date}</p>
                            <p className='p-2'><strong>Time:</strong> {selectedOrder.time}</p>
                            <p className='p-2'><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p className='p-2'><strong>Quantity:</strong> {selectedOrder.quantity}</p>
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

export default ParcelOrder;
