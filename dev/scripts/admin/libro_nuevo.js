autores = JSON.parse(localStorage.getItem('autores'));
temas = JSON.parse(localStorage.getItem('temas'));

let libros;
let librosID = 1;

if (localStorage.getItem('libros')) {
    libros = JSON.parse(localStorage.getItem('libros'));
    IncrementarLibroID();
} else {
    libros = [];
}

let seleccionadoAutor;
let seleccionadoTema;

function CargarAutores(el, i, arr) {
    const selectAutor = document.querySelector('#slc_libro_autor');
    const optionAutor = document.createElement('option');
    const optionContent = document.createTextNode(`${autores[i]['nombre']} ${autores[i]['apellido']}`);

    optionAutor.setAttribute('value', `${autores[i]['autor_id']}`);
    optionAutor.appendChild(optionContent);
    selectAutor.appendChild(optionAutor);
}

autores.forEach(CargarAutores);

function CargarTemas(el, i, arr) {
    const selecTema =  document.querySelector('#slc_libro_tema');
    const optionTema = document.createElement('option');
    const optionContent = document.createTextNode(`${temas[i]['tema']}`);


    optionTema.setAttribute('value', `${temas[i]['tema_id']}`);
    optionTema.appendChild(optionContent);
    selecTema.appendChild(optionTema);
}

temas.forEach(CargarTemas);

const d = new Date();
const m = new Date();
const y = new Date();

const day = d.getDate();
const month = m.getMonth();
const year = y.getFullYear();

const dateToday = `${day}/${month+1}/${year}`;

const slcAutor = document.querySelector('#slc_libro_autor');
const slcTema = document.querySelector('#slc_libro_tema');
const fecha = document.querySelector('#txt_libro_fecha').value = dateToday;

const regresar = document.querySelector('#btn_regresar');
const aceptar = document.querySelector('#btn_aceptar');

slcAutor.addEventListener('change', function(){
    seleccionadoAutor = this.options[slcAutor.selectedIndex].value;
});

slcTema.addEventListener('change', function(){
    seleccionadoTema = this.options[slcTema.selectedIndex].value;
});

aceptar.addEventListener('click', function(){
    var libro = {
        libro_id: librosID,
        titulo: document.querySelector('#txt_libro_titulo').value,
        autor_id: parseInt(seleccionadoAutor),
        tema_id: parseInt(seleccionadoTema),
        ubicacion: document.querySelector('#txt_libro_ubicacion').value,
        disponibles: parseInt(document.querySelector('#txt_libro_existencia').value),
        fecha_ingreso: fecha
    }
    libros.push(libro);
    localStorage.setItem('libros', JSON.stringify(libros));
    IncrementarLibroID();
    LimpiarNuevoLibro();
});

function IncrementarLibroID() {
    if (libros.length > 0) {
        librosID = libros[libros.length-1].libro_id+1
    } else {
        librosID = 1;
    }
}

function LimpiarNuevoLibro() {
    document.querySelector('#txt_libro_titulo').value = "";
    slcAutor.value = "0";
    slcTema.value = "0";
    document.querySelector('#txt_libro_existencia').value = "";
    document.querySelector('#txt_libro_ubicacion').value = "";
}