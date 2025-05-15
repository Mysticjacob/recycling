const Sale = require("../models/Sales");

const recordSale = async (req, res) => {
  try {
    const { productName, price, quantity } = req.body;

    const newSale = new Sale({ productName, price, quantity });
    await newSale.save();

    res.status(201).json({ message: "✅ Sale recorded successfully!", sale: newSale });
  } catch (error) {
    console.error("  Error saving sale:", error);
    res.status(500).json({ error: "  Failed to record sale." });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({}, { buyerEmail: 0 });
    res.json(sales);
  } catch (error) {
    console.error(" Error fetching sales data:", error);
    res.status(500).json({ error: " Failed to retrieve sales." });
  }
};

const getAggregatedSalesData = async (req, res) => {
  try {
    const { period } = req.query;

    let aggregationPipeline = [
      {
        $project: {
          amount: { $multiply: ["$price", "$quantity"] },
          purchaseDate: 1, 
        },
      },
    ];

    if (period === 'day') {
      aggregationPipeline.push({
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$purchaseDate" } }, 
          amount: 1,
        },
      });
    } else if (period === 'month') {
      aggregationPipeline.push({
        $project: {
          month: { $month: "$purchaseDate" },
          year: { $year: "$purchaseDate" },
          amount: 1,
        },
      });
      aggregationPipeline.push({
        $project: {
          date: { $concat: [{ $toString: "$year" }, "-", { $toString: "$month" }] },
          amount: 1,
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: "$date", 
        totalSales: { $sum: "$amount" }, 
      },
    });

    aggregationPipeline.push({
      $sort: { "_id": 1 },
    });

    const result = await Sale.aggregate(aggregationPipeline);

    const labels = result.map((data) => data._id); 
    const values = result.map((data) => data.totalSales); 

    res.json({
      labels,
      values,
    });
  } catch (error) {
    console.error(" Error fetching aggregated sales data:", error);
    res.status(500).json({ error: " Failed to retrieve aggregated sales data." });
  }
};

module.exports = { recordSale, getAllSales, getAggregatedSalesData };
