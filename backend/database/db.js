const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/events.db')

db.serialize(() => {
  // create events table
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      city TEXT NOT NULL,
      date TEXT NOT NULL,
      user_id INTEGER NOT NULL
    )
  `)
  
  // create user table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    )
  `)
})
module.exports = db
