const express = require("express");
const {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  eliminarTodos,
} = require("../controllers/usuariosController");

const router = express.Router();

// GET /api/usuarios
router.get("/", listarUsuarios);

// POST /api/usuarios
router.post("/", crearUsuario);

// PUT /api/usuarios/:id
router.put("/:id", actualizarUsuario);

// DELETE /api/usuarios/:id
router.delete("/:id", eliminarUsuario);

// DELETE /api/usuarios
router.delete("/", eliminarTodos);

module.exports = router;
