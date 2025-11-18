const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Ruta al archivo de la base de datos
const dbPath = path.join(__dirname, "database.db");

// Crear / abrir la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

// Crear tabla usuarios si no existe
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla usuarios:", err.message);
      } else {
        console.log("Tabla 'usuarios' lista (creada o ya existente).");
      }
    }
  );
});

module.exports = db;
