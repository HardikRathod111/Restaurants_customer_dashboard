import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const TrendingMenu = () => {
  const navigate = useNavigate();

  
  const handleTrendingClick = () => {
    navigate('/trending-menu');
  }

  return (
    <div className="text-white min-h-screen w-[375px]">
      {/* Header */}
     
    <div className=" flex items-center justify-between px-4 py-5 w-[375px] bg-[#1F1D2B] px-4 py-3 flex">
        <a href="/parcel-homepage" className="text-white text-lg">
        <MdOutlineKeyboardArrowLeft style={{fontSize:'25px'}} />

        </a>
        <h1 className="text-lg font-bold">Trending Menu</h1>
        <div className="w-6 h-6"></div> {/* Empty space for alignment */}
      </div>
      <div className="flex items-center justify-between px-4 py-2 w-[375px] bg-[#0B0F1F] px-4 py-3 flex">
        <h1 className="text-lg font-bold">Trending Menu</h1>
        <h1 className="text-lg font-bold"></h1>
        <div className="w-6 h-6"></div> {/* Empty space for alignment */}
      </div>

      {/* Menu Section */}
      <div className="space-y-4 p-4 bg-[#0B0F1F]">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#252836] rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-[#2D303E] w-16 h-16 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                  
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
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
          ))}
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

export default TrendingMenu;
