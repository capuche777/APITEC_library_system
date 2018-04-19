let libros = JSON.parse(localStorage.getItem('libros'));
let autores = JSON.parse(localStorage.getItem('autores'));
let temas = JSON.parse(localStorage.getItem('temas'));

const tabla = document.querySelector('.tabla');

let contenidoTabla = "";

document.querySelector('#agregar_libro').addEventListener('click', function(){
    window.location.href='/nuevo_libro.html';
});

for (var l in libros) {
    contenidoTabla += "<tr>"
        contenidoTabla += `<td>${parseInt(l)+1}</td>`
        contenidoTabla += `<td>${libros[l].titulo}</td>`
        contenidoTabla += `<td>${autores[0].apellido}</td>`
        contenidoTabla += `<td>${temas[l].tema}</td>`
        contenidoTabla += `<td>${libros[l].ubicacion}</td>`
        contenidoTabla += `<td>${temas[l].tema}</td>`
        contenidoTabla += `<td id='edit${libros[l].libro_id}' onclick="Editar(${l})">Editar</td>`
        contenidoTabla += `<td id='${libros[l].libro_id}' onclick="Eliminar(${l})">Eliminar</td>`
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

// Obtiene los elementos con la etiquete tr para crear un array
const tr = document.getElementsByTagName('TR');
// Obtiene el boton "anterior" para crear la funcion de regresar
const anterior = document.querySelector('#btn_anterior');
// Obttiene el boton "siguiente" para crear la funcion de avanzar
const siguiente = document.querySelector('#btn_siguiente');
// Variable que permitira imprimir el inicio de los elementos mosrados en la pantalla
let imprimirInicio = document.querySelector('.inicio');
// Variable que permitira imprimir el final de los elementos mostrados en la pantalla
let imprimirFinal = document.querySelector('.final');
// Variable que permitira imprimir el total de datos almacenados y mostrarlos en pantalla
let imprimirTotal = document.querySelector('.total');

// cantidad de elementos a mostrar en la tabla
let mostrarInicio = 0;
let mostrarFinal = 10;
let pivote = 10;

// todos los elementos en la tabla estan ocultos, la funcion hace que se muestren los elegidos por el usuaio, por defecto 10
for (let i = mostrarInicio; i < tr.length; i++) {
    if (i < mostrarFinal){
        tr[i].classList.remove('ocultar');
    }
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${libros.length}`;
}

/* La funcion recibe el indice del elemento a editar, lo guarda en una variable para poder realizar la edicion en la pantalla de edicion
dicha variable es almacenada en localStorage para poder hacer uso de ella*/
function Editar(_libro) {
    let libro;
    for (let i in libros) {
        if (_libro+1 == libros[i].libro_id) {
            libro = _libro;
        }
    }
    libro = localStorage.setItem('libro_edit', libro);
    window.location.href='/editar_libros.html';
};

// Elimina el libro sobre el cual se da clic en el boton eliminar
function Eliminar(libro) {
    libros.splice(libro, 1);
    libros = localStorage.setItem('libros', JSON.stringify(libros));
    window.location.reload();
};

/*
La siguiente funcion oculta el boton anterior si el primer elemento no cuenta con la clase ocultar
y el boton siguiente si el ultimo elemento mostrado si tiene la clase ocultar. Al mismo tiempo actualiza
el valor de los articulos que se muestran en pantalla
*/
function OcultarBotonera() {
    for (let i in tr) {
        if (tr[1].getAttribute('class') == '') {
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
    imprimirTotal.innerHTML = `${libros.length}`
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