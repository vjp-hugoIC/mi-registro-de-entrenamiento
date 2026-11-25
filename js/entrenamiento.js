/**
 * Representa un entrenamiento
 */

export class Entrenamiento {

    /**
     * Crea un nuevo entrenamiento
     * @param {Object} datos - Datos del entrenamiento 
     */
    constructor(datos) {
        this.id = datos.id;
        this.fecha = datos.fecha;
        this.tipo = datos.tipo;
        this.duracion = datos.duracion;
        this.distancia = datos.distancia;
        this.sensaciones = datos.sensaciones;
        this.pulsaciones = datos.pulsaciones;
    }

    /**
     * Obtiene la duracion del entrenamiento
     * @returns {number} Duracion en minutos
     */
    get duracion() {
        return this._duracion;
    }

    /**
     * Establece la duracion del entrenamiento
     * @param {number} minutos - duracion en minutos.
     * @throws {Error} Si la duracion no es un numero positivo.
     */
    set duracion(minutos) {
        if (typeof minutos !== "number" || minutos <= 0) {
            throw new Error("La duracion debe ser un número mayor que 0");
        }

        this._duracion = minutos;
    }


    /**
     * Obtiene la duracion en formato de horas y minutos.
     * @returns {string} Duracion en formato legible.
     */
    get duracionTexto() {
        const horas = Math.floor(this._duracion / 60);
        const minutos = this._duracion % 60;

        if (horas > 0) {
            return `${horas} h ${minutos} min`;
        }

        return `${minutos} min`;
    }

    descripcion() {
        return `Fecha: ${this.fecha} | Duración: ${this.duracionTexto} min | Distancia: ${this.distancia} m | Pulsaciones: ${this.pulsaciones} lpm`;
    }

    /**
     * Calcula la velocidad media del entrenamiento
     * @returns {number} Velocidad media en kilometros por hora.
     */
    velocidadMedia() {
        const kilometros = this.distancia / 1000;
        const horas = this.duracion / 60;

        return kilometros / horas;
    }
}