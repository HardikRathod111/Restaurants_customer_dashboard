import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Forgotpassword from './Admin/Pages/Forgotpassword';
import Otp from './Admin/Pages/Otp';
import Register from './Admin/Pages/Register';
import Resetpassword from './Admin/Pages/Resetpassword';
import Login from './Admin/Pages/Login';
import ProfilePage from './Admin/Dashboard/ProfilePage';
import ChangePasswordPage from './Admin/Dashboard/ChangePasswordPage';
import TermsAndConditions from './Admin/Dashboard/TermsAndConditions';
import ParcelOrder from './Admin/Dashboard/ParcelOrder';
import Dashboard from './Admin/Dashboard/Dashboard';
import Editprofile from './Admin/Dashboard/Editprofile';
import QrCode from './Admin/Dashboard/QrCode';
import Createqrcode from './Admin/Dashboard/Createqrcode';
import OnsiteOrder from './Admin/Dashboard/OnsiteOrder';
import PaymentParcel from './Admin/Dashboard/PaymentParcel';
import PaymentOnsite from './Admin/Dashboard/PaymentOnsite';
import DeletePrompt from './Admin/Dashboard/DeletePrompt';
import Managemenu from './Admin/Dashboard/Managemenu';
import Edititem from './Admin/Dashboard/BurgerEditDetailsBox';
import AddItems from './Admin/Dashboard/AddItems';
import CartPage from './Customer/CartPage';
import ItemDetails from './Customer/ItemsDetails';
import ParcelLogin from './Customer/Login';
import ParcelHomePage from './Customer/ParcelHomePage';
import ParcelCategory from './Customer/ParcelCategory';
import TrendingMenu from './Customer/TrendingMenu';


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
            <Route path='/managemenu' element={<Managemenu/>}/>
        <Route path='/additems' element={<AddItems/>}/>
        <Route path='/edititem' element={<Edititem/>}/>
        <Route path='/itemsdetails' element={<ItemDetails/>}/>
        <Route path='/cartpage' element={<CartPage/>}/>
         <Route path='/parcel-login' element={<ParcelLogin/>}/>
        <Route path='/parcel-homepage' element={<ParcelHomePage/>}/>
        <Route path='/parcel-category' element={<ParcelCategory/>}/>
        <Route path='/trending-menu' element={<TrendingMenu/>}/>
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