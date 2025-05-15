import React, { useState, useEffect } from "react";
import axios from "axios";

const FinancialPerformance = () => {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investor/financial-performance");
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching financial performance data", error);
        setError("Failed to load financial performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  if (loading) return <p>Loading financial data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Financial Performance</h2>
      {financialData.length ? (
        <ul>
          {financialData.map((entry) => (
            <li key={entry._id}>
              <strong>{entry.quarter}</strong>: ${entry.revenue.toLocaleString()} —{" "}
              {entry.profitMargin}% profit
            </li>
          ))}
        </ul>
      ) : (
        <p>No financial performance data available.</p>
      )}
    </div>
  );
};

export default FinancialPerformance;
