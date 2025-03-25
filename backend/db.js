const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./user_logs.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_actions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city_name TEXT,
      timestamp TEXT
    )
  `);
});

module.exports = db;
