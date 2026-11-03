const session = require('express-session')
const Database = require('better-sqlite3')
const path = require('path')
require('dotenv').config()
const sessionSecret = process.env.SESSION_SECRET
const SqliteStore = require('better-sqlite3-session-store')(session)
const db = new Database(path.join(__dirname, '../data/sessions.db'))
let sessions = session({
    store: new SqliteStore({
        client: db,
        expired: {
            clear: true,
            intervalMs: 900000
        }
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
})

module.exports = { sessions }