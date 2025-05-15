const Sale = require("../models/Sales");

const getFinanceData = async (req, res) => {
  try {
    const sales = await Sale.find();

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
    const totalSales = sales.length;

    const totalExpenses = 50000; 
    res.json({
      totalRevenue,
      totalSales,
      totalExpenses,
      netIncome: totalRevenue - totalExpenses,
    });
  } catch (error) {
    console.error("❌ Error fetching finance data:", error);
    res.status(500).json({ error: "❌ Failed to retrieve financial records." });
  }
};

module.exports = { getFinanceData };
