/**
 * Gestiona una coleccion de entrenamientos
 */
import { Entrenamiento } from "./entrenamiento.js";

/**
 * Crea un gestor de entrenamientos
 * @param {Entrenamiento[]} entrenamientos -Lista de entrenamientos.
 */
export class GestorEntrenamientos {
  constructor(entrenamientos) {
    this._entrenamientos = entrenamientos;
  }

  /**
   * Obtiene el numero total de entrenamientos.
   * @returns {number} Numero de entrenamientos.
   */
  get total() {
    return this._entrenamientos.length;
  }

  /**
   * Devuelve todos los entrenamientos.
   * @returns {Entrenamiento[]} Lista de entrenamientos.
   */
  listar() {
    let resultado = [];

    for (const elemento of this._entrenamientos) {
      resultado.push(elemento);
    }

    return resultado;
  }

  /**
   * Añade un entrenamiento a la coleccion
   * @param {Entrenamiento} entrenamiento - Entrenamientos que se añadira
   * @returns {number} Identificador que se le asigna al entrenamiento.
   */
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

  /**
   * Elimina un entrenamiento por su identificador
   * @param {number} id - Identificador del entrenamiento
   * @returns {boolean} True si se elimina y false si no existe
   */
  eliminar(id) {
    for (let i = 0; i < this._entrenamientos.length; i++) {
      if (this._entrenamientos[i].id === id) {
        this._entrenamientos.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * Busca entrenamientos por su tipo
   * @param {String} texto - Texto que buscara
   * @returns {Entrenamiento[]} Entrenamientos que coinciden con el texto
   */
  buscar(texto) {
    let resultado = [];

    for (const elemento of this._entrenamientos) {
      if (elemento.tipo.toLowerCase().includes(texto.toLowerCase())) {
        resultado.push(elemento);
      }
    }

    return resultado;
  }

  /**
   * Crea un estor a partir de los datos recibidos.
   * @param {Object[]} datos - Datos de los entrenamientos.
   * @returns {GestorEntrenamientos} Nuevo gestor.
   */
  static desdeDatos(datos) {
    let entrenamientos = [];

    for (const elemento of datos) {
      let entrenamiento = new Entrenamiento(elemento);
      entrenamientos.push(entrenamiento);
    }

    return new GestorEntrenamientos(entrenamientos);
  }

}
