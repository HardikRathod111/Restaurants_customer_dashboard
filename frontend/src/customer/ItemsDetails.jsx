'use client'

import { useState } from 'react'
import { ChevronLeft, Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for redirection

export default function ItemDetails() {
  const [quantity, setQuantity] = useState(2)
  const [isVeg, setIsVeg] = useState(true)
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const navigate = useNavigate() // Initialize navigate

  // Customization options
  const crustOptions = [
    { name: "100% Wheat Crust", selected: true },
    { name: "Cheese Burst", selected: false },
    { name: "Fresh Pan Pizza", selected: false },
    { name: "Classic Hand Tossed", selected: false },
  ]

  const sizeOptions = [
    { name: "Medium", price: 200, selected: true },
    { name: "Large", price: 700, selected: false },
    { name: "Regular", price: 300, selected: false },
  ]

  const toppingsOptions = [
    { name: "Jalapeno", price: 200, selected: true },
    { name: "Onion", price: 700, selected: false },
    { name: "Black Olive", price: 300, selected: false },
  ]

  const increment = () => setQuantity(prevQuantity => prevQuantity + 1)
  const decrement = () => setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0))
  const toggleVeg = () => setIsVeg(prevIsVeg => !prevIsVeg)

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(prevStep => prevStep + 1)
    } else {
      setIsCustomizationOpen(false)
      setCurrentStep(1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1)
    } else {
      setIsCustomizationOpen(false)
    }
  }

  const handleAddToCart = () => {
    // Redirect to the cart page
    navigate('/cartpage')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white w-[375px] mx-auto relative">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-800">
        <ChevronLeft className="w-6 h-6" />
        <h1 className="text-lg font-semibold mx-auto">Item Details</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center p-4">
        <img src="./assets/images/pngwing 14-2.png" alt="Maharaja Burger" className="w-60 h-30 ml-0" />

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
          <h2 className="text-xl font-bold mb-2">Maharaja Burger</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-yellow-400">₹ 500</span>
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
            Ginger Garlic Noodle Soup With Bok Choy is nutritious, comforting,
            and flu-fighting twenty-minute recipe made with vegetarian
            broth, noodles, mushrooms, and baby bok choy.
          </p>
        </div>

        {/* Ingredients */}
        <div className="w-full">
          <h3 className="font-semibold mb-1 text-sm">Ingredients</h3>
          <ul className="text-xs text-gray-400 list-disc list-inside">
            <li>1. Tbsp olive oil</li>
            <li>2. Shallots (diced)</li>
            <li>3. Bunch green onion (chopped, green & white divided)</li>
            <li>4. Cloves garlic (minced)</li>
          </ul>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="bottom-0 left-0 right-0 p-4 bg-gray-800">
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
                    {currentStep === 1 ? 'Crust' : currentStep === 2 ? 'Size' : 'Toppings'}
                  </h3>
                  <span className="text-sm text-gray-400">Step {currentStep}/3</span>
                </div>
                <div className="space-y-3">
                  {currentStep === 1 && crustOptions.map((option) => (
                    <label
                      key={option.name}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer border border-gray-700"
                    >
                      <span className="text-sm">{option.name}</span>
                      <input
                        type="radio"
                        name="crust"
                        defaultChecked={option.selected}
                        className="w-4 h-4 accent-yellow-600"
                      />
                    </label>
                  ))}
                  {currentStep === 2 && sizeOptions.map((option) => (
                    <label
                      key={option.name}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer border border-gray-700"
                    >
                      <span className="text-sm">{option.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">₹ {option.price}</span>
                        <input
                          type="radio"
                          name="size"
                          defaultChecked={option.selected}
                          className="w-4 h-4 accent-yellow-600"
                        />
                      </div>
                    </label>
                  ))}
                  {currentStep === 3 && toppingsOptions.map((option) => (
                    <label
                      key={option.name}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg cursor-pointer border border-gray-700"
                    >
                      <span className="text-sm">{option.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">+ ₹ {option.price}</span>
                        <input
                          type="radio"
                          name="toppings"
                          defaultChecked={option.selected}
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
                  {currentStep === 3 ? 'Add To Cart' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
