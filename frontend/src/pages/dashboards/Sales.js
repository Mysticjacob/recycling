import React from "react";
import { useNavigate } from "react-router-dom";
import SalesDashboard from "../../components/dashboards/SalesDashboard/SalesOverview";
import SalesPerformanceChart from "../../components/dashboards/SalesDashboard/SalesPerformanceChart";
import SalesRecords from "../../components/dashboards/SalesDashboard/SalesRecords";

const Sales = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role"); 
    alert("✅ Logged out successfully!");
    navigate("/"); 
  };
  return (
    <div>
      <h2>Sales Dashboard</h2>
      
      <SalesDashboard />
      <SalesPerformanceChart />
      <SalesRecords />
       <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Sales;
