const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  searchUsers,
  getRecentContacts,
} = require(
  "../controllers/userController"
);

router.get(
  "/search",
  authMiddleware,
  searchUsers
);

router.get(
  "/recent",
  authMiddleware,
  getRecentContacts
);

module.exports = router;