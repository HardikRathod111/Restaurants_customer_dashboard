import React, { useEffect, useState } from 'react';
import {FaQrcode, FaHome, FaList, FaMoneyBillWave, FaSignOutAlt, FaEllipsisV,FaBoxOpen, FaUser, FaSearch, FaClipboardList} from 'react-icons/fa';
import {MdWindow, MdAddBox, MdAddToPhotos, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore,MdImage} from 'react-icons/md';
import { BiImageAdd } from "react-icons/bi";
import { IoMdLogOut } from 'react-icons/io';
import BurgerEditDetailsBox from "./BurgerEditDetailsBox";
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import axios from 'axios';


const Managemenu = () => {
    const [activeLink, setActiveLink] = useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('request');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dotsMenuOpen, setDotsMenuOpen] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [isVeg, setIsVeg] = useState(true);
      const [isOpen, setIsOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [Category, setCategory] = useState([]);
    const [open, setOpen] = useState(false)
    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    // Function to toggle between Veg and Non-Veg
    const toggleVegStatus = () => {
        setIsVeg(!isVeg);
    };

    const handleAddItemClick = () => {
        navigate('/additems', { state: { category: selectedCategory } });
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleManageOrder = () => setManageOrderOpen(!manageOrderOpen);
    const togglePaymentHistory = () => {
        setPaymentHistoryOpen(!PaymentHistoryOpen);
    }; 
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);       // To handle loading state
    const [error, setError] = useState(null);  // Initial empty state for categories
    const [addCat, setAddCat] = useState(false);
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://restaurants-customer-dashboard.onrender.com/api/v1/category/getCategory');
            
            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data);  // Set categories in state
        } catch (error) {
            setError(error.message);  // Set error message in state
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    };

    // Use useEffect to call fetchCategories when the component is mounted
    useEffect(() => {
        if(addCat){
            fetchCategories();
            setAddCat(false);
        }
    }, [addCat]); 

    useEffect(() => {
            fetchCategories(); 
    }, []); 

    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };    
    
    const handleOpenEdit = () => setIsEditOpen(true);
    const handleCloseEdit = () => setIsEditOpen(false);
    const handleSaveEdit = (details) => {
        console.log("Saved details:", details);
        setIsEditOpen(false);
    };
    const [editingItem, setEditingItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null); 

    const openEditModal = async (id) => {
        try {
          const response = await fetch(`https://restaurants-customer-dashboard.onrender.com/api/v1/manageorder/items/${id}`); // Adjust endpoint
          const data = await response.json();
      
          if (response.ok) {
            setEditingItem(data); // Store the item's data
            setIsEditOpen(true); // Open the modal
          } else {
            console.error("Error fetching item data:", data.message);
          }
        } catch (error) {
          console.error("Error in openEditModal:", error);
        }
      };
    const closeEditModal = () => {
        setIsEditOpen(false);
        setEditingItem(null);
    };

    const updateItem = async (updatedItem) => {
        try {
          const formData = new FormData();
      
          // Append text fields to FormData
          Object.keys(updatedItem).forEach((key) => {
            if (updatedItem[key] instanceof File) {
              // If the field is a file, it will be appended as a file
              formData.append(key, updatedItem[key]);
            } else {
              // For non-file fields
              formData.append(key, updatedItem[key]);
            }
          });
      
          const response = await fetch(`https://restaurants-customer-dashboard.onrender.com/api/v1/manageorder/editItem/${updatedItem._id}`, {
            method: 'PUT',
            body: formData,
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log('Item updated successfully:', data.message);
            // Update the local state here
            setItems((prevItems) =>
              prevItems.map((item) =>
                item._id === updatedItem._id ? { ...item, ...updatedItem } : item
              )
            );
            closeEditModal();
          } else {
            console.error('Failed to update item:', data.message || await response.text());
          }
        } catch (error) {
          console.error('Error updating item:', error);
        }
      };
      
      const handleOpenDelete = (item) => {
        setItemToDelete(item); // Store the entire item when delete button is clicked
        setIsDeleteOpen(true); // Open the delete confirmation modal
        };

        const handleCloseDelete = () => {
            setIsDeleteOpen(false); // Close the modal
            setItemToDelete(null); // Reset the item to delete
        };
    
        // Handle the deletion of the item by itemId
        const handleDelete = async (itemId) => {
            if (!itemId) {
                console.error("Invalid itemId!");
                return;
            }
    
            try {
                const response = await axios.delete(`https://restaurants-customer-dashboard.onrender.com/api/v1/manageorder/deleteItem/${itemId}`);
                console.log('Item deleted:', response.data);
                setRefreshKey((prevKey) => prevKey + 1);
                // Optionally, update the UI to reflect the deletion (e.g., remove item from the list)
                setIsDeleteOpen(false); // Close the modal after successful deletion
            } catch (error) {
                console.error('Error deleting item:', error);
                // Optionally, show an error message
            }
        };

    // Dropdown options for Item Name
    const itemNames = ["Biryani Rice", "Chicken Burger", "Veg Sandwich", "Pizza", "Pasta"];

    const getTabLabel = () => {
        switch (activeTab) {
        case 'request':
            return 'Manage Menu';
        case 'progress':
            return 'Add items';
        default:
            return 'QR Codes';
        }
    };

    const toggleDotsMenu = (itemId) => {
        setDotsMenuOpen(dotsMenuOpen === itemId ? null : itemId);
    };
    const navigate = useNavigate();
    const handlenavigateprofile = ()=> {
        navigate('/Profilepage');
    }
    const [categoryName, setCategoryName] = useState('');
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-fetch
     // Initial empty state for categories
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleAddCategory = async () => {
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('image', selectedImageFile); // Make sure selectedImageFile is a valid file object
    
        try {
            const response = await fetch('https://restaurants-customer-dashboard.onrender.com/api/v1/category/createCategory', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
    
            const result = await response.json();
            setAddCat(true);
            handleClosePopup();
            console.log('Category added successfully:', result);
        } catch (error) {
            console.error('Error adding category:', error);
        }
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

    const [items, setItems] = useState([]); // State to hold items

    useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://restaurants-customer-dashboard.onrender.com/api/v1/manageorder/getAllItems');
        console.log(response.data); // Log the response to verify the structure
        // Assuming the items are at response.data directly
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else if (response.data.items && Array.isArray(response.data.items)) {
          setItems(response.data.items);
        } else {
          setError('No items found');
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Error fetching items');
      } finally {
        setLoading(false);
        }
        };

        fetchItems(); // Call the function to fetch items
    }, [refreshKey]);
    
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

            {/* Main Content */}
            <main className="flex-1 lg:ml-[200px] md:ml-0 sm:w-svw p-6 bg-gray-900">
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

                {/* Main section goes here */}
                {/* Category Section */}
                <section className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Categories ({categories.length})</h3>
                        <button
                onClick={handleOpenPopup}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold sm:text-[12px] md:text-[16px] py-2 px-6 rounded-lg shadow-md flex items-center"
                >
                        <MdAddBox className="text-white mr-2" />
                        Add Category
                        </button>
                        {/* Popup */}
                        {isPopupOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-800 text-white rounded-lg p-6 md:w-96 sm:w-90">
            <h2 className="text-lg font-bold mb-4">Add Category</h2>

            {/* Category Name Input */}
            <div className="mb-4">
                <label className="block text-sm mb-2">Category Name</label>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter Category Name"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
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
                                <p className="text-blue-400">
                                    <BiImageAdd className="text-gray-400 text-5xl ml-32" />
                                    Upload Image <span className="text-white">or drag and drop</span> <br />
                                    <span className="text-sm text-gray-400">
                                        PNG, JPG, GIF up to 10MB
                                    </span>
                                </p>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleClosePopup}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddCategory}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
)}

                    </div>
                            {/* Displaying categories in a grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                    <button
                                        onClick={() => handleCategoryClick('All')}
                                        className=" text-white p-2 rounded-md flex items-center bg-yellow-600">
                                        <img
                                            src="./assets/images/pngwing 14-2.png"
                                            alt='all'
                                            className="w-10 h-10 mr-2 bg-gray-900"
                                        />
                                        All
                                    </button>
                                {categories.map((category, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCategoryClick(category.categoryName)}
                                        className={`bg-gray-800 text-white p-2 rounded-md flex items-center ${selectedCategory === category.name ? 'bg-yellow-600' : ''}`}
                                    >
                                        <img
                                            src={`https://restaurants-customer-dashboard.onrender.com/${category.image}`} 
                                            alt={category.categoryName}
                                            className="w-10 h-10 mr-2 bg-gray-900"
                                        />
                                    {category.categoryName}
                                    </button>
                                ))}
                            </div>

                    {/* Burger Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold  text-white mt-6">{selectedCategory}</h2>
                        <button
                            type="button"
                            onClick={handleAddItemClick}
                            className="bg-yellow-600 hover:bg-yellow-700 white mt-5 font-semibold sm:text-[14px] md:text-[16px] py-2 px-6 rounded-lg shadow-md flex items-center"
                        >
                            <MdAddBox className="text-white mr-2" />
                            Add {selectedCategory}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={item._id} className="bg-gray-800 w-full  rounded-lg p-4 text-gray-300 relative">
                                <div className='bg-gray-700 w-full h-36 flex items-center justify-center rounded-lg'>
                                <img src={`https://restaurants-customer-dashboard.onrender.com/${item.imageUrl}`} alt={item.itemName} className="w-40 ml-1 h-28  object-cover rounded-md mb-2" />
                                </div>

                                {/* Discount Label */}
                                {item.discount && (
                                    <div className="absolute top-0 left-2 bg-yellow-500 text-white text-sm px-1 py-1 rounded-md">
                                        {item.discount} %
                                    </div>
                                )}

                                <button
                                    onClick={() => toggleDotsMenu(item._id)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-200"
                                >
                                    <FaEllipsisV />
                                </button>

                                {dotsMenuOpen === item._id && (
                                    <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28">
                                        <button
                                            onClick={() => openEditModal(item._id)}
                                            className="hover:text-yellow-600 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            Edit Burger
                                        </button>
                                        {/* Edit Item Modal */}
                {isEditOpen && editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 text-white w-96 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

                        {/* Image Upload Section */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Upload Item Image
                            </label>
                            <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                className="w-full p-2 bg-gray-700 rounded"
                                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.files[0] })}
                            />
                            </div>
                        </div>

                        {/* Item Name Dropdown */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Item Name
                            </label>
                            <input
                                type="text"
                                value={editingItem.itemName}
                                onChange={(e) => setEditingItem({ ...editingItem, itemName: e.target.value })}
                                className="w-full p-2 bg-gray-700 rounded"
                            />
                        </div>

                        {/* Item Ingredients Input */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Item Ingredients
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                value={editingItem.ingredients}
                                onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value })}
                            />
                        </div>

                        {/* Item Rate and Discount */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium">
                                    Item Rate
                                </label>
                                <input
                                    type="number"
                                    value={editingItem.price}
                                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                    className="w-full p-2 bg-gray-700 rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium">
                                    Add Discount (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 bg-gray-700 rounded"
                                    value={editingItem.discount}
                                    onChange={(e) => setEditingItem({ ...editingItem, discount: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Select Availability */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Select Availability
                            </label>
                            <select
                                value={editingItem.availability}
                                onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value })}
                                className="w-full p-2 bg-gray-700 rounded"
                                >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => updateItem(editingItem)}
                                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

                                        {/* <BurgerEditDetailsBox
                                            isOpen={isEditOpen}
                                            onClose={handleCloseEdit}
                                            onSave={handleSaveEdit}
                                        /> */}
                                        <a  onClick={() => handleOpenDelete(item)}
                                            className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                                        >
                                            Delete
                                        </a>

                                        {/* Delete Confirmation Modal */}
                {isDeleteOpen && itemToDelete &&  (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 text-white w-80 p-6 rounded-lg shadow-lg relative">
                        <div className="flex flex-col items-center">
                            {/* Icon */}
                            <div className="bg-red-600 p-4 rounded-full mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 13h6m2 10H7a2 2 0 01-2-2V7h14v14a2 2 0 01-2 2zm5-19H5a2 2 0 00-2 2v2h18V4a2 2 0 00-2-2z"
                                    />
                                </svg>
                            </div>
                            {/* Message */}
                            <h2 className="text-lg font-bold mb-2">Delete {itemToDelete.itemName}</h2>
                            <p className="text-sm text-gray-400 mb-6 text-center">
                                Are you sure you want to delete this item?
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={handleCloseDelete}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-1/3"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleDelete(itemToDelete._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-1/3"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
                                    </div>
                                )}

                                <h3 className="text-base font-semibold">{item.itemName}</h3>
                                <p className="text-sm mt-1">{item.spiceLevel}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold text-white-400">{item.price}</span>
                                    {/* Veg/Non-Veg Icon */}
                                    <div className={`relative mb-2 border-dotted border-2 rounded-full p-3 ${item.itemType == 'veg' ? 'border-green-500' : 'border-red-500'}`}>
                                        <span
                                            className={`absolute bottom-3 right-3 transform translate-x-1/2 translate-y-1/2 rounded-full ${item.itemType == 'veg' ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: '15px', height: '15px' }} // Icon size
                                            title={item.itemType == 'veg' ? 'Veg' : 'Non-Veg'}
                                        />
                                        {/* Your other content here inside the border */}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No items found</p>
                    )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Managemenu;
