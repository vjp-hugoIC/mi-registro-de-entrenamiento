¿QUÉ HACE LA APLICACIÓN?
La aplicacion registrara todos los entrenamientos que hagas, el entrenamiento que sea, la fecha, la duracion, la distancia, el tipo, las sensaciones y las pulsaciones medias.
Primero creo una constante con el nombre de la app, ese valor no cambia, luego creo el array de objetos que son las diferentes sesiones (he creado 8 objetos) y por ultimo muestro la informacion del array por consola en forma de tabla

DATOS DE CADA ELEMENTO
{ id: 1, fecha: "1/6/026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 160 },
    { id: 2, fecha: "2/6/2026", tipo: "correr", duracion: 100, distancia: 3500, sensaciones: "Buenas", pulsaciones: 163 },
    { id: 3, fecha: "3/6/2026", tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 155 },
    { id: 4, fecha: "4/6/2026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 158 },
    { id: 5, fecha: "5/6/2026", tipo: "correr", duracion: 40, distancia: 4500, sensaciones: "Buenas", pulsaciones: 160 },
    { id: 6, fecha: "6/6/2026", tipo: "pesas", duracion: 120, distancia: 0, sensaciones: "Buenas", pulsaciones: 145 },
    { id: 7, fecha: "7/6/2026", tipo: "correr", duracion: 60, distancia: 5000, sensaciones: "Buenas", pulsaciones: 170 },
    { id: 8, fecha: "8/6/2026", tipo: "correr", duracion: 30, distancia: 4000, sensaciones: "Buenas", pulsaciones: 169 }


¿QUÉ SE HA HECHO EN EL SPRINT 0?
He creado la estructura del proyecto y el repositorio, he creado los entrenamientos, luego una funcion para listar todos los elementos, una funcion que filtra por condicion compuesta que devuelva cuantos ha encontrado con ese filtro, un switch que cuente los entrenamientos por categorías, una funcion que busca un tipo de entrenamiento y los muestra añadiendolos a un array, una funcion para añadir entrenamientos sumando 1 al ultimo id que hubiese, otra para eliminarlos y que si lo elimina devuelva true sino false y una funcion que devuelva estadisticas de los entrenamientos del total de metros recorridos, la media de metro con 1 decimal, el entrenamiento con el mayor numero de metros y si le pasamos una lista vacía devuelva un aviso.