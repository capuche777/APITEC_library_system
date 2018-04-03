temas = JSON.parse(localStorage.getItem('temas'));

const tabla =  document.querySelector('.tabla');
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
        contenidoTabla += "<tr>"
            contenidoTabla += `<td>${temas[i].tema_id}</td>`
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

// Solo se deben mostrar 5 resultados para el ejemplo
let tr = document.getElementsByTagName('TR');
let anterior = document.querySelector('#anterior');
let siguiente = document.querySelector('#siguiente');


for (let i = 0; i < tr.length; i++) {
    if (i < 5) {
        tr[i].classList.add('ocultar');
    }
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

// funcion que muestra los elementos de 5 en 5
siguiente.addEventListener('click', function(){
    _mostrar = 5
    for (let i = 0; i < tr.length; i++) {
        if (i >= _mostrar) {
            tr[i].style.display = 'block';
            anterior.style.display = 'block';
        }
    }
});
