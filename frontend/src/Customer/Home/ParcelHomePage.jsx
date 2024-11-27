
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ParcelHomePage = () => {

  const navigate = useNavigate();
  const [selected, setSelected] = useState("Veg");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleCategoryView = () => {
    navigate('/parcel-category');
  }

  const handleTrendingClick = () => {
    navigate('/trending-menu');
  }

  const foodItems = [
    {
      name: "Hamburger Cheeseburger",
      price: "₹6.29",
      description: "Order Per Day :- 120",
      image: "/assets/images/5.png",
    },
    {
      name: "New York Style Pizza",
      price: "₹6.29",
      description: "Order Per Day :- 180",
      image: "/assets/images/6.png",
    },
    {
      name: "Noodles",
      price: "₹6.29",
      description: "Order Per Day :- 120",
      image: "/assets/images/7.png",
    },
    {
      name: "Italian Pasta",
      price: "₹6.29",
      description: "Order Per Day :- 80",
      image: "/assets/images/8.png",
    },
    {
      name: "Pasta",
      price: "₹6.29",
      description: "Order Per Day :- 50",
      image: "/assets/images/9.png",
    },
  ];
 
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };


  // Filter items based on the search query
  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

   // Handle Search Input Change
   const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

  };

  return (
    <div className="flex flex-col items-center bg-[#0B0F1F] min-h-screen text-white">
      {/* Header */}
      <div className="w-[375px] bg-[#1F1D2B] px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className=" w-15 h-12 flex items-center justify-center">
            <img
              src="/assets/images/Frame 1000006241.png"
              alt="Logo"
              width={100}
            />
          </div>

        </div>
        <div className="flex space-x-3">
         
            {/* Search Icon */}
            <button onClick={toggleSearchInput}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
              />
            </svg>
          </button>

          {/* Cart Icon */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l1.6-8H6.4L7 13zM5 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </button>
        </div>

      </div>

        {/* Search Input */}
      {showSearchInput && (
        <div className="w-[375px] px-4 py-2 bg-[#1F1D2B] flex flex-col">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-2 rounded-lg bg-[#252836] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5678E9]"
          />
          {/* Search Results */}
          <div className="mt-2">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#2D303E] rounded-lg p-2 mb-2"
                >
                  <span className="text-sm font-medium">{result.name}</span>
                  <span className="text-sm font-semibold text-green-500">
                    {result.price}
                  </span>
                </div>
              ))
            ) : searchQuery.trim() ? (
              <p className="text-sm text-gray-400">No results found</p>
            ) : null}
          </div>
        </div>
      )}


      {/* Veg/Non-Veg Toggle */}
      <div className="w-[375px] bg-[#0B0F1F] flex justify-around py-3">
        <button
          onClick={() => setSelected("Veg")}
          className={`flex items-center px-4 py-2 border-2 rounded-lg transition-colors duration-200 ${selected === "Veg"
            ? "border-green-500 text-green-500"
            : "border-gray-500 text-gray-500"
            }`}
          style={{ width: "150px" }}
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
          style={{ width: "150px" }}

        >
          <span
            className={`w-3 h-3 rounded-full ${selected === "Non Veg" ? "bg-red-500" : "bg-gray-500"
              }`}
          ></span>
          <span className="ml-2">Non Veg</span>
        </button>
      </div>

      {/* Categories */}
      <div className="w-[375px] px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold">Categories</h2>
          <button className="text-xs text-[#5678E9]" onClick={handleCategoryView}>View All</button>
        </div>
        <div className="flex space-x-4 ">
          {[
            { name: "All", image: "/assets/images/4.png" },
            { name: "French Fries", image: "/assets/images/3.png" },
            { name: "Burger", image: "/assets/images/4.png" },
            { name: "Sandwich", image: "/assets/images/2.png" },
            { name: "Drinks", image: "/assets/images/1.png" },
          ].map((category, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="bg-gray-700 w-14 h-14 rounded-lg flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                 
                />
              </div>
              <p className="text-xs text-gray-400">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
      

      {/* Trending Menu */}
      <div className="w-[375px] px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold">Trending Menu</h2>
          <button className="text-xs text-[#5678E9]" onClick={handleTrendingClick}>View All</button>
        </div>
          {/* Food Items */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#252836] rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-[#2D303E] w-16 h-16 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                  <p className="text-sm font-semibold text-green-500">
                    {item.price}
                  </p>
                </div>
              </div>
              <button className="bg-[#CA923D] text-xs text-white px-4 py-2 rounded-lg font-bold">
                Order Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No items found</p>
        )}
      </div>

      </div>

      {/* Floating Menu Button */}
      <button className="fixed bottom-4 right-4  w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-[#666872b0]  border-white border-2" onClick={handleTrendingClick}>
        <img
          src="/assets/images/menu.png"
          alt="Menu Icon"
          className="w-8 h-10"
        />
      </button>
    </div>
  );
};

export default ParcelHomePage;
