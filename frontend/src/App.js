
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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


 

function App() {
  return (
    <Router>
        <Routes>
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
      </Routes>
      </Router>
  );
}

export default App;