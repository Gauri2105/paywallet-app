const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getWalletBalance,
  topupWallet,
} = require("../controllers/walletController");

router.get(
  "/balance",
  authMiddleware,
  getWalletBalance
);

router.post(
  "/topup",
  authMiddleware,
  topupWallet
);

module.exports = router;