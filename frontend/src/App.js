<<<<<<< HEAD
// App.js
import React from 'react';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './Dashboard/ProfilePage';
import ChangePasswordPage from './Dashboard/ChangePasswordPage';
import TermsAndConditions from './Dashboard/TermsAndConditions';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={< Register/>} />
            <Route path='/Profilepage' element={<ProfilePage/>}/>
            <Route path='/ChangePassword' element={<ChangePasswordPage/>}/>
            <Route path='/TermsAndConditions' element={<TermsAndConditions/>}/>
      </Routes>
      </Router>
  );
}

export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forgotpassword from './Pages/Forgotpassword';
import Otp from './Pages/Otp';
import Register from './Pages/Register';
import Resetpassword from './Pages/Resetpassword';
import Login from "./Pages/Login/Login";
import ProfilePage from './Dashboard/ProfilePage';
import ChangePasswordPage from './Dashboard/ChangePasswordPage';
import TermsAndConditions from './Dashboard/TermsAndConditions';
import ParcelOrder from './Dashboard/ParcelOrder';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
            <Route path="/" element={< Register/>} />
            <Route path='/Profilepage' element={<ProfilePage/>}/>
            <Route path='/ChangePassword' element={<ChangePasswordPage/>}/>
            <Route path='/TermsAndConditions' element={<TermsAndConditions/>}/>
            <Route path="/parcelorder" element={< ParcelOrder/>} />
      </Routes>
      </Router>
  );
}

export default App;
>>>>>>> 0e11f154a57eea780aa3152d0d73100101b82927
