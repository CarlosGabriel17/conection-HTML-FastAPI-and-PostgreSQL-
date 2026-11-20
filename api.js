const API_URL = "http://127.0.0.1:8000/alumnos";

export async function obtenerAlumnos() {
  const respuesta = await fetch(API_URL, { method: "GET" });
  if (!respuesta.ok) {
    throw new Error(`Error al consultar alumnos (HTTP ${respuesta.status})`);
  }
  return await respuesta.json();
}

export async function registrarAlumno(nombre, carrera) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, carrera }),
  });
  if (!respuesta.ok) {
    const detalle = await respuesta.json().catch(() => ({}));
    throw new Error(detalle.detail || `Error al guardar alumno (HTTP ${respuesta.status})`);
  }
  return await respuesta.json();
}
