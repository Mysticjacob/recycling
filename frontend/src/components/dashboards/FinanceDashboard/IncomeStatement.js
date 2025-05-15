import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeStatement = () => {
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/finance/statement");
        setFinanceData(response.data);
      } catch (error) {
        console.error("Error fetching financial data", error);
        setError("Failed to load financial data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  if (loading) return <p>Loading income statement...</p>;

  return (
    <div>
      <h2>Income Statement</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!financeData.length ? (
        <p>No financial records found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {financeData.map((entry) => (
            <li
              key={entry._id}
              style={{
                color: entry.type === "income" ? "green" : "red",
                marginBottom: "6px",
              }}
            >
              {entry.type === "income" ? "+" : "-"}{" "}
              {Number(entry.amount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              - {entry.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncomeStatement;
