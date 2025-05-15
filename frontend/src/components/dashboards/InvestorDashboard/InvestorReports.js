import React from "react";
import axios from "axios";

const InvestorReports = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/investor/export-report", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "investor_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Error exporting investor report.");
    }
  };

  return (
    <div>
      <h2>Investor Reports</h2>
      <button onClick={handleExport}>Download Investor Report</button>
    </div>
  );
};

export default InvestorReports;
