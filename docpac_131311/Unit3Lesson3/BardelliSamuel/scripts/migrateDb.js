const { db } = require('./../models/database')
const fs = require('fs')
const path = require('path')

const createMigrations = `
    CREATE TABLE IF NOT EXISTS migrations (
        name TEXT PRIMARY KEY,
        date INTEGER NOT NULL
)`
db.exec(createMigrations)
entries = db.prepare('SELECT * FROM migrations').all()


fs.readdir(path.join(__dirname, '../migrations'), (err, filess) => {
    let files = filess.sort()
    console.log(files)

    for (const file of files) {
        if (entries.find((element) => element.name == file)) {
            console.log(`Did not run migration:   ${file}`)
        }
        else {
            const realFile = require(`../migrations/${file}`)
            try{
            realFile.up(db)
            }
            catch (e){
                console.log(e)
            }
            try{
            const insert = db.prepare('INSERT INTO migrations (value, source, date) VALUES (?,?,?)')
            insert.run(file, Date.now())
            console.log(`Ran migration:  ${file}`)
            }
            catch (e){
                console.log(e)
                realFile.down(db)
            }
            
        }
    }
})