let libros = JSON.parse(localStorage.getItem('libros')); // Obtener el objeto libros de localStorage
let autores = JSON.parse(localStorage.getItem('autores')); // Obtener el objeto autores de localStorage
let temas = JSON.parse(localStorage.getItem('temas')); // Obtener el objeto temas de localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) // Obtiene el objeto usuarios
let libro = localStorage.getItem('libro_prestar'); // Obtiene el elemento guardado en la pantalla anterior para poder determinar que libro vamos a usar
let logged_user = localStorage.getItem('logged_user'); // obtiene el indice del usuario logueado

let prestamos; // Variable creada para agregar los prestamos
let prestamoID = 0; // Declarada para asignar el ID de los usuarios

if (localStorage.getItem('prestamos')) {
    prestamos = JSON.parse(localStorage.getItem('prestamos'));
    Incrementar_ID();
} else {
    prestamos = [];
    Incrementar_ID();
}

/**
 * Variables declaradas para indicar que vamos a obtener una fecha
 */
const mili = Date.now(); // Obtiene la fecha de hoy en milisegundos
let dia = new Date(mili);
let hoy = dia.toLocaleDateString();
let mili_dev = mili + 691200000;
let dev_dia = new Date(mili_dev);
let back = dev_dia.toLocaleDateString();

hoy = hoy.split('/');
back = back.split('/');

document.querySelector('.titulo').innerHTML = libros[libro].titulo; // Imprime el titulo del libro solicitado en el campo correspondiente

/**
 * 1.- Recorre los libros para determinar el libro que vamos a prestar y obtener los datos necesarios
 * 2.- Recorre los autores y según el autor imprime los datos solicitados del autor que haga match con el libro
 * 3.- Recorre los temas y segun el tema imprime los datos solicitados del tema que haga match con el libro
 */
for (const l in libros) {
    let autor_nombre;
    let autor_apellido;
    for (const a in autores) {
        if (libros[libro]['autor_id'] == autores[a]['autor_id']) {
            autor_nombre = autores[a]['nombre'];
            autor_apellido = autores[a]['apellido'];
        }
    }
    let tema;
    for (const t in temas) {
        if (libros[libro]['tema_id'] == temas[t]['tema_id']) {
            tema = temas[t]['tema'];
        }
    }
    document.querySelector('.autor').innerHTML = `${autor_nombre} ${autor_apellido}`;
    document.querySelector('.tema').innerHTML = tema;
}
document.querySelector('.ubicacion').innerHTML = libros[libro]['ubicacion']; // Imprime la ubicacion del libro en el campo correspondiente
document.querySelector('.disponible').innerHTML = libros[libro]['disponibles']; // Imprime la cantidad de libros disponibles en el campo correspondiente
let fecha_prestamo = document.querySelector('.fecha_prestamo').innerHTML = `${hoy[1]}/${hoy[0]}/${hoy[2]}`; // Imprime la fecha actual como fecha de prestamo para un libro
let fecha_devolucion =document.querySelector('.fecha_devolucion').innerHTML = `${back[1]}/${back[0]}/${back[2]}`; // Imprime la fecha de devolucion del libro basado en la fecha del prestamo

const alfanumero = ['a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9'];

let token = "";

const Generar_Token = () => {
    for (let i = 0; i < 16; i++) {
        token += alfanumero[Math.floor(Math.random() * (alfanumero.length - 0)) + 0];
    };

    prestamos.forEach((el, i) => {
        token == prestamos[i]['token'] ? Generar_Token() : token;
    });
}

Generar_Token();

document.querySelector('#btn_regresar').addEventListener('click', () => {
    history.back();
});

const Restar_Libro = () => {
        libros[libro]['disponibles'] =  parseInt(libros[libro]['disponibles'])-1;
}

const prestar = document.querySelector('#btn_prestar');

prestar.addEventListener('click', () => {

    const prestamo = {
        prestamo_id: prestamoID,
        libro_id: libros[libro]['libro_id'],
        usuario_id: usuarios[logged_user]['usuario_id'],
        fecha_prestamo: `${hoy[1]}/${hoy[0]}/${hoy[2]}`,
        fecha_devolucion: `${back[1]}/${back[0]}/${back[2]}`,
        token: token,
        estado: 1
    }

    Restar_Libro();

    prestamos.push(prestamo);
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
    localStorage.setItem('libros', JSON.stringify(libros));
    Incrementar_ID();
    alert('El libro ha sido añadido al pretamos del usuario')
    history.back();
});

function Incrementar_ID() {
    if (prestamos.length > 0) {
        prestamoID = prestamos[prestamos.length-1].prestamo_id+1;
    } else {
        prestamoID = 1;
    }
}