import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; 

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SalesCharts = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        console.log("✅ Fetched Sales Records:", response.data); 

        if (!response.data || response.data.length === 0) {
          throw new Error("❌ No sales records found.");
        }

        setSalesRecords(response.data);
        generateChartData(response.data);
      } catch (err) {
        console.error("❌ Error fetching sales records:", err);
        setError(err.message || "Failed to load sales records.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();

    return () => {
      if (chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy(); 
      }
    };
  }, []);

  const generateChartData = (salesRecords) => {
    const labels = [];
    const totalRevenue = [];
    const totalSales = [];

    salesRecords.forEach((record) => {
      const purchaseDate = new Date(record.purchaseDate);
      const dateString = purchaseDate.toLocaleDateString("en-GB"); 

      const existingIndex = labels.indexOf(dateString);
      if (existingIndex >= 0) {
        totalRevenue[existingIndex] += record.price * record.quantity;
        totalSales[existingIndex] += record.quantity;
      } else {
        labels.push(dateString);
        totalRevenue.push(record.price * record.quantity);
        totalSales.push(record.quantity);
      }
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Total Revenue",
          data: totalRevenue,
          backgroundColor: "rgba(0, 123, 255, 0.6)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
          type: "bar",
        },
        {
          label: "Total Sales",
          data: totalSales,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 1,
          tension: 0.3,
          fill: true,
          type: "line",
        },
      ],
    });
  };

  if (loading) return <p className="loading-text">⏳ Loading sales data...</p>;
  if (error) return <p className="error-text">❌ {error}</p>;

  return (
    <div className="sales-charts-container">
      <h2>Sales Charts</h2>

      <section className="chart-container">
        <h3>Total Revenue (Bar Chart)</h3>
        <Bar data={chartData} options={{ responsive: true }} />
      </section>

      <section className="chart-container">
        <h3>Total Sales (Line Chart)</h3>
        <Line data={chartData} options={{ responsive: true }} />
      </section>
    </div>
  );
};

export default SalesCharts;
