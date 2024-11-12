
<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Forgotpassword from './Pages/Forgotpassword';
>>>>>>> 5d3d396e31d633f850449176f547454e375fa024
import Otp from './Pages/Otp';
import Register from './Pages/Register';
import Resetpassword from './Pages/Resetpassword';
import Login from "./Pages/Login/Login";
import ProfilePage from './Dashboard/ProfilePage';
import ChangePasswordPage from './Dashboard/ChangePasswordPage';
import TermsAndConditions from './Dashboard/TermsAndConditions';
import ParcelOrder from './Dashboard/ParcelOrder';
import Dashboard from './Dashboard/Dashboard';
import Editprofile from './Dashboard/Editprofile';
import Forgotpassword from './Pages/Forgotpassword';
import QrCode from './Dashboard/QrCode';
import Createqrcode from './Dashboard/Createqrcode';


 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);  // User is authenticated
    } else {
      setIsAuthenticated(false);  // No token found, user is not authenticated
    }
  }, []);
  return (
    <Router>
        <Routes>
<<<<<<< HEAD
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
            <Route path="/" element={< Register/>} />
            <Route path='/editprofile' element={<Editprofile/>}/>
            <Route path='/Profilepage' element={<ProfilePage/>}/>
            <Route path='/ChangePassword' element={<ChangePasswordPage/>}/>
            <Route path='/TermsAndConditions' element={<TermsAndConditions/>}/>
            <Route path="/parcelorder" element={< ParcelOrder/>} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
            <Route path="/parcelorder" element={< ParcelOrder/>} />
            <Route path='/qrcode' element={<QrCode/>}/>
            <Route path='/createqrcode' element={<Createqrcode/>}/>
       </Routes>
=======
            {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forgotpassword />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/" element={<Register />} />

        {/* Protected routes (Only accessible if authenticated) */}
        <Route
          path="/editprofile"
          element={isAuthenticated ? <Editprofile /> : <Navigate to="/login" />}
        />
        <Route
          path="/Profilepage"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/ChangePassword"
          element={isAuthenticated ? <ChangePasswordPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/TermsAndConditions"
          element={isAuthenticated ? <TermsAndConditions /> : <Navigate to="/login" />}
        />
        <Route
          path="/parcelorder"
          element={isAuthenticated ? <ParcelOrder /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
>>>>>>> 5d3d396e31d633f850449176f547454e375fa024
      </Router>
  );
}

export default App;