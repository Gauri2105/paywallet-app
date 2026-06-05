const Transaction = require("../models/Transaction");

const getTopReceivers = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const leaderboard =
      await Transaction.aggregate([
        {
          $match: {
            sender: req.user.userId,
          },
        },
        {
          $group: {
            _id: "$receiver",
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            totalAmount: -1,
          },
        },
        {
          $limit: 5,
        },
      ]);

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTopReceivers,
};