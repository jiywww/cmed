import sqlite3 from "sqlite3";
import path from "path";
import { app } from "electron";

// declare a database instance
let db: sqlite3.Database;

/**
 * Create a database in the user's data directory
 * for macOS, this is ~/Library/Application Support/<app name>
 * for windows, this is %APPDATA%/<app name>
 * for linux, this is ~/.config/<app name>
 * @returns void
 */
export function createDB() {
    // const dbPath = path.join(app.getPath("userData"), "cmed.db");
    const dbPath = path.join(__dirname, "../../db/cmed.db");
    db = new sqlite3.Database(dbPath, (err: Error | null) => {
        if (err) {
            console.error("Could not open database", err);
        } else {
            console.log("Connected to SQLite database");
        }
    });
}

/**
 * Create tables in the database
 * database schema:
 * users: id, username, passwordHash, salt
 * @returns void
 */
export function createTables() {
    db.serialize(() => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                passwordHash TEXT NOT NULL,
                salt TEXT NOT NULL
            )
        `,
            (err: Error | null) => {
                if (err) {
                    console.error("Could not create users table", err);
                }
            }
        );
    });
}

/**
 * Initialize the database
 * @returns void
 */
export function initDB() {
    createDB();
    createTables();
}
