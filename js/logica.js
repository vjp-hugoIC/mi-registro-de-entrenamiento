/*Funcion que muestra un array por el tipo*/
export function buscarPorTexto(lista, texto) {
    let resultado = [];

    for (const elemento of lista) {
        if (elemento.tipo.toLowerCase().includes(texto.toLowerCase())) {
            resultado.push(elemento);
        }
    }

    return resultado;
}

/*Funcion que muestra los entrenamientos por categorias */
export function contarPorCategoria() {
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

/* Funcion que muestra un elemento por linea*/
export function listar(lista) {
    for (const elemento of lista) {
        console.log(elemento);
    }
}

/*Funcion que muestra un array por el tipo*/
export function buscarPorTexto(lista, texto) {
    let resultado = [];

    for (const elemento of lista) {
        if (elemento.tipo.toLowerCase().includes(texto.toLowerCase())) {
            resultado.push(elemento);
        }
    }

    return resultado;
}

/*Funcion para añadir elementos a la lista */
export function anadirEntrenamiento(lista, elemento) {
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
export function eliminarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            lista.splice(i, 1);
            return true;
        }
    }

    return false;
}

/*Funcion para ver el total de kilometros recorridos en los entrenamientos */
export function estadisticas(lista) {

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

/*Funcion para ordenar una copia de la lista segun el criterio */
export function ordenar(lista, criterio) {
    const copia = [...lista]

    if (criterio === "tipo") {
        copia.sort((a, b) => a.tipo.localeCompare(b.tipo));
    } else if (criterio === "distancia") {
        copia.sort((a, b) => a.distancia - b.distancia);
    } else if (criterio === "fecha") {
        copia.sort((a, b) => crearFecha(a.fecha) - crearFecha(b.fecha));
    }

    return copia;
}

export function elegirOrden(nuevo) {
    criterio = nuevo;
    guardarCookie("orden", criterio, 30);
    actualizar();
}

/*funcion para crear fecha */
export function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

/*Funcion para hacer la hora legible */
export function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES",
        { day: "numeric", month: "long", year: "numeric" });
}

/*Funcion para calcular los dias desde... */
export function diasDesde(texto) {
    const MS_DIAS = 24 * 60 * 60 * 1000;
    const ms = Date.now() - crearFecha(texto).getTime();
    return Math.floor(ms / MS_DIAS);
}