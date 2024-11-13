import Forgotpassword from './Pages/Forgotpassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Otp from './Pages/Otp';
import Resetpassword from './Pages/Resetpassword';
import ParcelOrder from './Dashboard/ParcelOrder';
import OnsiteOrder from './Dashboard/OnsiteOrder';
import PaymentParcel from './Dashboard/PaymentParcel';
import PaymentOnsite from './Dashboard/PaymentOnsite';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/forget" element={< Forgotpassword/>} />
            <Route path="/Otp" element={< Otp/>} />
            <Route path="/resetpassword" element={< Resetpassword/>} />
            <Route path="/parcelorder" element={< ParcelOrder/>} />
            <Route path="/onsiteorder" element={< OnsiteOrder/>} />
            <Route path="/paymentparcel" element={< PaymentParcel/>} />
            <Route path="/paymentonsite" element={< PaymentOnsite/>} />
      </Routes>
      </Router>
  );
}

export default App;