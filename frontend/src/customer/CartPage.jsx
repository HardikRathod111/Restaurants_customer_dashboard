"use client";

import { FaChevronLeft, FaTrash, FaCaretRight } from "react-icons/fa";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Beef Burger", price: 500, quantity: 2 },
    { id: 2, name: "Beef Burger", price: 500, quantity: 2 },
  ]);
  const [cookingRequest, setCookingRequest] = useState("");

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

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cgst = totalPrice * 0.025;
  const sgst = totalPrice * 0.025;
  const payableAmount = totalPrice + cgst + sgst;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <a href="/itemsdetails" className="p-2">
          <FaChevronLeft className="w-6 h-6" />
        </a>
        <h1 className="text-lg font-medium">Cart</h1>
        <button className="text-sm text-yellow-500">+ Add Items</button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 p-3 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center">
                  <span role="img" aria-label="burger" className="text-xl">
                    🍔
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
                  ₹ {item.price * item.quantity}
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
        ))}

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
            <span className="text-white font-medium">₹ {totalPrice.toFixed(2)}</span>
          </div>
          <a href="/addmoreitems" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 flex items-center rounded-md">
            Place Order
            <FaCaretRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
