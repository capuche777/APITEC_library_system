const temas = JSON.parse(localStorage.getItem('temas')); // Obtiene los temas del localStorage
const tabla = document.querySelector('.tabla'); // Alcanza el elemento tabla para ser insertado despues

let contenidoTabla = ""; // Concatena los elementos a imprimir en la tabla

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

for (const t in temas) {
    contenidoTabla += `<tr>`
        contenidoTabla += `<td>${parseInt(t)+1}</td>`
        contenidoTabla += `<td>${temas[t]['tema']}</td>`
        contenidoTabla += `<td onclick="Ver(${t})">ver</td>`
    contenidoTabla += `</tr>`
}

tabla.innerHTML = `
    <table border=1>
    <thead>
        <th>#</th>
        <th>Tema</th>
        <th>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

const tr = document.getElementsByTagName('tr');

let Ver = (i) => {
    localStorage.setItem('ver_tema', i);
    window.location.href = 'temas_ver.html';
}

document.querySelector('.p_buscar').innerText = 'Buscar Tema';

let select = document.querySelector('#slc_buscar');
select.value = 1;
select.classList.add('ocultar');