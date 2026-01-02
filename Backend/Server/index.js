const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use("/auth", authRoutes);
app.use("/games", authMiddleware, gameRoutes);       
app.use("/favorites", authMiddleware, favoriteRoutes); 

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
