const admin_sesion = localStorage.getItem('admin_sesion'); // Obtiene si el usuario esta logueado

/**
 * Si el usuario no ha iniciado sesion sera enviado a la pantalla
 * de logueo
 */
if (admin_sesion != 1) {
    window.location.href = 'index.html'
}

let libros = JSON.parse(localStorage.getItem('libros'));
let autores = JSON.parse(localStorage.getItem('autores'));
let temas = JSON.parse(localStorage.getItem('temas'));

const tabla = document.querySelector('.tabla');

let contenidoTabla = "";

/**
 * mostrarInicio indica cual es el primer elemento a mostrar en la informacion
 * mostrarFinal indica el ultmio elemento a mostrar visualmente en la tabla
 * pivote, utilizado para establecer un limite entre el inicio y el final de la informacion
 * ya que este camiara si el usuario asi lo desea
 **/
let mostrarInicio = 0;
let mostrarFinal = 0
let pivote = 0;

/**
 * Debido a que la funcion mostar funciona con el local storage, si los datos estan almacenados
 * en el local serán obtenidos primero y si no, mostraran los datos por default de 10
 */

if (localStorage.getItem('mostrarFinal') && localStorage.getItem('pivote')) {
    mostrarFinal = JSON.parse(localStorage.getItem('mostrarFinal'));
    pivote = JSON.parse(localStorage.getItem('pivote'));
} else {
    mostrarFinal = 10;
    pivote = 10;
}

/**
 * Al presionar el boton mostrar, se genera nuevamente el documento con el numero de
 * datos solicitados por el usuario, al mismo tiempo se guardadn en localStorage para
 * cambiar las variables por default
 **/
document.querySelector('#btn_show').addEventListener('click', function(){
    mostrarFinal = document.querySelector('#txt_showRows').value;
    pivote = document.querySelector('#txt_showRows').value;

    if (mostrarFinal <= 0 || mostrarFinal > libros.length) {
        document.querySelector('.alert').innerHTML = `Por favor ingrese un número entre 1 y ${libros.length}`
    } else {
        localStorage.setItem('mostrarFinal', mostrarFinal);
        localStorage.setItem('pivote', pivote);

        window.location.reload();   
    }
});

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
    contenidoTabla += `</tr>`
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

// Solo se deben mostrar 10 resultados para el ejemplo
const tr = document.getElementsByTagName('TR');
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
let imprimirInicio = document.querySelector('.inicio');
let imprimirFinal = document.querySelector('.final') ;
let imprimirTotal = document.querySelector('.total');


// por default todos los elementos en la tabla estan ocultos, la siguiente funcion hace que se muestren solo los primeros 10
for (let i = mostrarInicio; i < tr.length; i++) {
    if (i > mostrarFinal) {
        tr[i].classList.add('ocultar');
    }
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${libros.length}`;
    // OcultarBotonera();
}

/**
 * Aqui va la funcion editar
 */

/*
La siguiente funcion oculta el boton anterior si el primer elemento no cuenta con la clase ocultar
y el boton siguiente si el ultimo elemento mostrado si tiene la clase ocultar. Al mismo tiempo actualiza
el valor de los articulos que se muestran en pantalla
*/
/*function OcultarBotonera() {
    for (let i in tr) {
        if (tr[1].getAttribute('class') == '' && tr[tr.length-1].getAttribute('class') == '') {
            anterior.classList.add('ocultar');
            siguiente.classList.add('ocultar');
        } else if (tr[1].getAttribute('class') == '') {
            anterior.classList.add('ocultar');
            siguiente.classList.remove('ocultar');
        } else if (tr[tr.length-1].getAttribute('class') == '') {
            siguiente.classList.add('ocultar');
            anterior.classList.remove('ocultar');
            imprimirFinal.innerHTML = `${libros.length}`;
        }
    }
}*/

/**
 * Inicialmente los botones siguiente y anterior estan ocultos,
 * la siguiente funcion hará que aparezcan automáticamente
 */
(() => {
    if (mostrarFinal < libros.length) {
        siguiente.classList.remove('ocultar');
    }
})();

/**
 * Funcion que actua vada vez que se presiona el boton siguiente
 */
siguiente.addEventListener('click', () => {
    mostrarInicio += pivote;
    mostrarFinal += pivote;
    for (const i in tr) {
        if (i > mostrarInicio && i < mostrarFinal) {
            tr[i].classList.remove('ocultar');
        } else {
            tr[i].classList.add('ocultar');
            tr[0].classList.remove('ocultar');
        }
    }
    
    
    
})