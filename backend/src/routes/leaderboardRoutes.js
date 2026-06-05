const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getTopReceivers,
} = require(
  "../controllers/leaderboardController"
);

router.get(
  "/top-receivers",
  authMiddleware,
  getTopReceivers
);

module.exports = router;