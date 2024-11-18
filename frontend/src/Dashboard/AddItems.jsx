
import React, { useState } from 'react';
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner,MdWindow, MdLogout, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch, FaEye, FaHome, FaRegMoneyBillAlt, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle ,IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { BiImageAdd } from "react-icons/bi";


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
    const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openDateModal = () => setIsDateModalOpen(true);
    const closeDateModal = () => setIsDateModalOpen(false);

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
        const togglePaymentHistory = () => setPaymentHistoryOpen(!paymentHistoryOpen);




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



    const orders = [
        { id: 1, customer: "Davis Lipshutz", item: "Rice", date: "10/02/2024", time: "3:45 PM", phone: "98568 86214", quantity: "500 G.M", tblno: "1", total: "₹ 500", payment: 'Online' },
        { id: 2, customer: "Marcus Dorwart", item: "Biryani Rice", date: "11/02/2024", time: "2:45 PM", phone: "96668 22214", quantity: "100 G.M", tblno: "2", total: "₹ 500", payment: 'Cash' },
    ];

    return (
        <div className="flex min-h-screen text-white font-sans" style={{ backgroundColor: "#0B0F1F" }}>
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
                                <a href="/parcelorder" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Parcel Order
                                </a>
                                <a href="/onsiteorder" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Onsite Order
                                </a>
                            </div>
                        )}
                    </div>
                    <a href="/managemenu" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
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
                                <a href="/parcelorder" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Parcel Order
                                </a>
                                <a href="/onsiteorder" className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
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
            <main className="flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-3 pb-4">
                    <div className="flex items-center text-white font-semibold">
                        <FaHome />
                        {/* <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}></h4> */}
                        {/* <h4 className="ml-2 border-l-[1px] pl-2" style={{ fontSize: '15px' ,color:"#CA923D"}}></h4> */}
                        <h1 className="text-md font-semibold  text-white ml-2">| Payment History <span style={{ color: "#CA923D" }} className='text-md font-semibold'>|  AddItems</span></h1>

                    </div>



                    <div className="flex items-center space-x-3">
                        <div className="relative ml-12">
                            <input
                                type="text"
                                placeholder="Search Here Your Delicious Food..."
                                className="w-[330px] h-[40px] p-2 pl-10 ml-52 bg-gray-800 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none text-md"
                                style={{ backgroundColor: '#2A2A38' }}
                            />
                            <FaSearch className="w-4 h-5 ml-52 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                        {/* <div className="relative rounded-full" style={{backgroundColor:'#2A2A38',padding:'12px'}}>
                            <svg className="w-6 h-6 text-gray-300 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a7 7 0 00-7 7v4.29l-1.71 1.7a1 1 000-.29.71v1a1 1 0 001 1h16a1 1 0 001-1v-1a1 1 0 00-.29-.71L19 13.29V9a7 7 0 00-7-7zm-1 18h2a1 1 0 01-2 0z" />
                            </svg>
                            <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500" />
                        </div> */}
                        <div className="relative rounded-full" style={{ backgroundColor: '#2A2A38', padding: '10px' }}>
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
                            <button className="flex items-center rounded-full space-x-2 focus:outline-none" style={{ backgroundColor: '#2A2A38', padding: '8px' }}>
                                <img src="./assets/images/header.png" alt="User" className="w-10 h-10 rounded-full" />
                                <span className="text-white text-sm">Musabbir Hossain</span>
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
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
                        <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>Step 1</h2>
                        <div >
                            <label
                                htmlFor="customization-title"
                                style={{ display: "block", color: "#fff" }}
                            >
                                Customization Title
                            </label>
                            <input
                                id="customization-title"
                                type="text"
                                placeholder="Enter Customization Title"
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
                                <input type="radio" name="selection" /> Multiple Selection
                            </label>
                            <label style={{ color: "#fff" }}>
                                <input type="radio" name="selection" /> Single Selection
                            </label>
                            <button
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: "#FFB74D",
                                    color: "#000",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    marginLeft: "290px",
                                }}
                            >
                                + Add Customization
                            </button>

                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <div style={{ marginRight: "10px", width: "30%" }}>
                                    <label
                                        htmlFor="customization-name-1"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Customization Name
                                    </label>
                                    <input
                                        id="customization-name-1"
                                        type="text"
                                        placeholder="Enter Customization Name"
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
                                    <label
                                        htmlFor="customization-detail-1"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Customization Detail
                                    </label>
                                    <input
                                        id="customization-detail-1"
                                        type="text"
                                        placeholder="Enter Customization Detail"
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
                                    <label
                                        htmlFor="extra-rate-1"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Extra Rate
                                    </label>
                                    <input
                                        id="extra-rate-1"
                                        type="text"
                                        placeholder="Enter Extra Rate"
                                        style={{
                                            padding: "10px",
                                            width: "100%",
                                            borderRadius: "5px",
                                            backgroundColor: "#343644",
                                            color: "#fff",
                                        }}
                                    />
                                </div>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginTop:'20px',
                                    }}
                                >
                                    🗑
                                </button>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <div style={{ marginRight: "10px", width: "30%" }}>
                                    <label
                                        htmlFor="customization-name-2"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Customization Name
                                    </label>
                                    <input
                                        id="customization-name-2"
                                        type="text"
                                        placeholder="Enter Customization Name"
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
                                    <label
                                        htmlFor="customization-detail-2"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Customization Detail
                                    </label>
                                    <input
                                        id="customization-detail-2"
                                        type="text"
                                        placeholder="Enter Customization Detail"
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
                                    <label
                                        htmlFor="extra-rate-2"
                                        style={{ display: "block", color: "#fff", marginBottom: "5px" }}
                                    >
                                        Extra Rate
                                    </label>
                                    <input
                                        id="extra-rate-2"
                                        type="text"
                                        placeholder="Enter Extra Rate"
                                        style={{
                                            padding: "10px",
                                            width: "100%",
                                            borderRadius: "5px",
                                            backgroundColor: "#343644",
                                            color: "#fff",
                                        }}
                                    />
                                </div>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        borderRadius: "5px",
                                        padding: "10px",
                                        marginTop:'20px',
                                    }}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    </div>
                )}



            </main>
        </div>
    );
}

export default AddItems;