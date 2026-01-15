// Derechos de autor (c) 2026 Johanna Barrientos.
const { listarCitas, registrarCita, obtenerCitaPorId } = require('./operaciones');

const [, , comando, ...args] = process.argv;

function mostrarAyuda() {
  console.log('Comandos disponibles:');
  console.log('  registrar <nombre> <edad> <animal> <color> <enfermedad>');
  console.log('  listar');
  console.log('  detalle <id>');
}

async function run() {
  try {
    switch (comando) {
      case 'registrar': {
        const [nombre, edad, animal, color, enfermedad] = args;
        if (!nombre || !edad || !animal || !color || !enfermedad) {
          console.log('Faltan datos: registrar <nombre> <edad> <animal> <color> <enfermedad>');
          return;
        }

        const cita = await registrarCita({ nombre, edad, animal, color, enfermedad });
        console.log(`Cita creada con id ${cita.id}`);
        return;
      }

      case 'listar': {
        const citas = await listarCitas();
        if (!citas.length) {
          console.log('No hay citas registradas.');
          return;
        }

        console.log('Citas registradas:');
        citas.forEach((cita) => {
          const etiqueta = cita.id || 'sin-id';
          console.log(`[${etiqueta}] ${cita.nombre} (${cita.animal}) - ${cita.enfermedad}`);
        });
        return;
      }

      case 'detalle': {
        const [id] = args;
        if (!id) {
          console.log('Uso: detalle <id>');
          return;
        }

        const cita = await obtenerCitaPorId(id);
        if (!cita) {
          console.log(`No se encontro una cita con id ${id}`);
          return;
        }

        console.log(JSON.stringify(cita, null, 2));
        return;
      }

      default:
        mostrarAyuda();
        return;
    }
  } catch (error) {
    console.error('Ocurrio un error:', error.message);
  }
}

run();

// Footer de referencia para UI web:
// <footer><small>&copy; 2026 Johanna Barrientos. Todos los derechos reservados.</small></footer>


