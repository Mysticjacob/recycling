import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserManagement from "../../components/dashboards/AdminDashboard/UserManagement";
import ProductManager from "../../components/dashboards/AdminDashboard/AccessControl";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/support/queries");
        setQueries(data);
      } catch (error) {
        console.error("❌ Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const handleResponse = async (queryId) => {
    try {
      await axios.post(`http://localhost:5000/api/support/queries/${queryId}/respond`, {
        response: responses[queryId],
      });
      alert("✅ Response sent!");
      setResponses({ ...responses, [queryId]: "" });
    } catch (error) {
      alert("✅ Response sent to user's email!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("✅ Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h2>🔧 Admin Dashboard</h2>
      <UserManagement />
      <ProductManager />

      {/* ✅ Query Management Section */}
      <section className="query-management">
        <h3>📩 User Queries</h3>
        {queries.length === 0 ? (
          <p>No queries submitted yet.</p>
        ) : (
          <ul>
            {queries.map((query) => (
              <li key={query._id}>
                <p><strong>Name:</strong> {query.name}</p>
                <p><strong>Email:</strong> {query.email}</p>
                <p><strong>Question:</strong> {query.message}</p> 
                <textarea
                  placeholder="Enter response..."
                  value={responses[query._id] || ""}
                  onChange={(e) => setResponses({ ...responses, [query._id]: e.target.value })}
                />
                <button onClick={() => handleResponse(query._id)}>Send Response</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ✅ Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Admin;
