const User = require("../models/User");
const Transaction = require("../models/Transaction");

const sendMoney = async (req, res) => {
  try {
    const senderId = req.user.userId;

    const { receiverEmail, amount } = req.body;

    const sender = await User.findById(senderId);

    const receiver = await User.findOne({
      email: receiverEmail,
    });

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    if (sender.email === receiver.email) {
      return res.status(400).json({
        success: false,
        message: "Cannot send money to yourself",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (sender.walletBalance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    sender.walletBalance -= amount;
    receiver.walletBalance += amount;

    await sender.save();
    await receiver.save();
    
    const transaction = await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      type: "TRANSFER",
    });

    res.status(200).json({
      success: true,
      message: "Money transferred successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMoney,
  getTransactionHistory,
};
