import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../../components/products/ProductList";
import Support from "../Support";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("✅ Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="user-dashboard">
      <h2>🛒 Welcome to IWB Recycling Marketplace</h2>
      <p>Explore sustainable products and log your queries below.</p>

      <section>
        <h3>♻ Available Recycling Products</h3>
        <ProductList />
      </section>

      <section>
        <Support />
      </section>
       {/* ✅ Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default UserDashboard;
