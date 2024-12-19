import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ParcelCategory = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
        const response = await fetch('https://restaurants-customer-dashboard.vercel.app/api/v1/category/getCategory');
        
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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-[#1F1D2B] min-h-screen text-white">
      {/* Header */}
      <div className=" items-center justify-between px-4 py-5 w-[375px] bg-[#1F1D2B]  flex">
        <MdOutlineKeyboardArrowLeft style={{fontSize:'25px'}} onClick={() => navigate(-1)}/>

        <h1 className="text-lg font-bold">Categories</h1>
        <div className="w-6 h-6"></div> {/* Empty space for alignment */}
      </div>
      <div className="flex items-center justify-between px-4 py-2 w-[375px] bg-[#0B0F1F]">
        <h1 className="text-lg font-bold">Categories</h1>
        <h1 className="text-lg font-bold"></h1>
        <div className="w-6 h-6">10</div> {/* Empty space for alignment */}
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
                src={`https://restaurants-customer-dashboard.vercel.app/${category.image}`}
                alt={category.categoryName}
              />
            </div>
            <p className="text-xs font-medium text-gray-300">{category.categoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParcelCategory;
