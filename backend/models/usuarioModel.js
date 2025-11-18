const db = require("../DB/database");

// Obtener todos los usuarios
function getAllUsuarios(callback) {
  const sql = "SELECT id, nombre, email FROM usuarios ORDER BY id ASC";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
}

// Crear un usuario
function createUsuario(nombre, email, callback) {
  const sql = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
  db.run(sql, [nombre, email], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, { id: this.lastID, nombre, email });
    }
  });
}

// Actualizar un usuario
function updateUsuario(id, nombre, email, callback) {
  const sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?";
  db.run(sql, [nombre, email, id], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, { id, nombre, email });
    }
  });
}

// Eliminar por ID
function deleteUsuario(id, callback) {
  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.run(sql, [id], function (err) {
    callback(err);
  });
}

// Eliminar todos los usuarios
function deleteAllUsuarios(callback) {
  const sql = "DELETE FROM usuarios";
  db.run(sql, [], function (err) {
    callback(err);
  });
}

module.exports = {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  deleteAllUsuarios,
};
