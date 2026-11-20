import { obtenerAlumnos, registrarAlumno } from "./api.js";

const formAlumno = document.getElementById("formAlumno");
const inputNombre = document.getElementById("nombre");
const inputCarrera = document.getElementById("carrera");
const tablaAlumnos = document.getElementById("tablaAlumnos");
const btnActualizar = document.getElementById("btnActualizar");
const mensajeEstado = document.getElementById("mensajeEstado");

function mostrarMensaje(texto, esError = false) {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje ${esError ? "err" : "ok"}`;
}

function renderizarTabla(alumnos) {
  if (!alumnos.length) {
    tablaAlumnos.innerHTML = '<tr><td colspan="3" class="vacio">No hay alumnos registrados todavía.</td></tr>';
    return;
  }

  tablaAlumnos.innerHTML = "";
  alumnos.forEach((alumno) => {
    const fila = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = alumno.id;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = alumno.nombre;

    const tdCarrera = document.createElement("td");
    tdCarrera.textContent = alumno.carrera;

    fila.append(tdId, tdNombre, tdCarrera);
    tablaAlumnos.appendChild(fila);
  });
}

async function cargarAlumnos() {
  try {
    const alumnos = await obtenerAlumnos();
    renderizarTabla(alumnos);
  } catch (error) {
    mostrarMensaje(error.message, true);
  }
}

formAlumno.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const nombre = inputNombre.value.trim();
  const carrera = inputCarrera.value.trim();

  if (!nombre || !carrera) {
    mostrarMensaje("Completa el nombre y la carrera.", true);
    return;
  }

  try {
    const creado = await registrarAlumno(nombre, carrera);
    mostrarMensaje(`Alumno guardado en PostgreSQL (ID #${creado.id}).`);
    formAlumno.reset();
    await cargarAlumnos();
  } catch (error) {
    mostrarMensaje(error.message, true);
  }
});

btnActualizar.addEventListener("click", cargarAlumnos);
document.addEventListener("DOMContentLoaded", cargarAlumnos);
