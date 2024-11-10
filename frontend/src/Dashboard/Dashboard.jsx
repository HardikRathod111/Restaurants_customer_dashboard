'use client'
import { MdDashboard, MdOutlineRestaurantMenu, MdOutlineQrCodeScanner, MdLogout, MdExpandMore } from 'react-icons/md';
import { FaBoxOpen, FaClipboardList, FaSearch } from 'react-icons/fa';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';
import { FaShoppingBag, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';
import { MoreHorizontal } from 'react-icons/ri';  // Import MoreHorizontal

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
  { name: 'Rice Noodles', price: 215.00, orderQty: 100, revenue: 21500.00, image: '/placeholder.svg?height=50&width=50' },
  { name: 'French Fries', price: 150.00, orderQty: 80, revenue: 12000.00, image: '/placeholder.svg?height=50&width=50' },
  { name: 'Biryani rice', price: 315.00, orderQty: 200, revenue: 63000.00, image: '/placeholder.svg?height=50&width=50' },
  { name: 'Pasta', price: 160.00, orderQty: 80, revenue: 12800.00, image: '/placeholder.svg?height=50&width=50' },
  { name: 'Salad', price: 280.00, orderQty: 100, revenue: 28000.00, image: '/placeholder.svg?height=50&width=50' },
  { name: 'Rice Noodles', price: 280.00, orderQty: 100, revenue: 28000.00, image: '/placeholder.svg?height=50&width=50' },
]

interface Notification {
  type: 'Parcel Order' | 'Table Order',
  customerName: string,
  phoneNumber: string,
  quantity: number,
  timeAgo: string,
  tableNo?: string
}

const notifications: Notification[] = [
  {
    type: 'Parcel Order',
    customerName: 'Lincoln Siphron',
    phoneNumber: '+91 89562 12345',
    quantity: 2,
    timeAgo: '2 Min Ago'
  },
  {
    type: 'Table Order',
    customerName: 'Lincoln Siphron',
    phoneNumber: '+91 89562 12345',
    quantity: 1,
    timeAgo: '15 Min Ago',
    tableNo: '10'
  },
  {
    type: 'Parcel Order',
    customerName: 'Lincoln Siphron',
    phoneNumber: '+91 89562 12345',
    quantity: 4,
    timeAgo: '1 Hrs Ago'
  }
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Added state for sidebar visibility
  
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible); // Added toggle function
  
  const [manageOrderOpen, setManageOrderOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const toggleManageOrder = () => {
        setManageOrderOpen(!manageOrderOpen);
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

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className={`bg-gray-800 w-64 min-h-screen flex flex-col p-4 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="flex items-center justify-center mb-8">
                    <img src="./assets/images/Frame 1000005156.png" alt="Logo" className="h-24 rounded-full mb-2" />
                </div>
                <nav className="flex flex-col space-y-4">
                    <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdDashboard className="mr-2" style={{ color: "#CA923D" }} />
                        Dashboard
                    </button>
                    <div>
                        {/* Manage Order Dropdown */}
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
                                <button className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Parcel Order
                                </button>
                                <button className="flex items-center p-2 rounded-md text-gray-300 hover:bg-gray-700">
                                    Onsite Order
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdOutlineRestaurantMenu className="mr-2" style={{ color: "#CA923D" }} />
                        Manage Menu
                    </button>
                    <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <FaClipboardList className="mr-2" style={{ color: "#CA923D" }} />
                        Payment History
                    </button>
                    <button className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700">
                        <MdOutlineQrCodeScanner className="mr-2" style={{ color: "#CA923D" }} />
                        QR Codes
                    </button>
                </nav>
                <button className="mt-auto p-3 bg-red-500 text-white rounded-md flex items-center">
                    <MdLogout className="mr-2" />
                    Log Out
                </button>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
            <p className="text-gray-400">JR's Restro</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Here Your Delicious Food..."
                className="bg-gray-800 rounded-full py-2 px-4 pl-10 w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative">
              <button 
                className="p-2 bg-gray-800 rounded-full relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg p-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-3 flex items-center space-x-3 hover:bg-gray-700 rounded-md">
                      <div>
                        <p className="text-sm">{notification.type}</p>
                        <p className="text-xs text-gray-400">{notification.customerName} - {notification.phoneNumber}</p>
                      </div>
                      <div className="ml-auto text-sm">{notification.timeAgo}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
              <span>Musabbir Hossain</span>
              <ChevronDown className="w-4 h-4" />
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


        

        {/* Charts */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">Customer Visit</h4>
              <select className="bg-gray-700 text-white rounded px-2 py-1">
                <option>Month</option>
                <option>Week</option>
                <option>Year</option>
              </select>
            </div>
            <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
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

        {/* Popular Dishes */}
        <div className="bg-gray-800 p-6 rounded-lg">
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
                <th className="py-2">Order Qty</th>
                <th className="py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {popularDishes.map((dish, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-2 flex items-center">
                    <img src={dish.image} alt={dish.name} className="w-8 h-8 mr-2 rounded" />
                    {dish.name}
                  </td>
                  <td className="py-2">₹{dish.price.toFixed(2)}</td>
                  <td className="py-2">{dish.orderQty}</td>
                  <td className="py-2">₹{dish.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}