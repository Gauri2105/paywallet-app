const User = require("../models/User");
const Transaction = require("../models/Transaction");

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({
      _id: { $ne: req.user.userId },
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    })
      .select("_id name email")
      .limit(10);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecentContacts = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const transactions =
      await Transaction.find({
        sender: userId,
      })
        .populate(
          "receiver",
          "name email profileImage"
        )
        .sort({
          createdAt: -1,
        });

    const uniqueContacts = [];
    const seen = new Set();

    transactions.forEach((tx) => {
      if (
        tx.receiver &&
        !seen.has(
          tx.receiver._id.toString()
        )
      ) {
        seen.add(
          tx.receiver._id.toString()
        );

        uniqueContacts.push(
          tx.receiver
        );
      }
    });

    res.status(200).json({
      success: true,
      contacts:
        uniqueContacts.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  searchUsers,
  getRecentContacts,
};