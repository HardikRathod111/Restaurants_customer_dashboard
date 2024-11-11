<<<<<<< HEAD
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Register() {
  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm();
    const { register: restaurantRegister, handleSubmit: handleRestaurantSubmit, formState: { errors: restaurantErrors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRestaurantFormOpen, setIsRestaurantFormOpen] = useState(false); // Added state to toggle the modal

  const onSubmit = (data) => {
    console.log(data);
  };

    const onRestaurantSubmit = (restaurantData) => {
    console.log('Restaurant Created:', restaurantData);
    setIsRestaurantFormOpen(false); // Close modal after submitting
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const toggleRestaurantForm = () => setIsRestaurantFormOpen(!isRestaurantFormOpen);

  return (
    <div
      className="h-full min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./assets/images/b031f0ade82ec13db272ea276a0e4068.jpg')" }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-full w-full flex flex-col md:flex-row items-center md:items-start">
        
        {/* Left Section - Form */}
        <div className="min-h-screen md:w-1/2 bg-black p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstName", { required: "First Name is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  {...register("lastName", { required: "Last Name is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-gray-400">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400">Country</label>
                <select {...register("country", { required: "Country is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">State</label>
                <select {...register("state", { required: "State is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="California">California</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">City</label>
                <select {...register("city", { required: "City is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select City</option>
                  <option value="Surat">Surat</option>
                  <option value="San Francisco">San Francisco</option>
                </select>
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Select Restaurant</label>
              <select {...register("restaurant", { required: "Restaurant selection is required" })} className="w-full px-4 py-2  rounded bg-gray-800 text-white">
                <option value="">Select Restaurant</option>
                <option value="Restaurant 1">Cedar Grill & Lounge</option>
                <option value="Restaurant 2">The Statesman Restaurant</option>
                <option value="Restaurant 3">The Capital Grille</option>
                <option value="Restaurant 4">Frosty Favourites</option>
                <option value="Restaurant 5">Crumbl Cookies</option>
                <option value="Restaurant 6">Fancy Sushi House</option>
                <option value="Restaurant 7">Wesabi kitchen</option>
                <option value="Restaurant 8">Maki Restaurant</option>
              </select>
              {errors.restaurant && <p className="text-red-500 text-sm">{errors.restaurant.message}</p>}
            </div>

          {/* Create New Restaurant Button */}
<a
  href="#"
  onClick={toggleRestaurantForm}
  className="w-full bg-yellow-500 py-2 rounded text-white mt-4 text-center block cursor-pointer transition duration-300 hover:bg-yellow-400"
>
  Create New Restaurant
</a>

            
            {/* Create New Restaurant Form - Pop-up */}
            {isRestaurantFormOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black text-gray-700 p-8 rounded-lg max-w-md w-full space-y-4">
                  <h3 className="text-2xl font-semibold">Add New Restaurant</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Restaurant Name</label>
                      <input type="text" placeholder="Enter Restaurant Name" className="w-full px-4 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Address</label>
                      <input type="text" placeholder="Enter Address" className="w-full px-4 py-2 rounded border" />
                    </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Country and State on the same line */}
                 <div>
                   <label className="block text-gray-700">Country</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select Country</option>
                     <option value="India">India</option>
                     <option value="USA">USA</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-gray-700">State</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select State</option>
                     <option value="Gujarat">Gujarat</option>
                    <option value="California">California</option>
                   </select>
                 </div>

                 {/* City and Zip Code on the next line */}
                 <div>
                   <label className="block text-gray-700">City</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select City</option>
                     <option value="Surat">Surat</option>
                     <option value="San Francisco">San Francisco</option>
                   </select>
                 </div>
                 <div>
                <label className="block text-gray-700">Zip Code</label>
                <input type="text" placeholder="Enter Zip Code" className="w-full px-4 py-2 rounded border" />
                </div>
                  </div>

                   <div className="flex justify-between">
                      <button type="button" onClick={toggleRestaurantForm} className="text-gray-500">Cancel</button>
                      <button type="submit" className="bg-yellow-500 text-white py-2 px-6 rounded">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: "Confirm Password is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("terms", { required: "You must agree to the terms" })}
                className="text-blue-500"
              />
                 <span className="text-gray-400">I agree to the <a href="#" className="text-blue-500">T&C</a> and <a href="#" className="text-blue-500">Privacy Policies.</a></span>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
            
            <button type="submit" className="w-full bg-yellow-500 py-2 rounded text-gray-900 font-semibold mt-4">Register</button>
            
            {/* Already have an account? */}
            <div className="text-center mt-4">
              <p className="text-gray-400">
                Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section - Logo or image */}
        <div className="w-full md:w-1/2 flex mt-72 justify-center items-center text-center text-white">
          <img src="./assets/images/Group 1000005985.png" alt="Logo" className="mb-4" />
        </div>
      </div>
    </div>
  );
}
export default Register;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Register() {
  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm();
    const { register: restaurantRegister, handleSubmit: handleRestaurantSubmit, formState: { errors: restaurantErrors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRestaurantFormOpen, setIsRestaurantFormOpen] = useState(false); // Added state to toggle the modal

  const onSubmit = (data) => {
    console.log(data);
  };

    const onRestaurantSubmit = (restaurantData) => {
    console.log('Restaurant Created:', restaurantData);
    setIsRestaurantFormOpen(false); // Close modal after submitting
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const toggleRestaurantForm = () => setIsRestaurantFormOpen(!isRestaurantFormOpen);

  return (
    <div
      className="h-full min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./assets/images/b031f0ade82ec13db272ea276a0e4068.jpg')" }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-full w-full flex flex-col md:flex-row items-center md:items-start">
        
        {/* Left Section - Form */}
        <div className="min-h-screen md:w-1/2 bg-black p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstName", { required: "First Name is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  {...register("lastName", { required: "Last Name is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-gray-400">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                {...register("phone", { required: "Phone number is required" })}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400">Country</label>
                <select {...register("country", { required: "Country is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">State</label>
                <select {...register("state", { required: "State is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select State</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="California">California</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400">City</label>
                <select {...register("city", { required: "City is required" })} className="w-full px-4 py-2 rounded bg-gray-800 text-white">
                  <option value="">Select City</option>
                  <option value="Surat">Surat</option>
                  <option value="San Francisco">San Francisco</option>
                </select>
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Select Restaurant</label>
              <select {...register("restaurant", { required: "Restaurant selection is required" })} className="w-full px-4 py-2  rounded bg-gray-800 text-white">
                <option value="">Select Restaurant</option>
                <option value="Restaurant 1">Cedar Grill & Lounge</option>
                <option value="Restaurant 2">The Statesman Restaurant</option>
                <option value="Restaurant 3">The Capital Grille</option>
                <option value="Restaurant 4">Frosty Favourites</option>
                <option value="Restaurant 5">Crumbl Cookies</option>
                <option value="Restaurant 6">Fancy Sushi House</option>
                <option value="Restaurant 7">Wesabi kitchen</option>
                <option value="Restaurant 8">Maki Restaurant</option>
              </select>
              {errors.restaurant && <p className="text-red-500 text-sm">{errors.restaurant.message}</p>}
            </div>

          {/* Create New Restaurant Button */}
<a
  href="#"
  onClick={toggleRestaurantForm}
  className="w-full bg-yellow-500 py-2 rounded text-white mt-4 text-center block cursor-pointer transition duration-300 hover:bg-yellow-400"
>
  Create New Restaurant
</a>

            
            {/* Create New Restaurant Form - Pop-up */}
            {isRestaurantFormOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-black text-gray-700 p-8 rounded-lg max-w-md w-full space-y-4">
                  <h3 className="text-2xl font-semibold">Add New Restaurant</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Restaurant Name</label>
                      <input type="text" placeholder="Enter Restaurant Name" className="w-full px-4 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="block text-gray-700">Address</label>
                      <input type="text" placeholder="Enter Address" className="w-full px-4 py-2 rounded border" />
                    </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Country and State on the same line */}
                 <div>
                   <label className="block text-gray-700">Country</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select Country</option>
                     <option value="India">India</option>
                     <option value="USA">USA</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-gray-700">State</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select State</option>
                     <option value="Gujarat">Gujarat</option>
                    <option value="California">California</option>
                   </select>
                 </div>

                 {/* City and Zip Code on the next line */}
                 <div>
                   <label className="block text-gray-700">City</label>
                   <select className="w-full px-4 py-2 rounded border">
                     <option value="">Select City</option>
                     <option value="Surat">Surat</option>
                     <option value="San Francisco">San Francisco</option>
                   </select>
                 </div>
                 <div>
                <label className="block text-gray-700">Zip Code</label>
                <input type="text" placeholder="Enter Zip Code" className="w-full px-4 py-2 rounded border" />
                </div>
                  </div>

                   <div className="flex justify-between">
                      <button type="button" onClick={toggleRestaurantForm} className="text-gray-500">Cancel</button>
                      <button type="submit" className="bg-yellow-500 text-white py-2 px-6 rounded">Create</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: "Confirm Password is required" })}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("terms", { required: "You must agree to the terms" })}
                className="text-blue-500"
              />
                 <span className="text-gray-400">I agree to the <a href="#" className="text-blue-500">T&C</a> and <a href="#" className="text-blue-500">Privacy Policies.</a></span>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
            
            <button type="submit" className="w-full bg-yellow-500 py-2 rounded text-gray-900 font-semibold mt-4">Register</button>
            
            {/* Already have an account? */}
            <div className="text-center mt-4">
              <p className="text-gray-400">
                Already have an account? <a href="/login" className="text-blue-500 font-semibold">Login</a>
              </p>
            </div>
          </form>
        </div>

        {/* Right Section - Logo or image */}
        <div className="w-full md:w-1/2 flex mt-72 justify-center items-center text-center text-white">
          <img src="./assets/images/Group 1000005985.png" alt="Logo" className="mb-4" />
        </div>
      </div>
    </div>
  );
}
export default Register;
>>>>>>> c479502405104ca58779f6e3cf4b7d6bedfe021e
