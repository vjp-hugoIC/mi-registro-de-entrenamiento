const NOMBRE_APP = "Registro de entrenamiento";

const entrenamientos = [
    {id: 1, fecha: 1/6/2026, tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 160},
    {id: 2, fecha: 2/6/2026, tipo: "correr", duracion: 100, distancia: 3500, sensaciones: "Buenas", pulsaciones: 163},
    {id: 3, fecha: 3/6/2026, tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 155},
    {id: 4, fecha: 4/6/2026, tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 158},
    {id: 5, fecha: 5/6/2026, tipo: "correr", duracion: 40, distancia: 4500, sensaciones: "Buenas", pulsaciones: 160},
    {id: 6, fecha: 6/6/2026, tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 145},
    {id: 7, fecha: 7/6/2026, tipo: "correr", duracion: 60, distancia: 5000, sensaciones: "Buenas", pulsaciones: 170},
    {id: 8, fecha: 8/6/2026, tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 169}
];

console.log(`${NOMBRE_APP}: ${entrenamientos.length} entrenamientos cargados`);
console.table(entrenamientos);

const TIEMPO_CORTO = 60;
const INTENSO = 160;

console.log("--- Todos los entrenamientos ---");
for(const entrenamiento of entrenamientos) {

    const etiqueta = entrenamiento.duracion <= TIEMPO_CORTO
    ? "corto" : "largo";
    console.log(`${entrenamiento.id}. ${entrenamiento.tipo}. ${etiqueta}`);
}


console.log("--- Cortos e intensos ---");
let encontrados = 0;
for(let i = 0; i < entrenamientos.length; i++) {

    const entrenamiento = entrenamientos[i];
    if(entrenamiento.duracion <= TIEMPO_CORTO && entrenamiento.pulsaciones >= INTENSO) {
        console.log(`${entrenamiento.id}. ${entrenamiento.duracion}minutos ${entrenamiento.pulsaciones} pulsaciones`);
        encontrados++;
    }
}

console.log(`${encontrados} de ${entrenamientos.length} entrenamientos`);