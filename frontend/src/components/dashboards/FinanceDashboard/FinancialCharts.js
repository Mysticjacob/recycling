import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import "./FinancialCharts.css"; 


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const FinancialCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [financialSummary, setFinancialSummary] = useState({
    revenue: 0,
    transactions: 0,
    expenses: 0,
    netIncome: 0,
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/finance/chart");
        console.log("✅ Fetched Financial Data:", response.data); // Debugging log

        if (!response.data || response.data.length === 0) {
          throw new Error("❌ No financial records found.");
        }

        setFinancialSummary({
          revenue: response.data.totalRevenue,
          transactions: response.data.totalTransactions,
          expenses: response.data.totalExpenses,
          netIncome: response.data.totalRevenue - response.data.totalExpenses,
        });

        setChartData({
          labels: response.data.labels,
          datasets: [
            {
              label: "Revenue Growth",
              data: response.data.values,
              backgroundColor: "rgba(0, 123, 255, 0.6)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            },
          ],
        });

        setPieChartData({
          labels: response.data.labels,
          datasets: [
            {
              data: response.data.values,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40"],
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching financial data:", err);
        setError("❌ Failed to load financial charts.");
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <p className="loading-text">⏳ Loading financial charts...</p>;
  if (error) return <p className="error-text">❌ {error}</p>;

  return (
    <div className="financial-dashboard-container">
      <h2>Finance Dashboard</h2>

      {/* Summary Metrics */}
      <div className="summary-container">
        <div className="summary-box">
          <h3>Total Revenue:</h3>
          <p>${financialSummary.revenue.toLocaleString()}</p>
        </div>
        <div className="summary-box">
          <h3>Total Sales Transactions:</h3>
          <p>{financialSummary.transactions}</p>
        </div>
        <div className="summary-box">
          <h3>Total Expenses:</h3>
          <p>${financialSummary.expenses.toLocaleString()}</p>
        </div>
        <div className="summary-box net-income">
          <h3>Net Income:</h3>
          <p>${financialSummary.netIncome.toLocaleString()}</p>
        </div>
      </div>

      {/* Bar Chart for Revenue Growth */}
      <div className="chart-container">
        <h3>Revenue Growth (Bar Chart)</h3>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Pie Chart for Revenue Distribution - Directly below Bar Chart */}
      <div className="chart-container">
        <h3>Revenue Distribution (Pie Chart)</h3>
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default FinancialCharts;
