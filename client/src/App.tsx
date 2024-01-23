import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Houses from "./pages/houses/Houses";
import Login from "./pages/login/Login";
import "./App.css";
import Register from "./pages/register/Register";
import House from "./pages/house/House";
import Checkout from "./pages/checkout/Checkout.tsx";
import Reservations from "./pages/reservations/Reservations.tsx";
import SuccessPage from "./pages/success/Success.tsx";
import CancelPage from "./pages/cancel/Cancel.tsx";
import AccountSettings from "./pages/userSettings/AccountSettings.tsx";
function App() {

  // console.log(import.meta.env.VITE_API_KEY)

  return (
    <>
      <div className="mainContainer">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/houses/:id" element={<House />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessPage />} />
           <Route path="/cancel" element={<CancelPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/your-reservations" element={<Reservations />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
