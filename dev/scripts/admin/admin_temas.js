// Obtiene los temas del local storage para ser impresos en el documento html
temas = JSON.parse(localStorage.getItem('temas'));

// Alcanza el elemento donde se imprimira la tabla con la informacion
const tabla =  document.querySelector('.tabla');
// Variable para imprimir la tabla en el interior
let contenidoTabla = '';

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

// Objects.keys(objeto) devuelve el numero de propiedades que tiene un objeto, en este caso indico [i], ya que todos los objetos tienen el mismo numero de propiedades
const llaves = Object.keys(temas[0]);

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

// Crea dinamicamente la tabala
for (var i in temas) {
    if (temas[i] == 0) {
        console.log('tiene vacios');
    } else {
        contenidoTabla += "<tr class='ocultar'>"
            contenidoTabla += `<td>${parseInt(i)+1}</td>`
            contenidoTabla += `<td>${temas[i].tema}</td>`
            contenidoTabla += `<td>${temas[i].fecha_ingreso}</td>`
            contenidoTabla += `<td id='edit${temas[i].tema_id}' onclick="TemaEditar(${i})">Editar</td>`
            contenidoTabla += `<td id='${temas[i].tema_id}' onclick="TemaEliminar(${i})">Eliminar</td>`
    }
};

// Inserta la tabala en el contenedor
tabla.innerHTML = `
    <table border=1>
        <thead>
            <th>#</th>
            <th>Tema</th>
            <th>Fecha de Ingreso</th>
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
        if (i <= mostrarFinal) {
            tr[i].classList.remove('ocultar');
        }
        imprimirInicio.innerHTML = `${mostrarInicio+1}`;
        imprimirFinal.innerHTML = `${mostrarFinal}`;
        imprimirTotal.innerHTML = `${temas.length}`;
        OcultarBotonera();
    }
/* La funcion recibe el indice del elemento a editar, lo almacena en una variable para poder realizar la edicion en la pantalla
de edicion, dicha variable es almacenada en el localStorage para poder hacer uso de ella*/
function TemaEditar(_tema) {
    let confirmar = confirm('Quieres editar este tema?')
    if (confirmar) {
        localStorage.setItem('tema_edit', _tema);
        window.location.href = 'editar_temas.html';
    }
}

// Elimina el tema sobre el cual se da clic en el boton eliminar.
function TemaEliminar(tema) {
    let confirmar = confirm('Deseas eliminar el tema');
    if (confirmar) {
        temas.splice(tema, 1);
        localStorage.setItem('temas', JSON.stringify(temas));
        window.location.reload();
    } else {
        alert('No se ha realizado ninguna acción')
    }
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
            imprimirFinal.innerHTML = `${temas.length}`;
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
    imprimirTotal.innerHTML = `${temas.length}`;
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
    imprimirTotal.innerHTML = `${temas.length}`
    OcultarBotonera();
});
