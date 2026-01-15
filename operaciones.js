// Derechos de autor (c) 2026 Johanna Barrientos.
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const citasPath = path.join(__dirname, 'citas.json');

async function leerCitas() {
  try {
    const data = await fs.readFile(citasPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function guardarCitas(citas) {
  const contenido = JSON.stringify(citas, null, 2);
  await fs.writeFile(citasPath, contenido, 'utf8');
}

function normalizarEdad(valor) {
  if (Number.isNaN(Number(valor))) return valor;
  return Number(valor);
}

async function registrarCita(datos) {
  const citas = await leerCitas();
  const cita = {
    id: randomUUID().slice(0, 8),
    nombre: datos.nombre,
    edad: normalizarEdad(datos.edad),
    animal: datos.animal,
    color: datos.color,
    enfermedad: datos.enfermedad,
    licencia: '(c) 2026 Johanna Barrientos',
    fecha: new Date().toISOString(),
  };

  citas.push(cita);
  await guardarCitas(citas);
  return cita;
}

async function listarCitas() {
  return leerCitas();
}

async function obtenerCitaPorId(id) {
  const citas = await leerCitas();
  return citas.find((cita) => cita.id === id);
}

module.exports = {
  listarCitas,
  registrarCita,
  obtenerCitaPorId,
};
