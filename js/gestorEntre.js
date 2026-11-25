
import { Entrenamiento } from "./entrenamiento.js";

export class GestorEntrenamientos {
  constructor(entrenamientos) {
    this._entrenamientos = entrenamientos;
  }

  //Devuelve el total de entrenamientos
  get total() {
    return this._entrenamientos.length;
  }

  //Devuelve una copia del array
  listar() {
    let resultado = [];

    for (const elemento of this._entrenamientos) {
      resultado.push(elemento);
    }

    return resultado;
  }

  //Añade un entrenamiento con el siguiente ID
  añadir(entrenamiento) {
    let mayorId = 0;

    for (const entrenamiento of this._entrenamientos) {
      if (entrenamiento.id > mayorId) {
        mayorId = entrenamiento.id;
      }
    }

    entrenamiento.id = mayorId + 1;
    this._entrenamientos.push(entrenamiento);

    return entrenamiento.id;
  }

  //Elimina un entrenamiento por su ID
  eliminar(id) {
    for (let i = 0; i < this._entrenamientos.length; i++) {
      if (this._entrenamientos[i].id === id) {
        this._entrenamientos.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  //Buscar entrenamientos por tipo
  buscar(texto) {
    let resultado = [];

    for (const elemento of this._entrenamientos) {
      if (elemento.tipo.toLowerCase().includes(texto.toLowerCase())) {
        resultado.push(elemento);
      }
    }

    return resultado;
  }

  static desdeDatos(datos) {
    let entrenamientos = [];

    for (const elemento of datos) {
      let entrenamiento = new Entrenamiento(elemento);
      entrenamientos.push(entrenamiento);
    }

    return new GestorEntrenamientos(entrenamientos);
  }

}
