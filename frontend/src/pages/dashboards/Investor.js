import React from "react";
import InvestorReports from "../../components/dashboards/InvestorDashboard/InvestorReports";
import FinancialPerformance from "../../components/dashboards/InvestorDashboard/FinancialPerformance";
import GrowthMetrics from "../../components/dashboards/InvestorDashboard/GrowthMetrics";

const Investor = () => {
  return (
    <div>
      <h2>Investor Dashboard</h2>
      <InvestorReports />
      <FinancialPerformance />
      <GrowthMetrics />
    </div>
  );
};

export default Investor;
