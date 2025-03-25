const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post("/log", (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" }); // ✅
  }

  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];

  db.run(
    `INSERT INTO user_actions (city_name, timestamp) VALUES (?, ?)`,
    [cityName, timestamp],
    function (err) {
      if (err) {
        console.error("❌ Error inserting into DB:", err.message);
        return res.status(500).json({ error: "Failed to log action" });
      }

      console.log(`📍 Logged: ${cityName} @ ${timestamp}`);
      res.status(200).json({ message: "Logged and saved to DB" });
    }
  );
});

app.get("/logs", (req, res) => {
  db.all(`SELECT * FROM user_actions ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch logs" });
    }
    res.json(rows);
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
