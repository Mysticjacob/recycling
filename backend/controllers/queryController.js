const Query = require("../models/SupportQuery");

exports.submitQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const query = new Query({ name, email, message, status: "pending", response: "" });

    await query.save();
    res.status(201).json({ message: "✅ Query submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error submitting query", error });
  }
};

// ✅ Fetch all queries for the admin
exports.getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching queries", error });
  }
};

// ✅ Auto-reply if similar query exists
exports.autoReply = async (req, res) => {
  try {
    const { message } = req.body;
    const previousQuery = await Query.findOne({ message });

    if (previousQuery && previousQuery.response) {
      return res.status(200).json({ reply: previousQuery.response });
    }

    res.status(404).json({ reply: "📩 Our team will get back to you shortly." });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching auto-reply", error });
  }
};

// ✅ Admin responds to a query
exports.respondToQuery = async (req, res) => {
  try {
    const { response } = req.body;
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ message: "❌ Query not found." });
    }

    query.response = response;
    query.status = "answered";
    await query.save();

    res.status(200).json({ message: "✅ Response sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error sending response", error });
  }
};
