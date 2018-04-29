let libros =  JSON.parse(localStorage.getItem('libros')); // Obtiene el objeto libros
let autores = JSON.parse(localStorage.getItem('autores')); // Obtiene el objeto autores
let temas = JSON.parse(localStorage.getItem('temas')); // Obtiene el objeto temas
const libro_edit = JSON.parse(localStorage.getItem('libro_edit')); // Obtiene el indice del libro a editar

const slcAutor = document.querySelector('#slc_libro_autor'); // Selecciona el objeto select de autores, para luego insertar los options
const slcTema = document.querySelector('#slc_libro_tema'); // Selecciona el objeto select de temas, para luego insertar los options

/**
 * 
 * @param {*} el cada uno de los elementos que contiene el objeto
 * @param {*} i se refiere al indice que ocupa el elemento
 * @param {*} arr se refiere al objeto autores
 * Inserta automaticamente los elementos en los option de autores
 */
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

const titulo = document.querySelector('#txt_libro_titulo');
const autor = document.querySelector('#slc_libro_autor');
const tema = document.querySelector('#slc_libro_tema');
const existencia = document.querySelector('#txt_libro_existencia');
const ubicacion = document.querySelector('#txt_libro_ubicacion');
const fecha = document.querySelector('#txt_libro_fecha');

titulo.value = libros[libro_edit].titulo;
autor.value = libros[libro_edit].autor_id;
const autor_anterior = autor.value;
tema.value = libros[libro_edit].tema_id;
const tema_anterior = tema.value;
existencia.value = libros[libro_edit].disponibles;
ubicacion.value = libros[libro_edit].ubicacion;
fecha.value =  libros[libro_edit].fecha_ingreso;

const guardar =  document.querySelector('#btn_guardar');



guardar.addEventListener('click', function(){
    if (titulo.value != ""
        && autor.value > 0
        && tema.value > 0
        && ubicacion.value != ""
        && existencia.value != ""
        && fecha.value != "") {
            
            let _autor_nuevo = autor.value;
            let _tema_nuevo = tema.value;
    
            if (autor_anterior != _autor_nuevo) {
                for (const autor in autores) {
                    let n = parseInt(autores[autor].total_libros);
                    if (autores[autor]['autor_id'] == autor_anterior) {
                        autores[autor]['total_libros'] = n-1;
                    }
                    if (autores[autor]['autor_id'] == _autor_nuevo) {
                        autores[autor]['total_libros'] = n+1;
                    }
                }
            }

            if (tema_anterior != _tema_nuevo) {
                for (const tema in temas) {
                    let n = parseInt(temas[tema].total_libros);
                    if (temas[tema]['tema_id'] == tema_anterior) {
                        temas[tema]['total_libros'] = n-1;
                    }
                    if (temas[tema]['tema_id'] == _tema_nuevo) {
                        temas[tema]['total_libros'] = n+1;
                    }
                }
            }

            var libro = {
                libro_id: libros[libro_edit].libro_id,
                titulo: titulo.value,
                autor_id: autor.value,
                tema_id: tema.value,
                ubicacion: ubicacion.value,
                disponibles: existencia.value,
                fecha_ingreso: libros[libro_edit].fecha_ingreso
            }
            
            libros[libro_edit] =  libro;
            localStorage.setItem('libros', JSON.stringify(libros));
            localStorage.setItem('autores', JSON.stringify(autores));
            localStorage.setItem('temas', JSON.stringify(temas));
            window.location.href="./libros.html";
    } else {
        alert('Debe llenar todos los campos');
    }
});

/**
 * Validar el guardado
 */

