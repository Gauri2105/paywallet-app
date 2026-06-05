const Transaction = require("../models/Transaction");

const getMonthlyAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions =
      await Transaction.find({
        sender: userId,
      });

    const monthlyData = {};

    transactions.forEach((transaction) => {
      const month = new Date(
        transaction.createdAt
      ).toLocaleString("default", {
        month: "short",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) +
        transaction.amount;
    });

    const result = Object.keys(
      monthlyData
    ).map((month) => ({
      month,
      amount: monthlyData[month],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMonthlyAnalytics,
};