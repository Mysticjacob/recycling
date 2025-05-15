import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Support from "./pages/Support";
import Admin from "./pages/dashboards/Admin";
import Developer from "./pages/dashboards/Developer";
import Finance from "./pages/dashboards/Finance";
import Sales from "./pages/dashboards/Sales";
import Investor from "./pages/dashboards/Investor";
import User from "./pages/dashboards/User";
import './App.css';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/support" element={<Support />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/developer" element={<Developer />} />
      <Route path="/investor" element={<Investor />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
