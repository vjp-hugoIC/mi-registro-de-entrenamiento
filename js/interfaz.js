import { Entrenamiento } from "./entrenamiento.js";
import { NOMBRE_APP, datosEntrenamientos, DIAS_RECIENTES } from "./datos.js";
import { listarEntrenamientos, filtrarEntrenamientos, contarPorCategoria, buscarPorTexto, estadisticas, ordenar, fechaLegible, diasDesde, anadirEntrenamiento } from "./logica.js";

/*Variables de estado */
let textoBuscado = "";
let criterio = "ninguno";


const entrenamientos = [];

for (const datos of datosEntrenamientos) {
    entrenamientos.push(new Entrenamiento(datos));
}

console.log(`${NOMBRE_APP}: ${entrenamientos.length} entrenamientos cargados`);
console.table(entrenamientos);

/*Funcion para crear la tarjeta de un entrenamiento*/
function crearTarjeta(elemento) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    const titulo = document.createElement("h3");
    titulo.textContent = `Entrenamiento: ${elemento.tipo}`;

    const info = document.createElement("p");
    info.textContent = elemento.descripcion();

    const velocidad = document.createElement("p");
    velocidad.textContent = `velocidad media: ${elemento.velocidadMedia().toFixed(1)} k/h`;

    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(elemento.fecha);

    if (diasDesde(elemento.fecha) <= DIAS_RECIENTES) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(titulo, info, fecha, velocidad);

    return tarjeta;
}

/*Funcion para pintar toda la lista en el DOM*/
function pintar(lista) {
    const contenedorListado = document.querySelector("#listado");
    contenedorListado.replaceChildren();

    for (const entrenamiento of lista) {
        const tarjeta = crearTarjeta(entrenamiento);
        contenedorListado.append(tarjeta);
    }
}

/*Funcion para pintar las estadisticas*/
function pintarEstadisticas(lista) {

    const contenedorEstadisticas = document.querySelector("#estadisticas");

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

/*Funcion para pintar el resumen dinamico */
function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");
    if (!resumen) return;

    if (mostrados > 0) {
        resumen.textContent = `Mostrando ${mostrados} de ${entrenamientos.length} entrenamientos`;
    } else {
        resumen.textContent = `No hay entrenamientos que contengan <<${textoBuscado}>>`
    }
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


/*Funcion para guardar una coockie*/
function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 *60 * 60;
    const texto = encodeURIComponent(valor);
    document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

/*Funcion para leer cookie*/
function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave, valor] = parte.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

function elegirOrden(nuevo) {
    criterio = nuevo;
    guardarCookie("orden", criterio, 30);
    actualizar();
}

/*Evento input del buscador */
const inputBuscador = document.querySelector("#buscador");
inputBuscador.addEventListener("input", (e) =>{
    textoBuscado = e.target.value;
    actualizar();
})

document.querySelector("#ordenNombre").addEventListener("click", () => elegirOrden("tipo"));
document.querySelector("#ordenTiempo").addEventListener("click", () => elegirOrden("distancia"));
document.querySelector("#ordenFecha").addEventListener("click", () => elegirOrden("fecha"));

/* Configura el evento submit del formulario para añadir entrenamientos */
function configurarFormulario() {
    const formAñadir = document.querySelector("#añadir");

    formAñadir.addEventListener("submit", (e) => { e.preventDefault();

        const codigo = document.querySelector("#codigo").value.trim();
        const spanError = document.querySelector("#errorCodigo");
        const patronCodigo = /^(?:[1-9]\d{0,3})$/;

        if (!patronCodigo.test(codigo)) {
            spanError.textContent = "El código tiene que ser un número del 1 al 9999.";
            return;
        }

        spanError.textContent = "";

        const duracion = Number(document.querySelector("#duracion").value);
        if (Number.isNaN(duracion) || duracion <= 0) {
            return;
        }

        const nuevo = new Entrenamiento({
            id: Number(codigo),
            tipo: document.querySelector("#tipo").value.trim().toLowerCase(),
            fecha: document.querySelector("#fecha").value,
            duracion: duracion,
            distancia: Number(document.querySelector("#distancia").value) || 0,
            sensaciones: "Buenas",
            pulsaciones: Number(document.querySelector("#pulsaciones").value) || 0
        });

        anadirEntrenamiento(entrenamientos, nuevo);
        pintarEstadisticas(entrenamientos);
        actualizar();
        formAñadir.reset();
    });
}

/*Llamo a las funciones */
console.log("Todos los entrenamientos");
listarEntrenamientos(entrenamientos);

console.log("Cortos e intensos");
const resultado = filtrarEntrenamientos(entrenamientos, 60, 160);
console.log(`Se han encontrado ${resultado} entrenamientos`);

console.log("Entrenamientos por categorías");
contarPorCategoria(entrenamientos);

criterio = leerCookie("orden") ?? "ninguno";
configurarFormulario();
pintarEstadisticas(entrenamientos);
actualizar();