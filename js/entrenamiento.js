export class Entrenamiento {

    constructor(datos) {
        this.id = datos.id;
        this.fecha = datos.fecha;
        this.tipo = datos.tipo;
        this.duracion = datos.duracion;
        this.distancia = datos.distancia;
        this.sensaciones = datos.sensaciones;
        this.pulsaciones = datos.pulsaciones;
    }

    //Getter de duracion
    get duracion() {
        return this._duracion;
    }

    //Setters de duracion
    set duracion(minutos) {
        if (typeof minutos !== "number" || minutos <= 0) {
            throw new Error("La duracion debe ser un número mayor que 0");
        }

        this._duracion = minutos;
    }


    //Getter para mostrar la duracion en horas y minutos
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

    velocidadMedia() {
        const kilometros = this.distancia / 1000;
        const horas = this.duracion / 60;

        return kilometros / horas;
    }
}