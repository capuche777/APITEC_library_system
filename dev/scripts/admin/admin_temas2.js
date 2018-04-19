temas = JSON.parse(localStorage.getItem('temas')); // Obtener el objeto temas

//const tabla = document.querySelector('.tabla'); // Alcanza el objeto para insertar la tabla
let imprimirTabla = ""; // Crea una variable vacia para almacenar los elementos de la tabla, para luego ser impresos
const tabla = document.querySelector('#temas'); // Encuentra el elemento <table> con el ID 'temas'

let inicioTabla = 0;
let finalTabla = 0;
let pivote = 0;

if (localStorage.getItem('finalTabla') && localStorage.getItem('pivote')) {
    finalTabla = parseInt(localStorage.getItem('finalTabla'));
    pivote = parseInt(localStorage.getItem('pivote'));
} else {
    finalTabla = 10;
    pivote = 10;
}

/**
 * Para determinar cuantas filas y columnas va a utilizar recibe dos parametros
 * i = Inicio
 * f =  Final
 * Ambos parametros serán definidos por inicioTabla y finalTabla
 */
const Crear_Tablas = (i, f) => {
    for (let i = inicioTabla; i < finalTabla; i++) {
        let row = tabla.insertRow(i);
    }
}

Crear_Tablas(inicioTabla, finalTabla);