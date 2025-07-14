const jwt = require("jsonwebtoken");
const db = require("../config/mysql");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    if (!results.length) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  });
};
