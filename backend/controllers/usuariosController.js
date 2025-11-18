const {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  deleteAllUsuarios,
} = require("../models/usuarioModel");

// GET /api/usuarios
function listarUsuarios(req, res) {
  getAllUsuarios((err, usuarios) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(usuarios);
  });
}

// POST /api/usuarios
function crearUsuario(req, res) {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios" });
  }

  createUsuario(nombre, email, (err, nuevoUsuario) => {
    if (err) {
      console.error("Error al crear usuario:", err);
      // error típico por email duplicado
      if (err.message && err.message.includes("UNIQUE")) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }
      return res.status(500).json({ error: "Error al crear usuario" });
    }
    res.status(201).json(nuevoUsuario);
  });
}

// PUT /api/usuarios/:id
function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios" });
  }

  updateUsuario(id, nombre, email, (err, usuarioActualizado) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      if (err.message && err.message.includes("UNIQUE")) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
    res.json(usuarioActualizado);
  });
}

// DELETE /api/usuarios/:id
function eliminarUsuario(req, res) {
  const { id } = req.params;

  deleteUsuario(id, (err) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
    res.status(204).send(); // sin contenido, pero ok
  });
}

// DELETE /api/usuarios
function eliminarTodos(req, res) {
  deleteAllUsuarios((err) => {
    if (err) {
      console.error("Error al eliminar todos los usuarios:", err);
      return res.status(500).json({ error: "Error al eliminar todos los usuarios" });
    }
    res.json({ message: "Todos los usuarios fueron eliminados" });
  });
}

module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  eliminarTodos,
};
