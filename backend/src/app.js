const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardAnalyticsRoutes = require("./routes/dashboardAnalyticsRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", dashboardAnalyticsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PayWallet API Running",
  });
});

module.exports = app;
