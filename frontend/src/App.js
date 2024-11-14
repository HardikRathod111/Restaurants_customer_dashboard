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
import Dashboard from './Dashboard/Dashboard';
import Editprofile from './Dashboard/Editprofile';
import QrCode from './Dashboard/QrCode';
import Createqrcode from './Dashboard/Createqrcode';
import OnsiteOrder from './Dashboard/OnsiteOrder';
import PaymentParcel from './Dashboard/PaymentParcel';
import PaymentOnsite from './Dashboard/PaymentOnsite';
import DeletePrompt from './Dashboard/DeletePrompt';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // User is authenticated if token exists
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forgotpassword />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/" element={<Register />} />
        <Route path='/deleteprompt' element={<DeletePrompt/>}/>
            <Route path="/paymentparcel" element={< PaymentParcel/>} />
            <Route path="/paymentonsite" element={< PaymentOnsite/>} />
        {/* Protected routes (Only accessible if authenticated) */}
        <Route path="/onsiteorder" element={isAuthenticated ? <OnsiteOrder /> : <Navigate to="/login" />} />
        <Route path="/editprofile" element={isAuthenticated ? <Editprofile /> : <Navigate to="/login" />} />
        <Route path="/Profilepage" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/ChangePassword" element={isAuthenticated ? <ChangePasswordPage /> : <Navigate to="/login" />} />
        <Route path="/TermsAndConditions" element={isAuthenticated ? <TermsAndConditions /> : <Navigate to="/login" />} />
        <Route path="/parcelorder" element={isAuthenticated ? <ParcelOrder /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/qrcode" element={isAuthenticated ? <QrCode /> : <Navigate to="/login" />} />
        <Route path="/createqrcode" element={isAuthenticated ? <Createqrcode /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
