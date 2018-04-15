let libros = JSON.parse(localStorage.getItem('libros'));
let autores = JSON.parse(localStorage.getItem('autores'));
let temas = JSON.parse(localStorage.getItem('temas'));
let libro = JSON.parse(localStorage.getItem('libro_prestar'));

document.querySelector('.titulo').innerHTML = libros[libro].titulo;

let autor_nombre;
let autor_apellido;
let tema;
for (const l in libros) {
    for (const a in autores) {
        if (libros[l]['autor_id'] == autores[a]['autor_id']) {
            autor_nombre = autores[a]['nombre'];
            autor_apellido = autores[a]['apellido'];
        }
    }
    for (const t in temas) {
        if (libros[l]['tema_id'] == temas[t]['tema_id']) {
            tema = temas[t]['tema'];
        }
    }
}
document.querySelector('.autor').innerHTML = `${autor_nombre} ${autor_apellido}`;
document.querySelector('.tema').innerHTML = tema;
document.querySelector('.ubicacion').innerHTML = libros[libro]['ubicacion'];
document.querySelector('.disponible').innerHTML = libros[libro]['disponibles'];

const d = new Date();
const m = new Date();
const y = new Date ();

const day = d.getDay();
const month = m.getMonth()+1;
const year = y.getFullYear();

document.querySelector('.fecha_prestamo').innerHTML = `${day}/${month}/${year}`;
document.querySelector('.fecha_devolucion').innerHTML = `${day+8}/${month}/${year}`;