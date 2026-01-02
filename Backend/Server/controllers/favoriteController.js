const pool = require("../models/db");
const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    await pool.query(
      "INSERT INTO favorites (user_id, game_id) VALUES ($1, $2)",
      [userId, gameId]
    );

    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Already in favorites" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT g.* 
       FROM favorites f
       JOIN games g ON f.game_id = g.id
       WHERE f.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
