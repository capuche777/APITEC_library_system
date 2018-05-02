const n = localStorage.getItem('ver_autor');
const temas = JSON.parse(localStorage.getItem('temas'));
const libros = JSON.parse(localStorage.getItem('libros'));
const autores = JSON.parse(localStorage.getItem('autores'));

let libros_ver = [];
(() => {
    for (const l in libros) {
        if (autores[n]['autor_id'] == libros[l]['autor_id']) {
            libros_ver.push(libros[l]);
        }
    }
})();

const titulo_tema = document.querySelector('.titulo-tema');
titulo_tema.innerText = `${autores[n]['nombre']} ${autores[n]['apellido']}`;
const tabla = document.querySelector('.tabla');

let contenidoTabla = "";

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



for (const v in libros) {
    if (libros[v]['autor_id'] == autores[n]['autor_id']) {
        contenidoTabla += `<tr>`
            contenidoTabla += `<td><span class="indice"><span></td>`
            contenidoTabla += `<td>${libros[v]['titulo']}</td>`
            contenidoTabla += `<td>${autores[n]['nombre']} ${autores[n]['apellido']}</td>`
            let _tema;
            for (const t in temas) {
                if (libros[v]['tema_id'] == temas[t]['tema_id']) {
                    _tema = temas[t]['tema'];
                }
            }
            contenidoTabla += `<td>${_tema}</td>`
            contenidoTabla += `<td>${libros[v]['ubicacion']}</td>`
            contenidoTabla += `<td>${libros[v]['disponibles']}</td>`
            let _operacion;
            if (libros[v]['disponibles'] == 0) {
                _operacion = 'No disponible'
            } else {
                _operacion = 'Prestar'
            }
            contenidoTabla += `<td onclick="Prestar(${v})">${_operacion}</td>`
        contenidoTabla += `</tr>`
    }
}

tabla.innerHTML = `
    <table border=1>
    <thead>
        <th>#</th>
        <th>Libro</th>
        <th>Autor</th>
        <th>Tema</th>
        <th>Ubicacion</th>
        <th>Disp.</th>
        <th>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

const indice = document.querySelectorAll('.indice');
const tr = document.getElementsByTagName('tr');

for (const i in indice) {
    indice[i].innerText = parseInt(i)+1;
}

const Prestar = (i) => {
        localStorage.setItem('libro_prestar', i);
        window.location.href = 'prestar.html';
}