import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
// import bgheroimg from "../../images/image.png";
// import logoimg from "../../images/Group 1000005985.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://restaurants-customer-dashboard.onrender.com/api/v1/admin/adminlogin', {
                email,
                password,
            });

            if (response.status === 200) {
                navigate('/dashboard'); 
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);  // Store token
                }  // Redirect to the dashboard or another page
                 // Redirect to dashboard
            }
        } catch (err) {
            setError('Login failed. Please check your credentials or try again later.');
            console.error(err);
        }
    };

    return (
        <div 
            className="flex min-h-screen bg-[#1e2329] text-white bg-cover bg-center"
            style={{
                backgroundImage: `
                linear-gradient(89.95deg, rgba(31, 29, 43, 0.96) 0.04%, rgba(30, 28, 42, 0.43) 70.08%, rgba(30, 28, 41, 0.37) 99.14%), 
                linear-gradient(89.47deg, #1F1D2B 0.37%, rgba(31, 28, 42, 0.74) 99.48%),
                url('./assets/images/b031f0ade82ec13db272ea276a0e4068.jpg')`,
            }}
        >
            <div className="flex flex-col lg:flex-row flex-1 items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-2xl xl:max-w-xl md:max-w-md space-y-6 bg-[#252836] p-8 rounded-lg lg:mr-8">

                    <h2 className="text-2xl font-semibold text-center lg:text-left">Login</h2>
                    {error && <div className="text-red-500 text-center">{error}</div>}  {/* Display error if any */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                                Email or Phone *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-[#1e2329] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your Email or Phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full px-3 py-2 bg-[#1e2329] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#e6a43a] focus:ring-[#e6a43a] border-gray-600 rounded bg-[#1e2329]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember Me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="/forget" className="font-medium text-[#4a90e2] hover:text-[#5a9ff2]">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e6a43a] hover:bg-[#f6b44a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e6a43a]"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a href="/" className="font-medium text-[#4a90e2] hover:text-[#5a9ff2]">
                            Register
                        </a>
                    </p>
                </div>
                
                {/* Right Side Image Section */}
                <div className="hidden lg:flex flex-1 items-center justify-center p-8  relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <img src='./assets/images/Group 1000005985.png' alt="Logo" className="p-14 xl:w-11/12 max-w-lg lg:p-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
