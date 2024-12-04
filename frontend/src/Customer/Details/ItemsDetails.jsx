'use client'
import React from 'react'
import {createContext, useContext, useEffect, useState } from 'react'
import { ChevronLeft, Minus, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom' // Import useNavigate for redirection
import axios from 'axios'
import { useUser } from '../UserContext';


export default function ItemDetails() {
  const [quantity, setQuantity] = useState(1);
  const [isVeg, setIsVeg] = useState(true)
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected options for each step

  
  const navigate = useNavigate() // Initialize navigate
  const { id } = useParams(); // Extract the item ID from the URL
  const [item, setItem] = useState(null);

  const toggleVeg = () => setIsVeg(prevIsVeg => !prevIsVeg)

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleContinue = () => {
    if (currentStep < item.customizations.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // When all steps are complete, you can handle the final action (like adding to cart)
      alert('Customization complete, click on add to cart!');
      setIsCustomizationOpen(false);
    }
  };


  const handleOptionSelect = (step, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [step]: option,
    }));
  };

  const [error, setError] = useState(null); // To handle errors
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/manageorder/items/${id}`
        ); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setItem(data); // Store the fetched item data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchItemDetails();
  }, [id]);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login.');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/v1/user/getUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);  // Store user data
      } catch (error) {
        setError('Error fetching user data');
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  

  const handleAddToCart = async () => {
    const customizations = Object.values(selectedOptions);
    const cartData = {
      userId: user._id, // Assuming the user is logged in and you have their ID
      items: [
        {
          itemId: item._id,
          item:item.itemName, // Item ID from the item data
          quantity,
          customizations: customizations.map(option => ({
            title: option.name,  // Mapping 'name' to 'title'
            option: option.detail, // Mapping 'detail' to 'option'
            extraRate: option.extraRate, // Keep extraRate as it is
          })), // Selected customizations
        },
      ],
    };
    console.log("cart", cartData)
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/addCart/createOrder', cartData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 201) {
        console.log('Order placed successfully:', response.data);
  
        // Navigate to cart page
        navigate('/cartpage');}
        else {
        const error = await response.json();
        console.error("Error placing order:", error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };


  // Handle loading state
  if (loading) {
    return <p>Loading item details...</p>;
  }

  // Handle error state
  if (error) {
    return <p className="text-red-500">Failed to load item details: {error}</p>;
  }

  // Render item details only if `item` is available
  if (!item) {
    return <p className="text-gray-500">No item details available.</p>;
  }

  // Split the ingredients string into an array
  const ingredientsList = item.ingredients.split(',').map(ingredient => ingredient.trim());

  return (
    <div className="min-h-screen bg-gray-900 text-white w-[375px] mx-auto relative">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800">
        <ChevronLeft className="w-6 h-6" />
        <h1 className="text-lg font-semibold mx-auto">Item Details</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center p-4">
        <img src={item.imageUrl} alt={item.itemName} className="w-60 h-30 ml-0" />

        {/* Veg/Non-Veg Toggle and Customization */}
        <div className="w-full flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              className={`relative border-dotted border-2 rounded-full p-3 ${
                isVeg ? 'border-green-500' : 'border-red-500'
              }`}
              onClick={toggleVeg}
            >
              <span
                className={`absolute bottom-3 right-3 transform translate-x-1/2 translate-y-1/2 w-[15px] h-[15px] rounded-full ${
                  isVeg ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </button>
            <button
              onClick={() => setIsCustomizationOpen(true)}
              className="px-4 py-2 text-sm bg-gray-800 rounded-full hover:bg-gray-700"
            >
              Customization
            </button>
          </div>
        </div>

        {/* Title and Price */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2">{item.itemName}</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-yellow-400">{item.price}</span>
            <div className="flex items-center space-x-2">
              <button
                className="w-8 h-8 flex items-center justify-center bg-yellow-600 rounded-full text-white hover:bg-yellow-700"
                onClick={decrement}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-base font-semibold">
                {quantity.toString().padStart(2, '0')}
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center bg-yellow-600 rounded-full text-white hover:bg-yellow-700"
                onClick={increment}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="w-full mb-4">
          <h3 className="font-semibold mb-1 text-sm">Details</h3>
          <p className="text-xs text-gray-400">
            {item.spiceLevel}, {item.ingredients}
          </p>
        </div>

        {/* Ingredients */}
        <div className="w-full">
          <h3 className="font-semibold mb-1 text-sm">Ingredients</h3>
          <ul className="text-xs text-gray-400 list-disc list-inside">
          {ingredientsList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
          ))}
          </ul>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-800">
        <button
          className="w-full py-1 rounded-lg bg-yellow-600 hover:bg-yellow-700"
          onClick={handleAddToCart} // Attach handler
        >
          Add To Cart
        </button>
      </div>
        {/* Customization Dialog */}
      {isCustomizationOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center">
          <div className="bg-gray-900 w-[375px] rounded-t-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Customise as per your taste</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-base">
                  {item.customizations[currentStep - 1]?.title}                  </h3>
                  <span className="text-sm text-gray-400">Step {currentStep}/3</span>
                </div>
                <div className="space-y-3">
                {item.customizations[currentStep - 1]?.options.map((option, index) => (
                    <label
                    key={option.name}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer border border-gray-700"
                  >
                    <span className="text-sm">{option.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">₹ {option.extraRate}</span>
                      <input
                        type="radio"
                        name={`option-${currentStep}`}
                        checked={selectedOptions[currentStep]?.name === option.name}
                        onChange={() => handleOptionSelect(currentStep, option)}
                        className="w-4 h-4 accent-yellow-600"
                      />
                    </div>
                  </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 text-sm font-medium bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 bg-yellow-600 rounded-lg text-sm font-medium hover:bg-yellow-700"
                >
                {currentStep === item.customizations.length ? 'Continue' : 'Continue'}                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
