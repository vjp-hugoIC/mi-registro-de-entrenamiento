import { datosEntrenamientos } from "./datos";
import { Entrenamientos } from "./entrenamientos";

const entrenamientos = [];

for (const datos of datosEntrenamientos) {
    entrenamientos.push(new Entrenamiento(datos));
}

/*Funcion para crear la tarjeta de un entrenamiento*/
export function crearTarjeta(elemento) {
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
export function pintar(lista) {
    const contenedorListado = document.getElementById("listado");
    contenedorListado.replaceChildren();

    for (const entrenamiento of lista) {
        const tarjeta = crearTarjeta(entrenamiento);
        contenedorListado.append(tarjeta);
    }
}

/*Funcion para pintar las estadisticas*/
export function pintarEstadisticas(lista) {

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

/*Funcion que filtra. ordena y pinta */
export function actualizar() {
    //Filtramos por texto usando la funcion buscarPorTexto
    let resultado = buscarPorTexto(entrenamientos, textoBuscado);

    //Ordenamos el resultado segun el criterio actual
    resultado = ordenar(resultado, criterio);

    //Pintamos el resultado
    pintar(resultado);

    //Actualizamos el resumen con el numero de elementos mostrados
    pintarResumen(resultado.length)
}

/*Funcion para pintar el resumen dinamico */
export function pintarResumen(mostrados) {
    const resumen = document.getElementById("resumen");
    if (!resumen) return;

    if (mostrados > 0) {
        resumen.textContent = `Mostrando ${mostrados} de ${entrenamientos.length} entrenamientos`;
    } else {
        resumen.textContent = `No hay entrenamientos que contengan <<${textoBuscado}>>`
    }
}

/*Funcion para guardar una coockie*/
export function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 *60 * 60;
    const texto = encodeURIComponent(valor);
    document.cookie = `${nombre}=${texto}; max-age=${segundos} path=/`;
}

/*Funcion para leer cookie*/
export function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave, valor] = parte.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

/*Evento input del buscador */
export const inputBuscador = document.getElementById("buscador");
inputBuscador.addEventListener("input", (e) =>{
    textoBuscado = e.target.value;
    actualizar();
})