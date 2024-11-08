// App.js
import React from 'react';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={< Register/>} />
      </Routes>
      </Router>
  );
}

export default App;
