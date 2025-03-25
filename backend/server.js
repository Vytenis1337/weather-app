const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to log city selection
app.post("/log", (req, res) => {
  const { cityName } = req.body;

  const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
  console.log(`📍 User selected: ${cityName}, at ${timestamp}`);

  res.status(200).json({ message: "Logged successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
