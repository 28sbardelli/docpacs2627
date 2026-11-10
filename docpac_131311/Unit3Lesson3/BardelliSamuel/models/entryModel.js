function createEntry(value, source){
    const { db } = require('./../models/database')
    const now = Date.now()
    const insert = db.prepare('INSERT INTO entries (value, source, date) VALUES (?,?,?)')
    insert.run(value, source, now)
}

function getAllEntries(){
    const { db } = require('./../models/database')
    entries = db.prepare('SELECT * FROM entries').all()
    return entries
}

function selectQuery(x, y){
    const { db } = require('./../models/database')
    const select = db.prepare('SELECT * FROM entries WHERE ? = ?')
    console.log(select.run(x, y))
}

function closedb(){
    const { db } = require('./../models/database')
    db.close()
}

module.exports = {createEntry, getAllEntries, selectQuery, closedb}