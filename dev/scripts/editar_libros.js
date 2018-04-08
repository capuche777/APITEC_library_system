libros =  JSON.parse(localStorage.getItem('libros'));
autores = JSON.parse(localStorage.getItem('autores'));
temas = JSON.parse(localStorage.getItem('temas'));
libro_edit = JSON.parse(localStorage.getItem('libro_edit'));

let seleccionadoAutor = undefined;
let seleccionadoTema =  undefined;

const slcAutor = document.querySelector('#slc_libro_autor');
const slcTema = document.querySelector('#slc_libro_tema');

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

document.querySelector('#txt_libro_titulo').value = libros[libro_edit].titulo;
seleccionadoAutor = document.querySelector('#slc_libro_autor').value = libros[libro_edit].autor_id;
seleccionadoTema = document.querySelector('#slc_libro_tema').value = libros[libro_edit].tema_id;
document.querySelector('#txt_libro_existencia').value = libros[libro_edit].disponibles;
document.querySelector('#txt_libro_ubicacion').value = libros[libro_edit].ubicacion;
document.querySelector('#txt_libro_fecha').value =  libros[libro_edit].fecha_ingreso;

slcAutor.addEventListener('change', function(){
    seleccionadoAutor = this.options[slcAutor.selectedIndex].value;
});

slcTema.addEventListener('change', function(){
    seleccionadoTema = this.options[slcTema.selectedIndex].value;
});

const guardar =  document.querySelector('#btn_guardar');

guardar.addEventListener('click', function(){
    var libro = {
        libro_id: libros[libro_edit].libro_id,
        titulo: document.querySelector('#txt_libro_titulo').value,
        autor_id: seleccionadoAutor,
        tema_id: seleccionadoTema,
        ubicacion: document.querySelector('#txt_libro_ubicacion').value,
        disponibles: document.querySelector('#txt_libro_existencia').value,
        fecha_ingreso: libros[libro_edit].fecha_ingreso
    }

    libros[libro_edit] =  libro;
    localStorage.setItem('libros', JSON.stringify(libros));
    window.location.href="/libros.html";
});