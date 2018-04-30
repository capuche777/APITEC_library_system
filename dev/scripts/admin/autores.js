const admin_sesion = localStorage.getItem('admin_sesion'); // Obtiene si el usuario esta logueado

/**
 * Si el usuario no ha iniciado sesion sera enviado a la pantalla
 * de logueo
 */
if (admin_sesion != 1) {
    window.location.href = 'index.html'
}

let autores = JSON.parse(localStorage.getItem('autores')); //llama el objeto autores del localStorage, necesario para la creacion de la tabla
let paises = JSON.parse(localStorage.getItem('paises')); //llama el objeto paises del localStorage, necesario para insertarlo en la tabla
const tabla =  document.querySelector('.tabla'); // selecciona el div donde se insertara la tabla
let contenidoTabla = ''; // Variable creada para generar dinamicamente el contenido de la tabla

// cantidad de elementos a mostrar en la tabla
let mostrarInicio = 0;
let mostrarFinal = 0;
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
 * Al dar clic en el boton Agregar este debe reenviar a una nueva ventana para agregar nuevos autores
 */
document.querySelector('#agregar_autor').addEventListener('click', () => {
    window.location.href='/admin/nuevo_autor.html';
});

document.querySelector('#btn_show').addEventListener('click',() => {
    mostrarFinal = document.querySelector('#txt_showRows').value;
    pivote = document.querySelector('#txt_showRows').value;

    if (mostrarFinal <= 0 || mostrarFinal > autores.length) {
        document.querySelector('.alert').innerHTML = `Por favor ingrese un número entre 1 y ${autores.length}`
    } else {
        localStorage.setItem('mostrarFinal', mostrarFinal);
        localStorage.setItem('pivote', pivote);

        window.location.reload();   
    }
});

/**
 * Crea dinamicamente la tabla con los autores a, representa autores y p, representa paices en las variables declaradas
 */
for (var a in autores) {
    contenidoTabla += "<tr class='ocultar'>"
        contenidoTabla += `<td>${parseInt(a)+1}</td>`
        contenidoTabla += `<td>${autores[a].nombre}</td>`
        contenidoTabla += `<td>${autores[a].apellido}</td>`
        contenidoTabla += `<td>${paises[parseInt(autores[a].nacionalidad)-1].nombre}</td>`
        contenidoTabla += `<td>${autores[a].fecha_ingreso}</td>`
        contenidoTabla += `<td id='edit${autores[a].autor_id}' onclick="AutorEditar(${a})">Editar</td>`
        contenidoTabla += `<td id='${autores[a].autor_id}' onclick="AutorEliminar(${a})">Eliminar</td>`
}

/**
 * Crea la tabla autores en el DOM
 */
tabla.innerHTML = `
    <table border=1>
    <thead>
        <th>#</th>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Nacionalidad</th>
        <th>Fecha de Ingreso</th>
        <th colspan=2>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;

const tr = document.getElementsByTagName('TR'); // Obtiene los elementos con la etiquete tr para crear un array
const anterior = document.querySelector('#anterior'); // Obtiene el boton "anterior" para crear la funcion de regresar
const siguiente = document.querySelector('#siguiente'); // Obttiene el boton "siguiente" para crear la funcion de avanzar
let imprimirInicio = document.querySelector('.inicio'); // Variable que permitira imprimir el inicio de los elementos mosrados en la pantalla
let imprimirFinal = document.querySelector('.final'); // Variable que permitira imprimir el final de los elementos mostrados en la pantalla
let imprimirTotal = document.querySelector('.total'); // Variable que permitira imprimir el total de datos almacenados y mostrarlos en pantalla

// todos los elementos en la tabla estan ocultos, la funcion hace que se muestren los elegidos por el usuaio, por defecto 10
for (let i = mostrarInicio; i < tr.length; i++) {
    if (i < mostrarFinal){
        tr[i+1].classList.remove('ocultar');
    }
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${autores.length}`;
    OcultarBotonera();
}

/* La funcion recibe el indice del elemento a editar, lo guarda en una variable para poder realizar la edicion en la pantalla de edicion
dicha variable es almacenada en localStorage para poder hacer uso de ella*/
function AutorEditar(_autor) {
    let confirmar = confirm('Quieres editar este autor?');
    if (confirmar) {
        localStorage.setItem('autor_edit', _autor);
        window.location.href='/admin/editar_autores.html';
    }
};

// Elimina el autor sobre el cual se da clic en el boton eliminar
function AutorEliminar(autor) {
    let confirmar = confirm("Deseas eliminar estet autor?");
    if (confirmar) {
        if (autores[autor]['total_libros'] != 0) {
            alert(`El autor tiene ${autores[autor]['total_libros']} libro(s) asociado(s),\nelimine primero o cambie de autor\ne intente nuevamente`);
        } else {
            autores.splice(autor, 1);
            autores = localStorage.setItem('autores', JSON.stringify(autores));
            window.location.reload();
        }
    } else {
        alert('No se han realizado acciones');
    }
};

/*
La siguiente funcion oculta el boton anterior si el primer elemento no cuenta con la clase ocultar
y el boton siguiente si el ultimo elemento mostrado si tiene la clase ocultar. Al mismo tiempo actualiza
el valor de los articulos que se muestran en pantalla
*/
function OcultarBotonera() {
    for (let i in tr) {
        if (tr[1].getAttribute('class') == '' && tr[tr.length - 1].getAttribute('class') == '') {
            anterior.classList.add('ocultar');
            siguiente.classList.add('ocultar');
        } else if (tr[1].getAttribute('class') == '') {
            anterior.classList.add('ocultar');
            siguiente.classList.remove('ocultar');
        } else if (tr[tr.length-1].getAttribute('class') == '') {
            siguiente.classList.add('ocultar');
            anterior.classList.remove('ocultar');
            imprimirFinal.innerHTML = `${autores.length}`;
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
    imprimirTotal.innerHTML = `${autores.length}`;
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
    imprimirTotal.innerHTML = `${autores.length}`
    OcultarBotonera();
});