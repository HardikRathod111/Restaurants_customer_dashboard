import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ParcelCategory = () => {
  const categories = [
    { name: "French Fries", img: "/assets/images/27.png" },
    { name: "Pizza", img: "/assets/images/26.png" },
    { name: "Burger", img: "/assets/images/25.png" },
    { name: "Garlic Bread", img: "/assets/images/24.png" },
    { name: "Pasta", img: "/assets/images/23.png" },
    { name: "French Fries", img: "/assets/images/22.png" },
    { name: "Sandwich", img: "/assets/images/21.png" },
    { name: "Rice Noodles", img: "/assets/images/20.png" },
    { name: "Dosa", img: "/assets/images/19.png" },
    { name: "Pasta", img: "/assets/images/18.png" },
    { name: "Noodles", img: "/assets/images/17.png" },
    { name: "Biryani", img: "/assets/images/16.png" },
    { name: "Biryani Rice", img: "/assets/images/15.png" },
    { name: "French Fries", img: "/assets/images/14.png" },
    { name: "Italian Pasta", img: "/assets/images/13.png" },
    { name: "Salad", img: "/assets/images/12.png" },
    { name: "Mix Salad", img: "/assets/images/11.png" },
    { name: "Panner Chili", img: "/assets/images/10.png" },
  ];

  return (
    <div className="flex flex-col items-center bg-[#1F1D2B] min-h-screen text-white">
      {/* Header */}
      <div className=" items-center justify-between px-4 py-5 w-[375px] bg-[#1F1D2B]  flex">
        <a href="/parcel-homepage" className="text-white text-lg">
        <MdOutlineKeyboardArrowLeft style={{fontSize:'25px'}} />

        </a>
        <h1 className="text-lg font-bold">Categories</h1>
        <div className="w-6 h-6"></div> {/* Empty space for alignment */}
      </div>
      <div className="flex items-center justify-between px-4 py-2 w-[375px] bg-[#0B0F1F]">
        <h1 className="text-lg font-bold">Categories</h1>
        <h1 className="text-lg font-bold"></h1>
        <div className="w-6 h-6">100</div> {/* Empty space for alignment */}
      </div>
      {/* Categories Grid */}
      <div className="w-[375px] px-4 py-4 grid grid-cols-3 gap-4 bg-[#0d0d23]">
   
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-[#252836] rounded-lg p-2"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img
                src={category.img}
                alt={category.name}
              />
            </div>
            <p className="text-xs font-medium text-gray-300">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelCategory;
