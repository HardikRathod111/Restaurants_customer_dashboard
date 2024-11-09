
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

