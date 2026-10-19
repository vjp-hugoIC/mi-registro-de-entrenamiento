const NOMBRE_APP = "Registro de entrenamiento";

const entrenamientos = [
    { id: 1, fecha: "1/6/026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 160 },
    { id: 2, fecha: "2/6/2026", tipo: "correr", duracion: 100, distancia: 3500, sensaciones: "Buenas", pulsaciones: 163 },
    { id: 3, fecha: "3/6/2026", tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 155 },
    { id: 4, fecha: "4/6/2026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 158 },
    { id: 5, fecha: "5/6/2026", tipo: "correr", duracion: 40, distancia: 4500, sensaciones: "Buenas", pulsaciones: 160 },
    { id: 6, fecha: "6/6/2026", tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 145 },
    { id: 7, fecha: "7/6/2026", tipo: "correr", duracion: 60, distancia: 5000, sensaciones: "Buenas", pulsaciones: 170 },
    { id: 8, fecha: "8/6/2026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 169 }
];

console.log(`${NOMBRE_APP}: ${entrenamientos.length} entrenamientos cargados`);
console.table(entrenamientos);

const TIEMPO_CORTO = 60;
const INTENSO = 160;

console.log("--- Todos los entrenamientos ---");
function listarEntrenamientos() {
    for (const entrenamiento of entrenamientos) {
        const etiqueta = entrenamiento.duracion <= TIEMPO_CORTO
            ? "corto" : "largo";

        console.log(`${entrenamiento.id}. ${entrenamiento.tipo}. ${etiqueta}`);
    }
}

listarEntrenamientos();

/*Funcion que muestra los entrenamientos segun sean corton e intensos */
console.log("--- Cortos e intensos ---");
function filtrarEntrenamientos(limiteDuracion, limitePulsaciones) {
    let encontrados = 0;

    for (const entrenamiento of entrenamientos) {
        if (entrenamiento.duracion <= limiteDuracion &&
            entrenamiento.pulsaciones >= limitePulsaciones) {

            console.log(`${entrenamiento.id}. ${entrenamiento.duracion} minutos, ${entrenamiento.pulsaciones} pulsaciones`);
            encontrados++;
        }
    }

    return encontrados;
}

const resultado = filtrarEntrenamientos(60, 160);
console.log(`Se han encontrado ${resultado} entrenamientos`);


/*Funcion que muestra los entrenamientos por categorias */
console.log("--- Entrenamientos por categorías ---");
function contarPorCategoria() {
    let correr = 0;
    let pesas = 0;

    for (const entrenamiento of entrenamientos) {
        switch (entrenamiento.tipo) {
            case "correr":
                correr++;
                break;

            case "pesas":
                pesas++;
                break;
        }
    }

    console.log(`Entrenamientos de correr: ${correr}`);
    console.log(`Entrenamientos de pesas: ${pesas}`);
}

contarPorCategoria();


/* Funcion que muestra un elemento por linea*/
function listar(lista) {
    for (const elemento of lista) {
        console.log(elemento);
    }
}


/*Funcion que muestra  un array por el tipo*/
function buscarPorTexto(lista, texto) {
    let resultado = [];

    for (const elemento of lista) {
        if (elemento.tipo.toLowerCase().includes(texto.toLowerCase())) {
            resultado.push(elemento);
        }
    }

    return resultado;
}


/*Funcion para añadir elementos a la lista */
function anadirEntrenamiento(lista, elemento) {
    let mayorId = 0;

    for (const entrenamiento of lista) {
        if (entrenamiento.id > mayorId) {
            mayorId = entrenamiento.id;
        }
    }

    elemento.id = mayorId + 1;
    lista.push(elemento);

    return elemento.id;
}