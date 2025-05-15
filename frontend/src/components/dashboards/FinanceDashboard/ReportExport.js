import React from "react";
import axios from "axios";

const ReportExport = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/finance/export", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "financial_report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting report", error);
      alert("Error exporting report.");
    }
  };

  return (
    <div>
      <h2>Export Financial Report</h2>
      <button onClick={handleExport}>Download PDF</button>
    </div>
  );
};

export default ReportExport;
