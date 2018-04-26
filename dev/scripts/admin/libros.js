/*let libros = JSON.parse(localStorage.getItem('libros'));
let autores = JSON.parse(localStorage.getItem('autores'));
let temas = JSON.parse(localStorage.getItem('temas'));*/

const tabla = document.querySelector('.tabla');

let contenidoTabla = "";

for (var l in libros) {
    contenidoTabla += "<tr>"
        contenidoTabla += `<td>${parseInt(l)+1}</td>`
        contenidoTabla += `<td>${libros[l].titulo}</td>`
        let _autor;
        let _apellido;
        for (const a in autores) {
            if (libros[l].autor_id == autores[a].autor_id) {
                _autor = autores[a]['nombre'];
                _apellido = autores[a]['apellido'];
            }
        }
        contenidoTabla += `<td>${_autor} ${_apellido}</td>`
        let _tema;
        for (const t in temas) {
            if (libros[l]['tema_id'] == [temas[t]['tema_id']]) {
                _tema = temas[t]['tema'];
            }
        }
        contenidoTabla += `<td>${_tema}</td>`
        contenidoTabla += `<td>${libros[l].ubicacion}</td>`
        contenidoTabla += `<td>${libros[l].disponibles}</td>`
        contenidoTabla += `<td onclick="Editar(${l})">Editar</td>`
        contenidoTabla += `<td onclick="Eliminar(${l})">Eliminar</td>`
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
        <th colspan=2>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

// aqui van las funciones botonera