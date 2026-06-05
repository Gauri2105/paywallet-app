const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.status(200).json({
      success: true,
      balance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const topupWallet = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const user = await User.findById(userId);

    user.walletBalance += Number(amount);

    await user.save();

    await Transaction.create({
      receiver: user._id,
      amount,
      type: "TOPUP",
    });

    res.status(200).json({
      success: true,
      message: "Wallet topped up successfully",
      balance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWalletBalance,
  topupWallet,
};