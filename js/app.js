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
function estadisticas(lista) {

    if (lista.length === 0) {
        return null;
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

    return {
        total: total, media: media, maximo: mayor.distancia
    };
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


/*Funcion para pintar las estadisticas*/
function pintarEstadisticas(lista) {

    const contenedorEstadisticas = document.getElementById("estadisticas");

    if (!contenedorEstadisticas) {
        console.error("No se encontró el elemento con id 'estadisticas' en el HTML");
        return;
    }
    
    const resultado = estadisticas(lista);

    if (resultado === null) {

        contenedorEstadisticas.textContent = "No hay entrenamientos disponibles";
        return
    }

    contenedorEstadisticas.textContent = `Distancia total: ${resultado.total}m | Distancia media: ${resultado.media.toFixed(2)}m Distancia máxima: ${resultado.maximo}m`;
}


/*Llamo a la funcion de pintar las estadisticas*/
pintarEstadisticas(entrenamientos);


/*Variables de estado */
let textoBuscado = "";
let criterio = "ninguno";

/*Funcion para ordenar una copia de la lista segun el criterio */
function ordenar(lista, criterio) {
    const copia = [...lista]

    if (criterio === "tipo") {
        copia.sort((a, b) => a.tipo.localeCompare(b.tipo));
    } else if (criterio === "distancia") {
        copia.sort((a, b) => a.distancia - b.distancia);
    }

    return copia;
}

/*Funcion que filtra. ordena y pinta */
function actualizar() {
    //Filtramos por texto usando la funcion buscarPorTexto
    let resultado = buscarPorTexto(entrenamientos, textoBuscado);

    //Ordenamos el resultado segun el criterio actual
    resultado = ordenar(resultado, criterio);

    //Pintamos el resultado
    pintar(resultado);

    //Actualizamos el resumen con el numero de elementos mostrados
    pintarResumen(resultado.length)
}

/*Llamo a la funcion actualizar */
actualizar(entrenamientos);


/*Evento input del buscador */
const inputBuscador = document.getElementById("buscador");
inputBuscador.addEventListener("input", (e) =>{
    textoBuscado = e.target.value;
    actualizar();
})


/*Evento click de los botones  */
const btnOrdenTipo = document.getElementById("ordenNombre");
btnOrdenTipo.addEventListener("click", () => {
    criterio = "tipo";
    actualizar();
})

const btnOrdenDistancia = document.getElementById("ordenNumero");
btnOrdenDistancia.addEventListener ("click", () => {
    criterio = "distancia";
    actualizar();
})


/*Funcion para pintar el resumen dinamico */
function pintarResumen(mostrados) {
    const resumen = document.getElementById("resumen");
    if (!resumen) return;

    if (mostrados > 0) {
        resumen.textContent = `Mostrando ${mostrados} de ${entrenamientos.length} entrenamientos`;
    } else {
        resumen.textContent = `No hay entrenamientos que contengan <<${textoBuscado}>>`
    }
}