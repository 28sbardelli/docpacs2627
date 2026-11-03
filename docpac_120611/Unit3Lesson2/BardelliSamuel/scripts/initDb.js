const { db } = require('./../models/database')

const createEntries = `
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT NULL,
        source TEXT NOT NULL,
        date INTEGER NOT NULL
)`


db.exec(createEntries)

db.close()