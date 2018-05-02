autores = JSON.parse(localStorage.getItem('autores')); // Obtiene el objeto autores
paises = JSON.parse(localStorage.getItem('paises')); // Obtiene el objeto paises
libros = JSON.parse(localStorage.getItem('libros')); // Obtiene el objeto Libros

const tabla = document.querySelector('.tabla'); // Alcanza el div para insertar la tabla

let contenidoTabla = ""; // Almacena los datos que tendra la tabla

let inicio = 0; // Variable que mostrara el inicio de las filas
let final = 0; // Variable que mostrara el final de las filas a mostar
let pivote = 0; // variable que sirve como pivote para las filas

if (localStorage.getItem('Final') && localStorage.getItem('pivote')) {
    mostrarFinal = JSON.parse(localStorage.getItem('Final'));
    pivote = JSON.parse(localStorage.getItem('pivote'));
} else {
    final = 10;
    pivote = 10;
}

for (const a in autores) {

    contenidoTabla += `<tr>`
        contenidoTabla += `<td>${parseInt(a) + 1}</td>`
        contenidoTabla += `<td>${autores[a]['nombre']}</td>`
        contenidoTabla += `<td>${autores[a]['apellido']}</td>`
        let _nacionalidad, _contador = 0;
        for (const n in paises) {
            if (autores[a]['nacionalidad'] == paises[n]['pais_id']) {
                _nacionalidad = paises[n]['nombre'];
            }
        }
        for (const l in libros) {
            if (autores[a]['autor_id'] == libros[l]['autor_id']) {
                _contador++
            }
        }
        contenidoTabla += `<td>${_nacionalidad}</td>`
        contenidoTabla += `<td>${_contador}</td>`
        contenidoTabla += `<td onclick="Ver(${a})">Ver</td>`
    contenidoTabla += `</tr>`
}

tabla.innerHTML = `
    <table border=1>
    <thead>
        <th>#</th>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Nacionalidad</th>
        <th>Libros</th>
        <th>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

const tr =  document.getElementsByTagName('tr');

let Ver = (i) => {
    localStorage.setItem('ver_autor', i);
    window.location.href = 'autores_ver.html';
}

/*const Ocultar_Filas = (inicio, final) => {
    let i = inicio;
    for (const t of tr) {
        if (i > inicio && i < final+1) {
            t.classList.add('ocultar');
        }
        i++;
    }
    console.log(inicio);
    console.log(final);
}
Ocultar_Filas(inicio,final);

const anterior = document.querySelector('#btn_anterior');
const siguiente = document.querySelector('#btn_siguiente');

siguiente.addEventListener('click', () => {
    inicio += pivote;
    final += pivote;
    Ocultar_Filas(inicio,final);
})*/