import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SalesRecords.css";

const SalesRecords = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  const [incomeStatement, setIncomeStatement] = useState({
    totalRevenue: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        console.log("✅ Fetched Sales Records:", response.data); 
        if (!response.data || response.data.length === 0) {
          throw new Error("No sales records found.");
        }
        setSalesRecords(response.data);

        // Calculate income statement data
        calculateIncomeStatement(response.data);
      } catch (err) {
        console.error("❌ Error fetching sales records:", err);
        setError(err.message || "Failed to load sales records.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();
  }, []);

  const calculateIncomeStatement = (sales) => {
    let totalRevenue = 0;
    let totalQuantity = 0;

    sales.forEach((record) => {
      totalRevenue += record.price * record.quantity;
      totalQuantity += record.quantity;
    });

    setIncomeStatement({
      totalRevenue,
      totalQuantity,
    });
  };

  if (loading) return <p className="loading-text">⏳ Loading sales records...</p>;
  if (error) return <p className="error-text">❌ {error}</p>;

  return (
    <div className="sales-records-container">
      <h2>Sales Records</h2>

      {/* Income Statement Section */}
      <section className="income-statement">
        <h3>Income Statement</h3>
        <p>Total Revenue: ${incomeStatement.totalRevenue.toLocaleString()}</p>
        <p>Total Quantity Sold: {incomeStatement.totalQuantity}</p>
      </section>

      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.productName}</td>
                <td>{record.quantity}</td>
                <td>${record.price.toLocaleString()}</td>
                <td>{record.status}</td>
                <td>{new Date(record.purchaseDate).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesRecords;
