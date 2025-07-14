require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectMongo = require("./config/mongo");
const db = require("./config/mysql");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const externalRoutes = require("./routes/externalRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectMongo();

const seedUser = () => {
  const username = "admin";
  const plainPassword = "admin123";

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return console.error("MySQL error:", err);

    if (results.length === 0) {
      db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, plainPassword], err2 => {
        if (err2) console.error("Insert error:", err2);
        else console.log("✅ Admin user seeded.");
      });
    } else {
      console.log("⚠️ Admin already exists.");
    }
  });
};

seedUser();

app.use("/login", authRoutes);
app.use("/leads", leadRoutes);
app.use("/external-data", externalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
