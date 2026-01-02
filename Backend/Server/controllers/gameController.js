const pool = require("../models/db");

const getGames = async (req, res) => {
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

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getGames };
