'use client'
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore , MdWindow } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle,IoMdLogOut } from 'react-icons/io';
import { FaShoppingBag, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';
import { MoreHorizontal } from 'react-icons/ri';  // Import MoreHorizontal
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
// import p_d_1 from '../assets/images/p_d_1.png';
// import fram_2 from '../assets/images/Frame 1000006002.png'
import { useState, useEffect } from 'react'
import { Bar, Pie ,Doughnut} from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PieController
} from 'chart.js'
import { Bell, ChevronDown, CreditCard, Grid, LogOut, Search, ShoppingBag, BookOpen, Tag, X } from 'lucide-react'
import axios from 'axios';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PieController
)

const sidebarItems = [
  { icon: Grid, label: 'Dashboard' },
  { icon: ShoppingBag, label: 'Manage Order' },
  { icon: BookOpen, label: 'Manage Menu' },
  { icon: CreditCard, label: 'Payment History' },
  { icon: Tag, label: 'QR Codes' },
]

const popularDishes = [
  { name: 'Rice Noodles', price: 215.00, orderQty: 100, revenue: 21500.00, image: 'p_d_1.png' },
  { name: 'French Fries', price: 150.00, orderQty: 80, revenue: 12000.00, image: 'p_d_2.png' },
  { name: 'Biryani rice', price: 315.00, orderQty: 200, revenue: 63000.00, image: 'thai-food.png' },
  { name: 'Pasta', price: 160.00, orderQty: 80, revenue: 12800.00, image: 'p_d_4.png' },
  { name: 'Salad', price: 280.00, orderQty: 100, revenue: 28000.00, image: 'p_d_5.png' },
  { name: 'Rice Noodles', price: 280.00, orderQty: 100, revenue: 28000.00, image: 'p_d_6.png' },
]



export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const [isOpen, setIsOpen] = useState(false);

    const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [PaymentHistoryOpen, setPaymentHistoryOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
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

    const toggleManageOrder = () => {
        setManageOrderOpen(!manageOrderOpen);
    };
    const togglePaymentHistory = () => {
    setPaymentHistoryOpen(!PaymentHistoryOpen);
    };
    useEffect(() => {
      console.log('Notifications visible:', showNotifications);
    }, [showNotifications]);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [30, 20, 30, 40, 10, 20, 60, 20, 50, 70, 20, 30],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 5,
      },
    ],
  }

  const doughnut = {
    labels: ['Parcel Order', 'Onsite Order'],
    datasets: [
      {
        data: [587, 475],
        backgroundColor: ['#f87171', '#fbbf24'],
      },
    ],
  }

  const handlenavigateprofile = ()=> {
    navigate('/Profilepage');
  }
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://restaurants-customer-dashboard.onrender.com/api/v1/resturant/getRestaurant');  // Ensure this matches the backend route
        setRestaurants(response.data);  // Save the fetched data into the state
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
    };

    fetchRestaurants();
  }, []); 

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

      </aside>

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


        <div className="flex flex-col 2xl:flex-row gap-8 mb-8 w-full">
  {/* Image Container */}
  <div className="flex-1 rounded-lg p-6 relative overflow-hidden w-full min-h-40 ">
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/Frame 1000006002.png`}
      alt="Restaurant interior"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>

  {/* Stats Section */}
  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
      <div className="p-3 bg-red-500 rounded-full">
        <FaShoppingBag className="text-white" />
      </div>
      <div>
        <h4 className="text-gray-300">Total Order Today</h4>
        <p className="text-3xl font-bold text-white">265</p>
      </div>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
      <div className="p-3 bg-green-500 rounded-full">
        <FaUsers className="text-white" />
      </div>
      <div>
        <h4 className="text-gray-300">Average Customer</h4>
        <p className="text-3xl font-bold text-white">589</p>
      </div>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
      <div className="p-3 bg-blue-500 rounded-full">
        <FaClock className="text-white" />
      </div>
      <div>
        <h4 className="text-gray-300">Average Waiting Time</h4>
        <p className="text-3xl font-bold text-white">00:30 Hr</p>
      </div>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg flex items-center gap-4">
      <div className="p-3 bg-yellow-500 rounded-full">
        <FaChartLine className="text-white" />
      </div>
      <div>
        <h4 className="text-gray-300">Today Revenue</h4>
        <p className="text-3xl font-bold text-white">₹256</p>
      </div>
    </div>
  </div>
</div>


        

<div className="grid grid-cols-1 2xl:grid-cols-12 xl:grid-cols-2 gap-8 mb-8">
  {/* Left Column (2 Charts) */}
  <div className="2xl:col-span-6 md:space-y-8 sm:space-y-0">
    {/* Customer Visit Chart */}
    <div className="bg-gray-800 p-6 rounded-lg 2xl:h-[360px] xl:h-[320px] sm:hidden md:block" >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold">Customer Visit</h4>
        <select className="bg-gray-700 text-white rounded px-2 py-1">
          <option>Month</option>
          <option>Week</option>
          <option>Year</option>
        </select>
      </div>
      <Bar
        data={barChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>

    {/* Orders Chart */}
    <div className="bg-gray-800 p-6 rounded-lg 2xl:h-[410px]">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold">Orders</h4>
        <select className="bg-gray-700 text-white rounded px-2 py-1">
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
      <div className="flex justify-center">
        <div className="w-64 h-64">
          <Doughnut data={doughnut} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold">587</p>
          <p className="text-gray-400">Parcel Order</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">475</p>
          <p className="text-gray-400">Onsite Order</p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column (Popular Dishes) */}
  <div className="bg-gray-800 p-6 rounded-lg 2xl:col-span-6 ">
    <div className="flex justify-between items-center mb-4">
      <h4 className="text-xl font-bold">Popular Dishes</h4>
      <select className="bg-gray-700 text-white rounded px-2 py-1">
        <option>Week</option>
        <option>Month</option>
        <option>Year</option>
      </select>
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-gray-400 text-left">
          <th className="py-2">Dish</th>
          <th className="py-2">Price</th>
          <th className="py-2 sm:hidden md:table-cell">Order Qty</th>
          <th className="py-2 sm:hidden md:table-cell">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {popularDishes.map((dish, index) => (
          <tr key={index} className="border-t border-gray-700">
            <td className="py-2 flex items-center">
              <img src={`${process.env.PUBLIC_URL}/assets/images/${dish.image}`} alt={dish.name} className="w-12 h-12 mr-2 rounded " />
              {dish.name}
            </td>
            <td className="py-2">₹{dish.price.toFixed(2)}</td>
            <td className="py-2 sm:hidden md:table-cell">{dish.orderQty}</td>
            <td className="py-2 sm:hidden md:table-cell">₹{dish.revenue.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </main>
    </div>
  )
}
