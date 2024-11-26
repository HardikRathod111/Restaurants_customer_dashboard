<<<<<<< HEAD

=======
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
import React, { useEffect, useState } from 'react';
import {FaQrcode, FaHome, FaList, FaMoneyBillWave, FaSignOutAlt, FaEllipsisV,FaBoxOpen, FaUser, FaSearch, FaClipboardList} from 'react-icons/fa';
import {MdWindow, MdAddBox, MdAddToPhotos, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdExpandMore,MdImage} from 'react-icons/md';
import { BiImageAdd } from "react-icons/bi";
import { IoMdLogOut } from 'react-icons/io';
import BurgerEditDetailsBox from "./BurgerEditDetailsBox";
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';


const Managemenu = () => {
    const [activeLink, setActiveLink] = useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('request');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dotsMenuOpen, setDotsMenuOpen] = useState(null);
    const [isVeg, setIsVeg] = useState(true);
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

    const handleOpenDelete = () => setIsDeleteOpen(true);
    const handleCloseDelete = () => setIsDeleteOpen(false);

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
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/category/getCategory');
            
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

    // Dropdown options for Item Name
    const itemNames = ["Biryani Rice", "Chicken Burger", "Veg Sandwich", "Pizza", "Pasta"];
    const menuItems = [
        {
            id: 1,
            name: 'Ham Cheeseburger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹380',
            discount: '20% OFF',
            imageUrl: './assets/images/pngwing 14.png',
            isVeg: true,
        },
        {
            id: 2,
            name: 'Green Leaves Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹80',
            discount: '',
            imageUrl: './assets/images/pngwing 13.png',
            isVeg: false,
        },
        {
            id: 3,
            name: 'Cheese Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹350',
            discount: '20% OFF',
            imageUrl: './assets/images/pngwing 14-2.png',
            isVeg: true,
        },
        {
            id: 4,
            name: 'Miso Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹260',
            discount: '10% OFF',
            imageUrl: './assets/images/pngwing 14.png',
            isVeg: true,
        },
        {
            id: 5,
            name: 'Burger Chefs',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹150',
            discount: '',
            imageUrl: './assets/images/pngwing 13-2.png',
            isVeg: false,
        },
        {
            id: 6,
            name: 'Burger Monsta',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹250',
            discount: '',
            imageUrl: './assets/images/pngwing 13.png',
            isVeg: false,
        },
        {
            id: 7,
            name: 'Cheese Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹350',
            discount: '20% OFF',
            imageUrl: './assets/images/pngwing 14.png',
            isVeg: true,
        },
        {
            id: 8,
            name: 'Paneer Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹260',
            discount: '10% OFF',
            imageUrl: './assets/images/pngwing 13-2.png',
            isVeg: false,
        },
        {
            id: 9,
            name: 'Green Leaves Burger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹200',
            discount: '',
            imageUrl: './assets/images/pngwing 14-3.png',
            isVeg: true,
        },
        {
            id: 1,
            name: 'Ham Cheeseburger',
            description: 'Premium beef, fresh brioche buns, crispy lettuce, tomatoes, cheese, pickles.',
            price: '₹290',
            discount: '20% OFF',
            imageUrl: './assets/images/pngwing 14.png',
            isVeg: true,
        },
    ];

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
     // Initial empty state for categories
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleAddCategory = async () => {
        const formData = new FormData();
        formData.append('categoryName', categoryName);
<<<<<<< HEAD
        formData.append('image', selectedImageFile); // Make sure selectedImageFile is a valid file object
=======
        formData.append('image', selectedImageFile); // Make sure `selectedImageFile` is a valid file object
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
    
        try {
            const response = await fetch('http://localhost:8080/api/v1/category/createCategory', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
<<<<<<< HEAD
                throw new Error(`${response.status}`);
=======
                throw new Error(`HTTP error! status: ${response.status}`);
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
            }
    
            const result = await response.json();
            console.log('Category added successfully:', result);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    
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
          <button className="flex items-center px-4 py-2 mr-12 mt-auto bg-red-500 rounded-md text-white ml-auto">
            <IoMdLogOut className="mr-2" />
            Log Out
          </button>

            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-[200px] md:ml-0 sm:w-svw p-6 bg-gray-900">
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

                {/* Main section goes here */}
                {/* Category Section */}
                <section className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Categories (250)</h3>
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
<<<<<<< HEAD
                                        className="bg-gray-800 text-white p-2 rounded-md flex items-center bg-yellow-600"
=======
                                        className={` text-white p-2 rounded-md flex items-center bg-yellow-600`}
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
                                    >
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
<<<<<<< HEAD
                                            src={`http://localhost:8080/${category.image}`} 
=======
                                            src={`http://localhost:8080/${category.image}`}
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
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
                        {menuItems.map((item) => (
                            <div key={item.id} className="bg-gray-800 w-full  rounded-lg p-4 text-gray-300 relative">
                                <div className='bg-gray-700 w-full h-36 flex items-center justify-center rounded-lg'>
                                <img src={item.imageUrl} alt={item.name} className="w-40 ml-1 h-28  object-cover rounded-md mb-2" />
                                </div>

                                {/* Discount Label */}
                                {item.discount && (
                                    <div className="absolute top-0 left-2 bg-yellow-500 text-white text-sm px-1 py-1 rounded-md">
                                        {item.discount}
                                    </div>
                                )}

                                <button
                                    onClick={() => toggleDotsMenu(item.id)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-200"
                                >
                                    <FaEllipsisV />
                                </button>

                                {dotsMenuOpen === item.id && (
                                    <div className="absolute top-10 right-2 bg-gray-700 text-white rounded-md shadow-md py-1 w-28">
                                        <button
                                            onClick={handleOpenEdit}
                                            className="hover:text-yellow-600 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        >
                                            Edit Burger
                                        </button>
                                        {/* Edit Item Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 text-white w-96 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4">Edit Item</h2>

                        {/* Image Upload Section */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Upload Item Image
                            </label>
                            <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center cursor-pointer">
                                <span className="text-gray-300">Change Image</span>
                            </div>
                        </div>

                        {/* Item Name Dropdown */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Item Name
                            </label>
                            <select className="w-full p-2 bg-gray-700 rounded">
                                {itemNames.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Item Ingredients Input */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Item Ingredients
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 bg-gray-700 rounded"
                                placeholder="Include ingredients..."
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
                                    className="w-full p-2 bg-gray-700 rounded"
                                    placeholder="₹500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium">
                                    Add Discount (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 bg-gray-700 rounded"
                                    placeholder="20"
                                />
                            </div>
                        </div>

                        {/* Select Availability */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                Select Availability
                            </label>
                            <select className="w-full p-2 bg-gray-700 rounded">
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between">
                            <button
                                onClick={handleCloseEdit}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCloseEdit}
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
                                        <a  onClick={handleOpenDelete}
                                            className="block w-full text-left px-4 py-2 hover:text-yellow-600 hover:bg-gray-600"
                                        >
                                            Delete
                                        </a>

                                        {/* Delete Confirmation Modal */}
            {isDeleteOpen && (
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
                            <h2 className="text-lg font-bold mb-2">Delete Hamburger</h2>
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
                                onClick={() => {
                                    handleCloseDelete();
                                    alert("Item Deleted!"); // Replace with your delete logic
                                }}
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

                                <h3 className="text-base font-semibold">{item.name}</h3>
                                <p className="text-sm mt-1">{item.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xl font-bold text-white-400">{item.price}</span>
                                    {/* Veg/Non-Veg Icon */}
                                    <div className={`relative mb-2 border-dotted border-2 rounded-full p-3 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                                        <span
                                            className={`absolute bottom-3 right-3 transform translate-x-1/2 translate-y-1/2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: '15px', height: '15px' }} // Icon size
                                            title={item.isVeg ? 'Veg' : 'Non-Veg'}
                                        />
                                        {/* Your other content here inside the border */}
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </section>
            </main>
        </div>
    );
};

<<<<<<< HEAD
export default Managemenu;
=======
export default Managemenu;
>>>>>>> f67d06d35eb50586b28fc9bc855ec648655fbfa4
