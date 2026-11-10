function up(db) {
    const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        dateCreation INTEGER NOT NULL,
        password TEXT NOT NULL
)`
    db.exec(createUsers)
}

function down(db) {
    const deleteUsers = `
    DROP TABLE IF EXISTS users`
    db.exec(deleteUsers)
}