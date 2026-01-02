const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require("../controllers/favoriteController");

router.post("/favorites/:gameId", authMiddleware, addFavorite);
router.delete("/favorites/:gameId", authMiddleware, removeFavorite);
router.get("/favorites", authMiddleware, getFavorites);

module.exports = router;
