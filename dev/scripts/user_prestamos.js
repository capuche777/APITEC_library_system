
document.querySelector('.pagina').textContent = 'Prestamos'; // Cambia el titulo de la pagina
const logged_user = localStorage.getItem('logged_user');
let prestamos = JSON.parse(localStorage.getItem('prestamos')); // Trae el objeto de prestamos
let libros = JSON.parse(localStorage.getItem('libros')); // Trae el objeto de libros
let temas = JSON.parse(localStorage.getItem('temas')); // Trae el objeto de temas
let autores = JSON.parse(localStorage.getItem('autores')); // Trae el objeto de autores
let usuario_prestamos_activos = [];
let usuario_prestamos_historial = [];
for (const p in prestamos) {
    const usuario_prestamo = {
        prestamo_id: prestamos[p]['prestamo_id'],
        libro_id: prestamos[p]['libro_id'],
        usuario_id: prestamos[p]['usuario_id'],
        fecha_prestamo: prestamos[p]['fecha_prestamo'],
        fecha_devolucion: prestamos[p]['fecha_devolucion'],
        token: prestamos[p]['token'],
        estado: prestamos[p]['estado']
    }
    if (logged_user == prestamos[p]['usuario_id'] && prestamos[p]['estado'] != 3) {
        usuario_prestamos_activos.push(usuario_prestamo)
    } else if (logged_user == prestamos[p]['usuario_id'] && prestamos[p]['estado'] == 3) {
        usuario_prestamos_historial.push(usuario_prestamo)
    }
}

const tablaPrestamos = document.querySelector('.tabla-prestamos'); // Selecciona la tabla para imprimir los prestamos disponibles
const tablaHistorial = document.querySelector('.tabla-historial'); // Selecciona la tabla para imprimir el historial de prestamos

let inicio;
let final;
let pivote;

// Variables para almacenar el contenido dinamico de prstamos e historial
let contenidoPrestamos = '';
let contenidoHistorial = '';

inicio = 1;
final = 10;
pivote = 10;

for (const p in usuario_prestamos_activos) {

    if (usuario_prestamos_activos[p]['estado'] != 3) {
        contenidoPrestamos += '<tr>'
        contenidoPrestamos += `<td><span class="ip">${parseInt(p)+1}</span></td>`
        contenidoPrestamos += `<td>${usuario_prestamos_activos[p]['token']}</td>`
        let _libro;
        let _autor_nombre, _autor_apellido;
        let _tema;
        for (const l in libros) {
            if (usuario_prestamos_activos[p]['libro_id'] == libros[l]['libro_id']) {
                _libro = libros[l]['titulo'];
            }
            for (const a in autores) {
                if (libros[l]['autor_id'] == autores[a]['autor_id']) {
                    _autor_nombre = autores[a]['nombre'];
                    _autor_apellido = autores[a]['apellido'];
                }
            }
            for (const t in temas) {
                if (libros[l]['tema_id'] == temas[t]['tema_id']) {
                    _tema = temas[t]['tema'];
                }
            }
        }
        contenidoPrestamos += `<td>${_libro}</td>`
        contenidoPrestamos += `<td>${_autor_nombre} ${_autor_apellido}</td>`
        contenidoPrestamos += `<td>${_tema}</td>`
        contenidoPrestamos += `<td>${usuario_prestamos_activos[p]['fecha_prestamo']}</td>`
        contenidoPrestamos += `<td>${usuario_prestamos_activos[p]['fecha_devolucion']}</td>`
        let _estado = usuario_prestamos_activos[p]['estado'];
        (() => {
            switch (_estado) {
                case 1:
                    _estado = `<td style="color:#08088A">Prestado</td>`;
                    break;
                case 2:
                    _estado = `<td style="color:#FF0000">Mora</td>`;
                    break;
                case 3:
                    _estado = `<td style="color:#088A08">Devuelto</td>`;
            }
        })();
        contenidoPrestamos += _estado;
    contenidoPrestamos += '</tr>'
}
    tablaPrestamos.innerHTML = `
    <table border=1>
        <thead>
            <th>#</th>
            <th>Código</th>
            <th>Libro</th>
            <th>Autor</th>
            <th>Tema</th>
            <th>Prestamo</th>
            <th>Devolución</th>
            <th>Estado</th>
        </thead>
        <tbody>
            ${contenidoPrestamos}
        </tbody>
        </table>
    `;
}

for (const h in usuario_prestamos_historial) {
    contenidoHistorial += '<tr>'
        contenidoHistorial += `<td><span class="ih">${parseInt(h)+1}</span></td>`
        contenidoHistorial += `<td>${usuario_prestamos_historial[h]['token']}</td>`
        let _libro;
        let _autor_nombre, _autor_apellido;
        let _tema;
        for (const l in libros) {
            if (usuario_prestamos_historial[h]['libro_id'] == libros[l]['libro_id']) {
                _libro = libros[l]['titulo'];
            }
            for (const a in autores) {
                if (libros[l]['autor_id'] == autores[a]['autor_id']) {
                    _autor_nombre = autores[a]['nombre'];
                    _autor_apellido = autores[a]['apellido'];
                }
            }
            for (const t in temas) {
                if (libros[l]['tema_id'] == temas[t]['tema_id']) {
                    _tema = temas[t]['tema'];
                }
            }
        }
        contenidoHistorial += `<td>${_libro}</td>`
        contenidoHistorial += `<td>${_autor_nombre} ${_autor_apellido}</td>`
        contenidoHistorial += `<td>${_tema}</td>`
        contenidoHistorial += `<td>${usuario_prestamos_historial[h]['fecha_prestamo']}</td>`
        contenidoHistorial += `<td>${usuario_prestamos_historial[h]['fecha_devolucion']}</td>`
        let _estado = usuario_prestamos_historial[h]['estado'];
        (() => {
            switch (_estado) {
                case 1:
                    _estado = `<td style="color:#08088A">Prestado</td>`;
                    break;
                case 2:
                    _estado = `<td style="color:#FF0000">Mora</td>`;
                    break;
                case 3:
                    _estado = `<td style="color:#088A08">Devuelto</td>`;
            }
        })();
        contenidoHistorial += _estado;
    contenidoHistorial += '</tr>'
    tablaHistorial.innerHTML = `
    <table border=1>
        <thead>
            <th>#</th>
            <th>Código</th>
            <th>Libro</th>
            <th>Autor</th>
            <th>Tema</th>
            <th>Prestamo</th>
            <th>Devolución</th>
            <th>Estado</th>
        </thead>
        <tbody>
            ${contenidoHistorial}
        </tbody>
        </table>
    `;
}


// Actualmente los indices se imprimen de forma incorrecta, con las siguientes variables llego a alcanzar el hijo que deseo ordenar
var tablas = document.getElementsByTagName('TABLE');
var tr= tablas[0].rows