import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const GrowthMetrics = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGrowthMetrics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investor/growth-metrics");
        const { labels, values } = response.data;

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue Growth",
              data: values,
              backgroundColor: "rgba(0, 128, 0, 0.6)",
              borderRadius: 5,
              barPercentage: 0.5,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching growth metrics data", error);
        setError("Failed to load growth metrics.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrowthMetrics();
  }, []);

  if (loading) return <p>Loading growth metrics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Growth Metrics</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default GrowthMetrics;
