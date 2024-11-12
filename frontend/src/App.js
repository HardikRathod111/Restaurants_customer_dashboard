import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Forgotpassword from './Pages/Forgotpassword';
import Otp from './Pages/Otp';
import Register from './Pages/Register';
import Resetpassword from './Pages/Resetpassword';
import Login from './Pages/Login/Login';
import ProfilePage from './Dashboard/ProfilePage';
import ChangePasswordPage from './Dashboard/ChangePasswordPage';
import TermsAndConditions from './Dashboard/TermsAndConditions';
import ParcelOrder from './Dashboard/ParcelOrder';
<<<<<<< HEAD
import Dashboard from './Dashboard/Dashboard';
import Editprofile from './Dashboard/Editprofile';
import QrCode from './Dashboard/QrCode';
import Createqrcode from './Dashboard/Createqrcode';
=======
import OnsiteOrder from './Dashboard/OnsiteOrder';
>>>>>>> 72302be5923bfafe2037cf42356080e588337ec0

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // User is authenticated if token exists
  }, []);

  return (
    <Router>
<<<<<<< HEAD
      <Routes>
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
        <Route
          path="/qrcode"
          element={isAuthenticated ? <QrCode /> : <Navigate to="/login" />}
        />
        <Route
          path="/createqrcode"
          element={isAuthenticated ? <Createqrcode /> : <Navigate to="/login" />}
        />
=======
        <Routes>
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
            <Route path="/parcelorder" element={< ParcelOrder/>} />
            <Route path="/onsiteorder" element={< OnsiteOrder/>} />
>>>>>>> 72302be5923bfafe2037cf42356080e588337ec0
      </Routes>
    </Router>
  );
}

export default App;
