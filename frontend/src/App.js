// App.js
import React from 'react';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './Dashboard/ProfilePage';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={< Register/>} />
            <Route path='/Profilepage' element={<ProfilePage/>}/>
      </Routes>
      </Router>
  );
}

export default App;
