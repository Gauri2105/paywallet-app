const Transaction = require("../models/Transaction");

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions =
      await Transaction.find({
        $or: [
          { sender: userId },
          { receiver: userId },
        ],
      });

    let totalSent = 0;
    let totalReceived = 0;

    transactions.forEach((t) => {
      if (
        t.sender &&
        t.sender.toString() === userId
      ) {
        totalSent += t.amount;
      }

      if (
        t.receiver &&
        t.receiver.toString() === userId
      ) {
        totalReceived += t.amount;
      }
    });

    res.json({
      success: true,
      totalSent,
      totalReceived,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};