const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getAnalytics,
} = require(
  "../controllers/dashboardAnalyticsController"
);

router.get(
  "/",
  authMiddleware,
  getAnalytics
);

module.exports = router;