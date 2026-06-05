const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    const sentTransactions = await Transaction.find({
      sender: userId,
    });

    const receivedTransactions = await Transaction.find({
      receiver: userId,
    });

    const totalSent = sentTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const totalReceived = receivedTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const recentTransactions = await Transaction.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    })
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      balance: user.walletBalance,
      totalSent,
      totalReceived,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};