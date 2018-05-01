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

/**
 * i = libros
 * a = autores
 * t = temas
 */
for (const i in libros) {
    contenidoTabla += "<tr>"
        contenidoTabla += `<td>${parseInt(i)+1}</td>`
        contenidoTabla += `<td>${libros[i].titulo}</td>`
        let _autor;
        let _apellido;
        for (const a in autores) {
            if (libros[i].autor_id == autores[a].autor_id) {
                _autor = autores[a].nombre;
                _apellido = autores[a].apellido;
            }
        }
        contenidoTabla += `<td>${_autor} ${_apellido}</td>`
        let _tema;
        for (const t in temas) {
            if (libros[i].tema_id == temas[t].tema_id) {
                _tema = temas[t].tema;
            }
        }
        contenidoTabla += `<td>${_tema}</td>`
        contenidoTabla += `<td>${libros[i].ubicacion}</td>`
        contenidoTabla += `<td>${libros[i].disponibles}</td>`
        contenidoTabla += `<td onclick="Libro_Prestar(${i})"><span id="operacion">Prestar</span></td>`
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
        <th>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

// Solo se deben mostrar 10 resultados para el ejemplo
const tr = document.getElementsByTagName('TR');
const anterior = document.querySelector('#btn_anterior');
const siguiente = document.querySelector('#btn_siguiente');
let imprimirInicio = document.querySelector('.inicio');
let imprimirFinal = document.querySelector('.final') ;
let imprimirTotal = document.querySelector('.total');


// por default todos los elementos en la tabla estan ocultos, la siguiente funcion hace que se muestren solo los primeros 10
    for (let i = mostrarInicio; i < tr.length; i++) {
        if (i <= mostrarFinal) {
            tr[i].classList.remove('ocultar');
        }
        imprimirInicio.innerHTML = `${mostrarInicio+1}`;
        imprimirFinal.innerHTML = `${mostrarFinal}`;
        imprimirTotal.innerHTML = `${libros.length}`;
        OcultarBotonera();
    }

/*
La siguiente funcion oculta el boton anterior si el primer elemento no cuenta con la clase ocultar
y el boton siguiente si el ultimo elemento mostrado si tiene la clase ocultar. Al mismo tiempo actualiza
el valor de los articulos que se muestran en pantalla
*/
function OcultarBotonera() {
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
}


/*
funcion que muestra los elementos en pantalla al presionar el boton anterior
segun las variables, mostrarInicio, mostrarFinal, usando el pivote como contador
de los elementos en pantalla
*/
anterior.addEventListener('click', function(){
    mostrarInicio = mostrarInicio-pivote;
    mostrarFinal = mostrarFinal-pivote;
    siguiente.classList.remove('ocultar');
    for (let i = 0; i < tr.length; i++) {
        if (i == 0) {
            tr[i].classList.remove('ocultar');
        } else if (i > mostrarInicio && i <= mostrarFinal) {
            tr[i].classList.remove('ocultar');
        } else if (i >= mostrarInicio) {
            tr[i].classList.add('ocultar');
        }
    }
    
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${libros.length}`;
    OcultarBotonera();
});

/*
funcion que muestra los elementos en pantalla al presionar el boton siguientes
segun las variables, mostrarInicio, mostrarFinal, usando el pivote como contador
de los elementos en pantalla
*/
siguiente.addEventListener('click', function(){
    mostrarInicio = mostrarInicio+pivote;
    mostrarFinal = mostrarFinal+pivote;
    anterior.classList.remove('ocultar');
    for (let i = 0; i < tr.length; i++) {
        /* TR1 en el indice 1 contiene los encabezados de la tabla, por esa razon no se les cambia la clase
        si los elementos son menores al indice de mostrar esta agrega la clase ocultar para que no sean visibles*/
        if (i == 0) {
            tr[i].classList.remove('ocultar');
        } else if (i > mostrarInicio && i <= mostrarFinal) {
            tr[i].classList.remove('ocultar');
        } else if (i <= mostrarInicio) {
            tr[i].classList.add('ocultar');
        }
    }
    
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${libros.length}`
    OcultarBotonera();
});

/**
 * Funcion a ejecutar cuando el usuario de clic en la opcion prestar
 */
function Libro_Prestar(_libro){
    let confirmar = confirm('Deseas prestar este libro');
    if (confirmar) {
        localStorage.setItem('libro_prestar', _libro);
        window.location.href= 'prestar.html';
    }
}

cerrar =  document.querySelector('#salir');
cerrar.addEventListener('click', Cerrar_Sesion);

function Cerrar_Sesion() {
    localStorage.setItem('sesion', 0);
    localStorage.removeItem('logged_user');
    window.location.reload();
}