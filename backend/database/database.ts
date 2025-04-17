import sqlite3 from "sqlite3";

export const open = async () => {
  const db = await openDb();
  await createTables(db);
  return db;
};

const openDb = async (): Promise<sqlite3.Database> => {
  return new sqlite3.Database("./violet.db", (err) => {
    if (err) {
      console.error("Could not open database", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
};

const createTables = async (db: sqlite3.Database): Promise<void> => {
  db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT NOT NULL UNIQUE,
                username TEXT NOT NULL UNIQUE,
                descript TEXT NOT NULL,
                password TEXT NOT NULL,
                avatarUrl TEXT NOT NULL
            )
        `);

    db.run(`
            CREATE TABLE IF NOT EXISTS letters (
                user_id TEXT NOT NULL,
                id TEXT NOT NULL UNIQUE,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `);
  });
};
