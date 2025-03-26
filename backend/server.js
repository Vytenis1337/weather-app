const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "https://weather-app-gcp-454913.web.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.post("/log", async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  const timestamp = new Date().toISOString();

  try {
    await db.collection("user_actions").add({
      city_name: cityName,
      timestamp,
    });

    console.log(`📍 Logged to Firestore: ${cityName} @ ${timestamp}`);
    res.status(200).json({ message: "Logged to Firestore" });
  } catch (err) {
    console.error("Firestore error:", err.message);
    res.status(500).json({ error: "Failed to log to Firestore" });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const snapshot = await db
      .collection("user_actions")
      .orderBy("timestamp", "desc")
      .get();
    const logs = snapshot.docs.map((doc) => doc.data());
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

module.exports = app;
