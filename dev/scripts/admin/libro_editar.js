const admin_sesion = localStorage.getItem('admin_sesion'); // Obtiene si el usuario esta logueado

/**
 * Si el usuario no ha iniciado sesion sera enviado a la pantalla
 * de logueo
 */
if (admin_sesion != 1) {
    window.location.href = 'index.html'
}

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

autores.forEach(CargarAutores); // Llamada a la funcion para cargar los autores

/**
 * 
 * @param {*} el se refiere a cada uno de los elementos dentro del array
 * @param {*} i se refiere al indice de cada elemento
 * @param {*} arr se refiere al objeto autores
 * Inserta automaticamente los elementos en los option de temas
 */
function CargarTemas(el, i, arr) {
    const selecTema =  document.querySelector('#slc_libro_tema');
    const optionTema = document.createElement('option');
    const optionContent = document.createTextNode(`${temas[i]['tema']}`);


    optionTema.setAttribute('value', `${temas[i]['tema_id']}`);
    optionTema.appendChild(optionContent);
    selecTema.appendChild(optionTema);
}

temas.forEach(CargarTemas); // Llamada a la funcion Cargar Temas

const titulo = document.querySelector('#txt_libro_titulo'); // Obtiene el objeto titulo del formulario de edicion
const autor = document.querySelector('#slc_libro_autor'); // Obtiene el elemento autor del formulario de edicion
const tema = document.querySelector('#slc_libro_tema'); // Obtiene el elemento tema del formulario de edicion
const existencia = document.querySelector('#txt_libro_existencia'); // Obtiene el elemento existencia del formulario de edicion
const ubicacion = document.querySelector('#txt_libro_ubicacion'); // Obtiene el elemento ubicacion del formulario de edicion
const fecha = document.querySelector('#txt_libro_fecha'); // Obtiene el elemento fecha del formulario de edicion

// Inserta los valores previamente ingresados en cada input del formulario
titulo.value = libros[libro_edit].titulo;
autor.value = libros[libro_edit].autor_id;
const autor_anterior = autor.value; // Creada para almacenar el valor de autor previamente seleccionado, en caso de haber cambio sera utilizado
tema.value = libros[libro_edit].tema_id;
const tema_anterior = tema.value; // Creada para almacenar el valor de tema previamente seleccionado, en caso de haber cambio sera utilizado
existencia.value = libros[libro_edit].disponibles;
ubicacion.value = libros[libro_edit].ubicacion;
fecha.value =  libros[libro_edit].fecha_ingreso;

const guardar =  document.querySelector('#btn_guardar'); // Alcanza el boton guardar

/**
 * Cada vez que se clickea el boton guardar la siguiente funcion se ejecuta
 */
guardar.addEventListener('click', function(){
// Valida que todos los campos esten llenos, en caso que el usuario olvide llenarlos nuevamente
    if (titulo.value != ""
        && autor.value > 0
        && tema.value > 0
        && ubicacion.value != ""
        && existencia.value != ""
        && fecha.value != "") {
            
            let _autor_nuevo = autor.value; // Variable local que contiene el nuevo valor de autor en caso de que sea cambiado
            let _tema_nuevo = tema.value; // Variable local que contiene el nuevo valor de tema en caso de que sea cambiado

// Si se ha realizado un cambio en el formulario, el autor ha cambiado, si esto sucede se ejecuta la siguiente condicion
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

// Si se ha realizado un cambio en el formulario, el tema ha cambiado, si esto sucede se ejecuta la siguiente condicion
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

// Objeto que obtiene los nuevos datos de libro
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