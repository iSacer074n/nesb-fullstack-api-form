const API_URL = "/api/usuarios";

const tablaUsuarios = document.getElementById("tabla-usuarios");
const form = document.getElementById("user-form");
const inputId = document.getElementById("user-id");
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const alertContainer = document.getElementById("alert-container");
const btnEliminarTodo = document.getElementById("btn-eliminar-todo");

// Mostrar alertas de bootstrap
function showAlert(message, type = "success") {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Cargar todos los usuarios
async function cargarUsuarios() {
  const res = await fetch(API_URL);
  const usuarios = await res.json();

  tablaUsuarios.innerHTML = "";

  if (usuarios.length === 0) {
    tablaUsuarios.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted">No hay usuarios todavía.</td>
      </tr>
    `;
    return;
  }

  usuarios.forEach((u) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarUsuario(${u.id}, '${u.nombre}', '${u.email}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${u.id})">Eliminar</button>
      </td>
    `;

    tablaUsuarios.appendChild(tr);
  });
}

// Crear usuario
async function crearUsuario(nombre, email) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email }),
  });

  const data = await res.json();

  if (!res.ok) {
    showAlert(data.error || "Error al crear usuario", "danger");
    return;
  }

  showAlert("Usuario agregado");
  cargarUsuarios();
}

// Actualizar usuario
async function actualizarUsuario(id, nombre, email) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email }),
  });

  const data = await res.json();

  if (!res.ok) {
    showAlert(data.error || "Error al actualizar usuario", "danger");
    return;
  }

  showAlert("Usuario actualizado");
  cargarUsuarios();
}

// Eliminar usuario
async function eliminarUsuario(id) {
  if (!confirm("¿Eliminar este usuario?")) return;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    showAlert("Error al eliminar usuario", "danger");
    return;
  }

  showAlert("Usuario eliminado");
  cargarUsuarios();
}

// Eliminar todos
async function eliminarTodos() {
  if (!confirm("¿Eliminar TODOS los usuarios?")) return;

  const res = await fetch(API_URL, {
    method: "DELETE",
  });

  const data = await res.json();

  showAlert(data.message);
  cargarUsuarios();
}

// Editar (rellena el formulario)
function editarUsuario(id, nombre, email) {
  inputId.value = id;
  inputNombre.value = nombre;
  inputEmail.value = email;

  btnGuardar.textContent = "Guardar cambios";
  btnCancelar.hidden = false;
}

// Cancelar edición
btnCancelar.addEventListener("click", () => {
  inputId.value = "";
  form.reset();
  btnGuardar.textContent = "Agregar";
  btnCancelar.hidden = true;
});

// Evento submit del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = inputId.value;
  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();

  if (id) {
    actualizarUsuario(id, nombre, email);
  } else {
    crearUsuario(nombre, email);
  }

  form.reset();
  inputId.value = "";
  btnGuardar.textContent = "Agregar";
  btnCancelar.hidden = true;
});

// Botón eliminar todos
btnEliminarTodo.addEventListener("click", eliminarTodos);

// Cargar usuarios al iniciar
cargarUsuarios();
