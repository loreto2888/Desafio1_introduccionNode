const { registrar, leer } = require('./operaciones');

const [, , operacion, ...args] = process.argv;

async function main() {
  try {
    if (operacion === 'registrar') {
      const [nombre, edad, animal, color, enfermedad] = args;
      if (!nombre || !edad || !animal || !color || !enfermedad) {
        console.log('Uso: node index.js registrar <nombre> <edad> <animal> <color> <enfermedad>');
        return;
      }
      await registrar(nombre, edad, animal, color, enfermedad);
      console.log('Cita registrada');
      return;
    }

    if (operacion === 'leer') {
      const citas = await leer();
      if (!citas.length) {
        console.log('No hay citas registradas');
        return;
      }
      console.log('Citas registradas:');
      citas.forEach((cita, i) => {
        console.log(`${i + 1}. ${cita.nombre} (${cita.animal}) - ${cita.enfermedad}`);
      });
      return;
    }

    console.log('Comandos disponibles:');
    console.log('  registrar <nombre> <edad> <animal> <color> <enfermedad>');
    console.log('  leer');
  } catch (error) {
    console.error('Ocurrio un error:', error.message);
  }
}

main();


