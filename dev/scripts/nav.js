let libros = JSON.parse(localStorage.getItem('libros'));
let autores = JSON.parse(localStorage.getItem('autores'));
let temas = JSON.parse(localStorage.getItem('temas'));

let este = document.querySelector('.pagina').innerHTML.toLowerCase();

if (este == 'libros') {
    este = libros;
}

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

    if (mostrarFinal <= 0 || mostrarFinal > temas.length) {
        document.querySelector('.alert').innerHTML = `Por favor ingrese un número entre 1 y ${temas.length}`
    } else {
        localStorage.setItem('mostrarFinal', mostrarFinal);
        localStorage.setItem('pivote', pivote);

        window.location.reload();   
    }
});

// Solo se deben mostrar 10 resultados para el ejemplo
const tr = document.getElementsByTagName('TR');
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
let imprimirInicio = document.querySelector('.inicio');
let imprimirFinal = document.querySelector('.final') ;
let imprimirTotal = document.querySelector('.total');

// por default todos los elementos en la tabla estan ocultos, la siguiente funcion hace que se muestren solo los primeros 10
for (let i = mostrarInicio; i < tr.length; i++) {
    if (i <= mostrarFinal) {
        tr[i+1].classList.remove('ocultar');
    }
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${este.length}`;
    Ocultar_Botonera();
}

/*
La siguiente funcion oculta el boton anterior si el primer elemento no cuenta con la clase ocultar
y el boton siguiente si el ultimo elemento mostrado si tiene la clase ocultar. Al mismo tiempo actualiza
el valor de los articulos que se muestran en pantalla
*/
function Ocultar_Botonera() {
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
            imprimirFinal.innerHTML = `${este.length}`;
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
    imprimirTotal.innerHTML = `${este.length}`;
    Ocultar_Botonera();
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
    imprimirTotal.innerHTML = `${este.length}`
    Ocultar_Botonera();
});
