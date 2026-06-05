const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getMonthlyAnalytics,
} = require(
  "../controllers/analyticsController"
);

router.get(
  "/monthly",
  authMiddleware,
  getMonthlyAnalytics
);

module.exports = router;