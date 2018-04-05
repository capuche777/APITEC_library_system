temas = JSON.parse(localStorage.getItem('temas'));

const tabla =  document.querySelector('.tabla');
const tabla2 =  document.querySelector('#tabla2');
let contenidoTabla = '';

let filas = temas.length;

// Objects.keys(objeto) devuelve el numero de propiedades que tiene un objeto, en este caso indico [i], ya que todos los objetos tienen el mismo numero de propiedades
const llaves = Object.keys(temas[0]);

// Al dar clic debe enviar a la pagina para crear un nuevo tema

document.querySelector('#agregar_tema').addEventListener('click', function(){
    window.location.href='/nuevo_tema.html';
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

    /*var row =  tabla2.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = `${temas[i].tema_id}`;
    cell2.innerHTML = `${temas[i].tema}`;
    cell3.innerHTML = `${temas[i].fecha_ingreso}`;
    cell.innerHTML = `${temas[i].tema_id}`;
    cell.innerHTML = `${temas[i].tema_id}`;*/
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

// Solo se deben mostrar 5 resultados para el ejemplo
const tr = document.getElementsByTagName('TR');
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
let imprimirInicio = document.querySelector('.inicio');
let imprimirFinal = document.querySelector('.final') ;
let imprimirTotal = document.querySelector('.total');

//cantidad de elementos a mostrar en la tabla
let mostrarInicio = 0;
let mostrarFinal = 5;
let pivote = 5;
// por default todos los elementos en la tabla estan ocultos, la siguiente funcion hace que se muestren solo los primeros 5
for (let i = mostrarInicio; i < tr.length; i++) {
    if (i <= mostrarFinal) {
        tr[i].classList.remove('ocultar');
    }
    imprimirInicio.innerHTML = `${mostrarInicio+1}`;
    imprimirFinal.innerHTML = `${mostrarFinal}`;
    imprimirTotal.innerHTML = `${temas.length}`
}

/* La funcion recibe el indice del elemento a editar, lo almacena en una variable para poder realizar la edicion en la pantalla
de edicion, dicha variable es almacenada en el localStorage para poder hacer uso de ella*/
function TemaEditar(_tema) {
    let tema;
    for (let i in temas) {
        if (_tema+1 == temas[i].tema_id) {
            tema = _tema;
        }
    }
    tema = localStorage.setItem('tema_edit', JSON.stringify(tema));
    window.location.replace('/editar_temas.html')
}

// Elimina el tema sobre el cual se da clic en el boton eliminar.
function TemaEliminar(tema) {
    temas.splice(tema, 1);
    temas = localStorage.setItem('temas', JSON.stringify(temas));
    window.location.reload();
}

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
    imprimirTotal.innerHTML = `${temas.length}`
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
