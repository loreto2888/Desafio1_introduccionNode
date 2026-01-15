const fs = require('fs/promises');
const path = require('path');

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

async function registrar(nombre, edad, animal, color, enfermedad) {
  const citas = await leerCitas();
  const cita = { nombre, edad, animal, color, enfermedad };
  citas.push(cita);
  await guardarCitas(citas);
  return cita;
}

async function leer() {
  return leerCitas();
}

module.exports = {
  registrar,
  leer,
};
