import React from "react";
import { useNavigate } from "react-router-dom";
import SystemMonitor from "../../components/dashboards/DeveloperDashboard/SystemMonitor";

const Developer = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role"); 
    alert("✅ Logged out successfully!");
    navigate("/"); 
  };

  return (
    <div className="developer-dashboard">
      <h2>🚀 Developer Dashboard</h2>
      <p>Manage cloud-based deployment, monitor system performance, and ensure smooth operations.</p>

      {/* ✅ System Monitoring */}
      <SystemMonitor />


      <div className="developer-links">
        <h3>🔗 Project Resources</h3>
        <p>View the latest code changes and deployment below.</p>
<div>
  <a href="https://github.com/Mysticjacob/cloud-computing" target="_blank" rel="noopener noreferrer">Backend GitHub Repository 📂</a>
</div>

<div>
  <a href="https://github.com/Mysticjacob/awb-company" target="_blank" rel="noopener noreferrer">Frontend GitHub Repository 📂</a>
</div>

<div>
  <a href="https://vercel.com/selekanes-projects-badb545a" target="_blank" rel="noopener noreferrer">Deployment 🚀</a>
</div>

      </div>
    <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Developer;
