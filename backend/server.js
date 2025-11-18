const express = require("express");
const path = require("path");
const cors = require("cors");

require("./DB/database.js"); // Asegurarse de que la base de datos se inicialice

const usuariosRouter = require("./routes/usuarios");

const app = express();
const PORT = 3000;

// Middlewares generales
app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuariosRouter);

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API NESB funcionando" });
});

// Servir frontend estático
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor NESB escuchando en http://localhost:${PORT}`);
});
