"use client";

import { FaChevronLeft, FaTrash, FaCaretRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import axios from "axios";
import { useUser } from '../UserContext';
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CartPage({ cartItems }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [items, setItems] = useState([]); // Cart items
  const [cookingRequest, setCookingRequest] = useState("");
  const [loading, setLoading] = useState(""); // Loading state
  const [error, setError] = useState(""); // Error state
  const { user } = useUser();
  const Navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('Online');
  const [isTimerPopupOpen, setIsTimerPopupOpen] = useState(false);


  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  const handlePayClick = () => {
    if (selectedPayment === 'Cash') {
      setIsPopupOpen(false);
      setIsTimerPopupOpen(true);
    } else {
      // Navigate to the payment method page for online payment
      // Use window.location for navigation instead of Next.js router
      window.location.href = '/paymentmethod';
    }
  };

  useEffect(() => {

    console.log("useEffect", user);
    
    const fetchOrderData = async () => {
      console.log("fetch");
      
      try {
        setLoading(true); // Set loading to true when starting fetch
        const response = await axios.get(`http://localhost:8080/api/v1/addCart/getOrder/${user._id}`);

        console.log("API Response:", response)

        if (response.status === 200) {
          const fetchedItems = response.data.order || [];
          setItems(fetchedItems);
        }
      } catch (error) {
        setError("Error fetching order. Please try again later.");
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    if (user?._id) fetchOrderData(); // Ensure user._id is available before making API call
  }, []); // Fetch when the user context changes

  const incrementQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleNavigateHome = () => {
    Navigate('/parcel-homepage');
  }

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  console.log("Cart Items Structure:", items);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.itemId.price * item.quantity, // `item.price` and `item.quantity` exist
    0
  );// Default to 0 if items is undefined or empty
  console.log(totalPrice);
  

  const cgst = totalPrice * 0.025;
  const sgst = totalPrice * 0.025;
  const payableAmount = totalPrice + cgst + sgst;

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <a href="/parcel-homepage" className="p-2">
          <FaChevronLeft className="w-6 h-6" />
        </a>
        <h1 className="text-lg font-medium">Cart</h1>
        <button className="text-sm text-yellow-500" onClick={handleNavigateHome}>+ Add Items</button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
      {items.length === 0 ? (
          <p className="text-center mt-4">Your cart is empty.</p>
        ) : (
        items.map((item) => (
          <div
            key={item.itemId}
            className="bg-slate-900 border border-slate-800 p-3 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center">
                  <span role="img" aria-label="burger" className="text-xl">
                  <img
                  src={`http://localhost:8080/${item.itemID}`}
                  alt={item.itemId.itemName}
                  />
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="text-black bg-yellow-600 p-1 rounded-full flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="text-black bg-yellow-600 p-1 rounded-full flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-medium">
                  ₹ {item.itemId.price * item.quantity}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
        {/* Cooking Request */}
             <div className="mt-10">
          <p className="text-sm text-white mb-2">
            Add Cooking Request <span className="text-slate-400">(Optional)</span>
          </p>
          <textarea
            placeholder="Lorem Ipsum is simply dummy text of "
            value={cookingRequest}
            onChange={(e) => setCookingRequest(e.target.value)}
            className="bg-gray-700 border border-slate-800 text-white rounded-lg w-full  pl-4 pt-1 h-10  
             resize-none"
          />
        </div>

        {/* Price Breakdown */}
        <div className="mt-10 pt-14 space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Total ({items.length} Items)</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>CGST 2.5%</span>
            <span>₹ {cgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>SGST 2.5%</span>
            <span>₹ {sgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium pt-2 border-t border-slate-800">
            <span>Payable Amount</span>
            <span>₹ {payableAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {items.length} Items Added
            <br />
            <span className="text-white font-medium">₹ {payableAmount.toFixed(2)}</span>
          </div>
          <a href="/addmoreitems" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 flex items-center rounded-md">
            Place Order
            <FaCaretRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1A1B23] w-[300px] rounded-lg p-6">
            {/* Popup Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Select Payment</h3>
              <button
                className="text-gray-400 hover:text-white"
                style={{ fontSize: '20px' }}
                onClick={togglePopup}
              >
                <IoIosCloseCircle />
              </button>
            </div>

            {/* Payment Options */}
            <div className="flex justify-between items-center mb-6">
              {/* Online Payment */}
              <div
                onClick={() => handlePaymentSelection('Online')}
                className={`w-[120px] h-[120px] flex flex-col justify-center items-center rounded-lg cursor-pointer transition ${
                  selectedPayment === 'Online'
                    ? 'border-2 border-[#C68A15] bg-gray-800'
                    : 'bg-gray-800 border border-transparent'
                }`}
              >
                <div
                  style={{ marginLeft: "75px" }}
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedPayment === 'Online'
                      ? 'border-[#C68A15] bg-[#C68A15]'
                      : 'border-gray-500'
                  }`}
                />
                <img
                  src="./assets/images/28.png"
                  alt="Online"
                  className="w-10 h-10 mb-2 mt-2"
                />
                <p className="text-sm text-white">Online</p>
              </div>

              {/* Cash Payment */}
              <div
                onClick={() => handlePaymentSelection('Cash')}
                className={`w-[120px] h-[120px] flex flex-col justify-center items-center rounded-lg cursor-pointer transition ${
                  selectedPayment === 'Cash'
                    ? 'border-2 border-[#C68A15] bg-gray-800'
                    : 'bg-gray-800 border border-transparent'
                }`}
              >
                <div
                  style={{ marginLeft: "75px" }}
                  className={`w-4 h-4 rounded-full border-2 mt-2 ${
                    selectedPayment === 'Cash'
                      ? 'border-[#C68A15] bg-[#C68A15]'
                      : 'border-gray-500'
                  }`}
                />
                <img
                  src="./assets/images/29.png"
                  alt="Cash"
                  className="w-10 h-10 mb-2 mt-2"
                />
                <p className="text-sm text-white">Cash</p>
              </div>
            </div>

            {/* Pay Button */}
            <button className="bg-[#C68A15] text-white py-2 w-full rounded-full text-sm font-medium" onClick={handlePayClick}>
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
}
