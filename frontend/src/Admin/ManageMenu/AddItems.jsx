
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { MdOutlineRestaurantMenu, MdOutlineQrCodeScanner,MdWindow, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch, FaHome} from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'

const AddItems = () => {
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [manageHistoryOpen, setManageHistoryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("request");
    const navigate = useNavigate();
    const [selected, setSelected] = useState("Veg");
    const [showForm, setShowForm] = useState(false);
    const [customizations, setCustomizations] = useState([{name:'', rate:'', detail:''}]);
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const category = location.state?.category
    const [steps, setSteps] = useState([
        { title: '',
        selection:'',
        options : [{name:'', detail:'', rate:'20'}] 
        }
    ]);
    const addStep = () => {

        setSteps((prev) => {
                const updatedFormData = [...prev,  { title: '',
                    selection:'',
                    options : [{name:'', detail:'', rate:''}] 
                    }]; //to Create a copy of the array
                console.log("update", updatedFormData);
                    
                return updatedFormData;
            });

    };

    
    const addCustomization = (index) => {
        const updatedFormData = [...steps];
            updatedFormData[index].options = [...updatedFormData[index].options, {name:'', detail:'', rate:''}]// console.log("MAIN", updatedFormData);
            
            console.log("upfatr", updatedFormData);
        setSteps(updatedFormData);
    };

    const handleChange = (index, field, value) => {
        setSteps((prevSteps) =>
            prevSteps.map((step, i) =>
                i === index ? { ...step, [field]: value } : step
            )
        );
    };
    
    const handleStepCustomiseChange = (stepIndex, customiseIndex, field, value) => {
        setSteps((prevSteps) =>
            prevSteps.map((step, i) =>
                i === stepIndex
                    ? {
                        ...step,
                        options: step.options.map((customise, j) =>
                            j === customiseIndex
                                ? { ...customise, [field]: value }
                                : customise
                        )
                        }
                    : step
            )
        );
    };
    
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Adjust this depending on where your user data is stored
        navigate("/login"); // Or any other page
    };
    const [adminData, setAdminData] = useState({});
    useEffect(() => {
    // Fetch admin data
    const token = localStorage.getItem("authToken");
    console.log(token);

    axios.get("https://restaurants-customer-dashboard.onrender.com/api/v1/adminedit/getadmin", {
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
    const handleCustoChange = (e,index, key) => {
        const { value } = e.target;
        
        setCustomizations((prev) => {
            const updatedFormData = [...prev]; // Create a copy of the array
            updatedFormData[index][key] = value; // Update the specific field
            console.log("up", updatedFormData);
            
            return updatedFormData;
        });
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Store the file in state
            setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
        }
    };

    const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
    const toggleManageHistory = () => setManageHistoryOpen(!manageHistoryOpen);
    const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
    }; 

    // Function to remove a customization
    const removeCustomization = (index) => {
        const updatedCustomizations = customizations.filter((_, i) => i !== index);
        setCustomizations(updatedCustomizations);
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

    const handlenavigateprofile = ()=> {
        navigate('/Profilepage');
    }

    const [imageFile, setImageFile] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const formData = {
            itemName: document.getElementById('item-name').value,
            ingredients: document.getElementById('item-ingredients').value,
            price: document.getElementById('item-price').value,
            discount: document.getElementById('item-discount').value,
            type: document.getElementById('item-type').value,
            spiceLevel: document.querySelector('input[name="spice-level"]:checked')?.value,
            customizations: steps, // Assuming `steps` holds customization data
            itemType : selected
        };
    
        // Handle image file separately
        const fileInput = document.getElementById('file-upload');
        const imageFile = fileInput?.files[0];
    
        if (imageFile) {
            formData.image = imageFile; // Add image to formData
        }
    
        try {
            
            console.log("REC?>>>>", formData);
            
            // Send form data including  image to backend
            const response = await axios.post('https://restaurants-customer-dashboard.onrender.com/api/v1/manageorder/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Item added successfull');
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
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
            {/* Main Content */}
            <main className="flex-1 lg:ml-[200px] md:ml-0 sm:w-svw p-6 bg-gray-900">
                {/* Header */}
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
        <div className="relative sm:w-[200px] md:w-[400px] sm:mr-0 md:mr-28 marker">
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
              className="relative cursor-pointer sm:hidden md:block"
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
                <div className=" rounded-lg p-5 mb-4 flex justify-between items-center" style={{ backgroundColor: '#1F1D2B' }}>
                    <h2 className="text-xl font-semibold text-white">Add Items {category}</h2>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSelected("veg")}
                            className={`flex items-center px-4 py-2 border-2 rounded-lg transition-colors duration-200 ${selected === "veg"
                                ? "border-green-500 text-green-500"
                                : "border-gray-500 text-gray-500"
                                }`}
                        >
                            <span
                                className={`w-3 h-3 rounded-lg ${selected === "veg" ? "bg-green-500" : "bg-gray-500"
                                    }`}
                            ></span>
                            <span className="ml-2">Veg</span>
                        </button>
                        <button
                            onClick={() => setSelected("nonveg")}
                            className={`flex items-center px-4 py-2 border-2 rounded-lg transition-colors duration-200 ${selected === "nonveg"
                                ? "border-red-500 text-red-500"
                                : "border-gray-500 text-gray-500"
                                }`}
                        >
                            <span
                                className={`w-3 h-3 rounded-full ${selected === "nonveg" ? "bg-red-500" : "bg-gray-500"
                                    }`}
                            ></span>
                            <span className="ml-2">Non Veg</span>
                        </button>
                    </div>
                </div>


                
                <section
                    className="bg-gray-800 p-3 rounded-lg mb-2  overflow-x-auto"
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
                                        {imageFile ? (
                                            <img
                                                src={URL.createObjectURL(imageFile)}
                                                alt="Preview"
                                                className="mx-auto h-32 w-auto object-cover rounded-md"
                                            />
                                        ) : (
                                            <p className="text-blue-400">
                                                Upload Image <span className="text-white">or drag and drop</span>
                                                <br />
                                                <span className="text-sm text-gray-400">
                                                    PNG, JPG, GIF up to 10MB
                                                </span>
                                            </p>
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
                                    onChange={(e) => handleChange(index, 'title', e.target.value)}
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
                                <input
                                    type="radio"
                                    name={`selection-${index}`}
                                    value="single"
                                    onChange={(e) => handleChange(index, 'selection', e.target.value)}
                                /> Single Selection
                                </label>
                                <label style={{ color: "#fff" }}>
                                    <input type="radio"
                                        name={`selection-${index}`}
                                        value="multiple"
                                        onChange={(e) => handleChange(index, 'selection', e.target.value)}
                                    /> Multiple Selection
                                </label>
                                    <button className='ml-80'
                        style={{
                            marginTop: "10px",
                            backgroundColor: "#FFB74D",
                            color: "#000",
                            padding: "10px 20px",
                            borderRadius: "5px",
                        }}
                        onClick={() =>addCustomization(index)}
                        // disabled={!steps.every(isStepFilled)}
                    >
                        + Add Customization
                    </button>

                        {
                            step.options.length > 0 && step.options.map((cust, customiseIndex) =>{
                                return(
                                    <>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ marginRight: "10px", width: "30%" }}>
                                        <label htmlFor={`customization-name-${index}`} style={{ display: "block", color: "#fff", marginBottom: "5px" }}>
                                            Customization Name
                                        </label>
                                        <input
                                            id={`customization-name-${index}`}
                                            type="text"
                                            value={cust.name}
                                            placeholder="Enter Customization Name"
                                            onChange={(e) =>
                                                handleStepCustomiseChange(index, customiseIndex, 'name', e.target.value)
                                            }
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
                                            value={cust.detail}
                                            placeholder="Enter Customization Detail"
                                            onChange={(e) =>
                                                handleStepCustomiseChange(index, customiseIndex, 'detail', e.target.value)
                                            }
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
                                            value={cust.rate}
                                            placeholder="Enter Extra Rate"
                                            onChange={(e) =>
                                                handleStepCustomiseChange(index, customiseIndex, 'rate', e.target.value)
                                            }
                                            style={{
                                                padding: "10px",
                                                width: "100%",
                                                borderRadius: "5px",
                                                backgroundColor: "#343644",
                                                color: "#fff",
                                            }}
                                        />
                                    </div>
                                        
                                    <button className='ml-3 mt-8'
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px",
                                        }}
                                    >
                                        🗑
                                    </button>
                                </div>
                                    </>
                                )

                            })
                        }
{/* 
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
                                        
                                    <button className='ml-3 mt-8'
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px",
                                        }}
                                    >
                                        🗑
                                    </button>
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
                                        
                                    <button className='ml-3 mt-8'
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px",
                                        }}
                                    >
                                        🗑
                                    </button>
                                </div>                                */}
                            </div>
                        ))}
                    </div>


                  <div className='space-x-3 font-medium text-lg'>
    <button
        className="border border-yellow-600 bg-yellow-600 rounded-md px-3 py-3"
        type='button'
        onClick={() =>addStep()}
    >
        Add Step {steps.length + 1} {/* Display the next step number */}
    </button>
    <button
        className="border border-gray-600 bg-gray-600 rounded-md px-8 py-3"
        type='button'
        onClick={handleSubmit} // Assuming `saveSteps` is the function to handle saving
        // disabled={steps.length < 3 || !steps.every(isStepFilled)} // Enable Save only when 3 steps are filled
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
