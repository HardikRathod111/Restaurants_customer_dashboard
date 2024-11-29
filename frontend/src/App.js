import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Forgotpassword from './Admin/Pages/Forgotpassword';
import Otp from './Admin/Pages/Otp';
import Register from './Admin/Pages/Register';
import Resetpassword from './Admin/Pages/Resetpassword';
import Login from './Admin/Pages/Login';
import ProfilePage from './Admin/Profile/ProfilePage';
import ChangePasswordPage from './Admin/Profile/ChangePasswordPage';
import TermsAndConditions from './Admin/Profile/TermsAndConditions';
import Dashboard from './Admin/Dashboard/Dashboard';
import Editprofile from './Admin/Profile/Editprofile';
import QrCode from './Admin/Qrcodes/QrCode';
import Createqrcode from './Admin/Qrcodes/Createqrcode';
import OnsiteOrder from './Admin/Manageorder/Onsiteorder/OnsiteOrder';
import PaymentParcel from './Admin/PaymentHistory/Parcelpayment/PaymentParcel';
import PaymentOnsite from './Admin/PaymentHistory/Onsitepayment/PaymentOnsite';
import DeletePrompt from './Admin/ManageMenu/DeletePrompt';
import Managemenu from './Admin/ManageMenu/Managemenu';
import Edititem from './Admin/ManageMenu/BurgerEditDetailsBox';
import AddItems from './Admin/ManageMenu/AddItems';
import CartPage from './Customer/CartPage/CartPage';
import ItemDetails from './Customer/Details/ItemsDetails';
import ParcelLogin from './Customer/pages/Login';
import ParcelHomePage from './Customer/Home/ParcelHomePage';
import ParcelCategory from './Customer/Categories/ParcelCategory';
import TrendingMenu from './Customer/TrendingMenu/TrendingMenu';
import AddMoreItems from './Customer/Payment/AddMoreItems';
import PaymentMethod from './Customer/Payment/Paymentmethod';
import Kitchen from './Admin/Manageorder/Kitchen/Kitchen';
import ParcelOrder from './Admin/Manageorder/Parcelorder/ParcelOrder';
import Deliver from './Admin/Manageorder/Kitchen/Deliver';



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
        <Route path="/login" element={<Login/>} />
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
          {/* //customer files */}
        <Route path='/itemsdetails/:id' element={<ItemDetails/>}/>
        <Route path='/cartpage' element={<CartPage/>}/>
        <Route path='/parcel-login' element={<ParcelLogin/>}/>
        <Route path='/parcel-homepage' element={<ParcelHomePage/>}/>
        <Route path='/parcel-category' element={<ParcelCategory/>}/>
        <Route path='/trending-menu' element={<TrendingMenu/>}/>
        <Route path='/addmoreitems' element={<AddMoreItems/>}/>
        <Route path='/paymentmethod' element={<PaymentMethod/>}/>
        <Route path='/kitchen' element={<Kitchen/>}/>
        <Route path='/deliver' element={<Deliver/>}/>

        {/* Protected routes (Only accessible if authenticated) */}
        <Route path="/onsiteorder" element={isAuthenticated ? <OnsiteOrder /> : <Navigate to="/login" />} />
        <Route path="/editprofile" element={isAuthenticated ? <Editprofile /> : <Navigate to="/login" />} />
        <Route path="/Profilepage" element={isAuthenticated ? <ProfilePage/> : <Navigate to="/login" />} />
        <Route path="/ChangePassword" element={isAuthenticated ? <ChangePasswordPage /> : <Navigate to="/login" />} />
        <Route path="/TermsAndConditions" element={isAuthenticated ? <TermsAndConditions /> : <Navigate to="/login" />} />
        <Route path="/parcelorder" element={isAuthenticated ? <ParcelOrder/>  : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/qrcode" element={isAuthenticated ? <QrCode /> : <Navigate to="/login" />} />
        <Route path="/createqrcode" element={isAuthenticated ? <Createqrcode /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;