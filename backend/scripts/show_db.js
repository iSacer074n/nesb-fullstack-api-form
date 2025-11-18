const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'DB', 'database.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('No se pudo abrir la base de datos:', err.message);
    process.exit(1);
  }
});

db.serialize(() => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('Error listando tablas:', err.message);
    } else {
      console.log('Tablas en la base de datos:', tables.map(t => t.name).join(', ') || '(ninguna)');
    }
  });

  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      console.error('Error consultando la tabla usuarios:', err.message);
    } else {
      console.log('\nContenido de la tabla `usuarios` (hasta 100 filas):');
      console.table(rows.slice(0, 100));
    }
    db.close();
  });
});
