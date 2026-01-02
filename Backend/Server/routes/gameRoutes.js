const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { sport } = req.query;

    let query = "SELECT * FROM games";
    let values = [];

    if (sport) {
      query += " WHERE sport = $1";
      values.push(sport);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
