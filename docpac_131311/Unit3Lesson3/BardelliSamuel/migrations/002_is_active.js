function up(db) {
    const addActive = `
    ALTER TABLE users ADD COLUMN is_active BOOL NOT NULL`
    db.exec(addActive)
}

function down(db) {
    const dropActive = `
    ALTER TABLE users DROP COLUMN is_active`
    db.exec(dropActive)
}