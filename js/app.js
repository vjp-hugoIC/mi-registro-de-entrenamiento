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


/*Funcion que muestra un array por el tipo*/
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


/*Funcion para eliminar un elemento de la lista*/
function eliminarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            lista.splice(i, 1);
            return true;
        }
    }

    return false;
}


/*Funcion para ver el total de kilometros recorridos en los entrenamientos */
function mostrarEstadisticas(lista) {

    if (lista.length === 0) {
        console.log("No hay entrenamientos para calcular estadísticas.");
        return;
    }

    let total = 0;
    let mayor = lista[0];

    for (const entrenamiento of lista) {

        total += entrenamiento.distancia;

        if (entrenamiento.distancia > mayor.distancia) {
            mayor = entrenamiento;
        }
    }

    const media = total / lista.length;

    console.log(`Distancia total: ${total} metros`);
    console.log(`Distancia media: ${media.toFixed(1)} metros`);
    console.log(`Entrenamiento más largo: ID ${mayor.id}, ${mayor.distancia} metros`);
}


/*Funcion para crear la tarjeta de un entrenamiento*/
function crearTarjeta(elemento) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const titulo = document.createElement("h3");
    titulo.textContent = `Entrenamiento: ${elemento.tipo}`;

    const info = document.createElement("p");
    info.textContent = `Fecha: ${elemento.fecha} | Duración: ${elemento.duracion} min | Distancia: ${elemento.distancia} m | Pulsaciones: ${elemento.pulsaciones} lpm`;

    tarjeta.append(titulo, info);

    return tarjeta;
}



/*Funcion para pintar toda la lista en el DOM*/
function pintar(lista) {
    const contenedorListado = document.getElementById("listado");
    contenedorListado.replaceChildren();

    for (const entrenamiento of lista) {
        const tarjeta = crearTarjeta(entrenamiento);
        contenedorListado.append(tarjeta);
    }
}


/*Llamada para pintar la coleccion y actualizar el resumen*/
pintar(entrenamientos);

const resumen = document.getElementById("resumen");
if (resumen) {
    resumen.textContent = `${entrenamientos.length} entrenamientos registrados`;
}