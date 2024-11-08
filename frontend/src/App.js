import Forgotpassword from './Pages/Forgotpassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Otp from './Pages/Otp';
import Resetpassword from './Pages/Resetpassword';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
      </Routes>
      </Router>
  );
}

export default App;